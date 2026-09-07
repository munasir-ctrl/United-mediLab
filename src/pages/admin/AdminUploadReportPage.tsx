import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { supabase, getAllPatients, createPatient, uploadReportFile, createReport, logAudit } from '@/services/data-service';
import { useAuth } from '@/lib/auth-context';
import { validatePdfFile, slugify } from '@/lib/utils';
import type { Patient } from '@/types';

export function AdminUploadReportPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [searchPatient, setSearchPatient] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState({ patient_id: '', full_name: '', date_of_birth: '', phone: '' });
  const [form, setForm] = useState({ report_number: '', test_name: '', report_date: '' });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch {
      // ok
    }
  }

  const filteredPatients = searchPatient
    ? patients.filter((p) =>
        p.patient_id.toLowerCase().includes(searchPatient.toLowerCase()) ||
        p.full_name.toLowerCase().includes(searchPatient.toLowerCase()) ||
        (p.phone ?? '').includes(searchPatient)
      ).slice(0, 5)
    : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let patient = selectedPatient;

    if (!patient && newPatient.patient_id && newPatient.full_name && newPatient.date_of_birth) {
      try {
        patient = await createPatient({
          patient_id: newPatient.patient_id,
          full_name: newPatient.full_name,
          date_of_birth: newPatient.date_of_birth,
          phone: newPatient.phone || null,
        });
        await logAudit('patient_create', 'patient', patient.id, { patient_id: patient.patient_id });
      } catch {
        toast.error('Failed to create patient. Patient ID may already exist.');
        return;
      }
    }

    if (!patient) {
      toast.error('Please select or create a patient.');
      return;
    }

    if (!form.report_number || !form.test_name || !form.report_date) {
      toast.error('Please fill in all report fields.');
      return;
    }

    if (!file) {
      toast.error('Please select a PDF file.');
      return;
    }

    const validation = validatePdfFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file');
      return;
    }

    setLoading(true);
    setProgress(10);

    try {
      setProgress(30);
      const filePath = await uploadReportFile(file, form.report_number);
      setProgress(60);

      await createReport({
        patient_id: patient.id,
        report_number: form.report_number,
        test_name: form.test_name,
        report_date: form.report_date,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        status: 'active',
        uploaded_by: user?.id,
      });
      setProgress(90);

      await logAudit('report_upload', 'report', undefined, {
        report_number: form.report_number,
        patient_id: patient.patient_id,
        test_name: form.test_name,
      });
      setProgress(100);
      setSuccess(true);
      toast.success('Report uploaded successfully!');
    } catch {
      toast.error('Failed to upload report. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <SEO title="Upload Report" noindex />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900">Report Uploaded!</h2>
          <p className="mt-2 text-slate-500">The report has been uploaded and is now accessible to the patient.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => { setSuccess(false); setForm({ report_number: '', test_name: '', report_date: '' }); setFile(null); setSelectedPatient(null); setNewPatient({ patient_id: '', full_name: '', date_of_birth: '', phone: '' }); setProgress(0); }} className="btn-primary">Upload Another</button>
            <button onClick={() => navigate('/admin/reports')} className="btn-secondary">View All Reports</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Upload Report" noindex />
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Upload New Report</h2>
          <p className="text-sm text-slate-500">Upload a PDF report and associate it with a patient.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient selection */}
          <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
            <h3 className="mb-4 text-sm font-bold text-navy-900">Select Existing Patient</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Patient ID, name or phone..."
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}
                className="input-base"
              />
              {filteredPatients.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-float ring-1 ring-slate-200">
                  {filteredPatients.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => { setSelectedPatient(p); setSearchPatient(`${p.full_name} (${p.patient_id})`); }}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-slate-50"
                    >
                      <span><span className="font-medium">{p.full_name}</span> <span className="text-slate-400">{p.patient_id}</span></span>
                      <span className="text-xs text-slate-400">{p.phone}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedPatient && (
              <div className="mt-3 rounded-lg bg-primary-50 p-3 text-sm">
                Selected: <span className="font-semibold">{selectedPatient.full_name}</span> ({selectedPatient.patient_id})
              </div>
            )}

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR CREATE NEW</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input type="text" placeholder="Patient ID (e.g., UML001)" value={newPatient.patient_id} onChange={(e) => setNewPatient({ ...newPatient, patient_id: e.target.value })} className="input-base text-sm" />
              <input type="text" placeholder="Full Name" value={newPatient.full_name} onChange={(e) => setNewPatient({ ...newPatient, full_name: e.target.value })} className="input-base text-sm" />
              <input type="date" placeholder="Date of Birth" value={newPatient.date_of_birth} onChange={(e) => setNewPatient({ ...newPatient, date_of_birth: e.target.value })} className="input-base text-sm" />
              <input type="tel" placeholder="Phone" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} className="input-base text-sm" />
            </div>
          </div>

          {/* Report details */}
          <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
            <h3 className="mb-4 text-sm font-bold text-navy-900">Report Details</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label-base">Report Number</label>
                <input type="text" placeholder="e.g., RPT20260001" value={form.report_number} onChange={(e) => setForm({ ...form, report_number: e.target.value })} className="input-base text-sm" />
              </div>
              <div>
                <label className="label-base">Report Date</label>
                <input type="date" value={form.report_date} onChange={(e) => setForm({ ...form, report_date: e.target.value })} className="input-base text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="label-base">Test Name</label>
                <input type="text" placeholder="e.g., Complete Blood Count" value={form.test_name} onChange={(e) => setForm({ ...form, test_name: e.target.value })} className="input-base text-sm" />
              </div>
            </div>
          </div>

          {/* File upload */}
          <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
            <h3 className="mb-4 text-sm font-bold text-navy-900">PDF File</h3>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-8 text-center transition-colors hover:border-primary-300 hover:bg-primary-50/30">
              {file ? (
                <>
                  <FileText className="h-10 w-10 text-primary-600" />
                  <p className="mt-2 text-sm font-medium text-navy-900">{file.name}</p>
                  <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-slate-400" />
                  <p className="mt-2 text-sm font-medium text-slate-600">Click to select a PDF file</p>
                  <p className="text-xs text-slate-400">Maximum 10MB</p>
                </>
              )}
              <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
          </div>

          {/* Progress */}
          {loading && (
            <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-navy-900">Uploading...</span>
                <span className="text-slate-500">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            {loading ? 'Uploading...' : 'Upload Report'}
          </button>
        </form>
      </div>
    </>
  );
}
