import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, serviceRoleKey);

interface VerifyRequest {
  patientId: string;
  dateOfBirth: string;
  action?: "view" | "download";
  reportId?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body: VerifyRequest = await req.json();
    const { patientId, dateOfBirth, action = "view" } = body;

    if (!patientId || !dateOfBirth) {
      return new Response(
        JSON.stringify({ error: "Unable to verify the details provided. Please check your Patient ID and date of birth and try again." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting: check recent failed attempts from this IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const fifteenMinAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data: recentFailures } = await supabase
      .from("report_access_logs")
      .select("id")
      .eq("patient_id_attempt", patientId)
      .eq("success", false)
      .gte("access_time", fifteenMinAgo);

    if (recentFailures && recentFailures.length >= 5) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Look up patient by patient_id and date_of_birth
    const { data: patient, error: patientError } = await supabase
      .from("patients")
      .select("id, patient_id, full_name, date_of_birth")
      .eq("patient_id", patientId)
      .maybeSingle();

    const dobMatch = patient && patient.date_of_birth === dateOfBirth;

    if (!patient || patientError || !dobMatch) {
      // Log failed attempt — do NOT reveal whether patient exists
      await supabase.from("report_access_logs").insert({
        action: "failed_attempt",
        success: false,
        patient_id_attempt: patientId,
        user_agent: userAgent,
        ip_address: clientIp,
      });

      return new Response(
        JSON.stringify({ error: "Unable to verify the details provided. Please check your Patient ID and date of birth and try again." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get active reports for this patient
    const { data: reports, error: reportsError } = await supabase
      .from("reports")
      .select("id, report_number, test_name, report_date, file_path, file_name, status, created_at")
      .eq("patient_id", patient.id)
      .eq("status", "active")
      .order("report_date", { ascending: false });

    if (reportsError || !reports || reports.length === 0) {
      // Log the access attempt
      await supabase.from("report_access_logs").insert({
        patient_id: patient.id,
        action: "failed_attempt",
        success: false,
        user_agent: userAgent,
        ip_address: clientIp,
        patient_id_attempt: patientId,
      });

      return new Response(
        JSON.stringify({ error: "No reports are currently available for the provided details. Please contact United MediLab if you believe this is an error." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate signed URLs for each report (valid for 30 minutes)
    const reportsWithUrls = await Promise.all(
      reports.map(async (report) => {
        const { data: urlData, error: urlError } = await supabase.storage
          .from("reports-private")
          .createSignedUrl(report.file_path, 1800, {
            download: action === "download" ? report.file_name : false,
          });

        if (urlError || !urlData) {
          return { ...report, signedUrl: null };
        }

        // Log successful access
        await supabase.from("report_access_logs").insert({
          report_id: report.id,
          patient_id: patient.id,
          action,
          success: true,
          user_agent: userAgent,
          ip_address: clientIp,
        });

        return {
          id: report.id,
          reportNumber: report.report_number,
          testName: report.test_name,
          reportDate: report.report_date,
          fileName: report.file_name,
          signedUrl: urlData.signedUrl,
          createdAt: report.created_at,
        };
      })
    );

    // Return patient name (first name only for privacy) and reports
    const nameParts = patient.full_name.split(" ");
    const displayName = nameParts.length > 1
      ? `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.`
      : patient.full_name;

    return new Response(
      JSON.stringify({
        patientName: displayName,
        reports: reportsWithUrls.filter((r) => r.signedUrl),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
