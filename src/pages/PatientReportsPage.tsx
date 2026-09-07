import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Lock, Loader2, FileText, Download, ArrowLeft,
  AlertCircle, Eye,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { formatDate } from '@/lib/utils';
import type { ReportVerifyResponse } from '@/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function PatientReportsPage() {
  const [patientId, setPatientId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReportVerifyResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!patientId.trim() || !dateOfBirth) {
      setError('Please enter both your Patient ID and date of birth.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          patientId: patientId.trim(),
          dateOfBirth,
          action: 'view',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unable to verify the details provided. Please check your Patient ID and date of birth and try again.');
        return;
      }

      setResult(data as ReportVerifyResponse);
    } catch {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(reportId: string) {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ patientId: patientId.trim(), dateOfBirth, action: 'download', reportId }),
      });
      const data = await response.json();
      if (response.ok && data.reports?.[0]?.signedUrl) {
        window.open(data.reports[0].signedUrl, '_blank');
      }
    } catch {
      // Silent fail
    }
  }

  function handleReset() {
    setResult(null);
    setPatientId('');
    setDateOfBirth('');
    setError('');
  }

  return (
    <>
      <SEO
        title="Patient Reports"
        description="Access your laboratory report securely using your Patient ID and date of birth."
        canonical="/patient-reports"
        noindex
      />

      <section className="bg-navy-950 py-12 md:py-16">
        <div className="container-page text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <Lock className="h-7 w-7 text-cyan-300" />
          </div>
          <h1 className="text-balance text-3xl font-bold text-white md:text-4xl">Access Your Lab Report</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Enter your Patient ID and date of birth to securely view your laboratory reports.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-narrow">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-auto max-w-md"
              >
                <div className="card">
                  <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h2 className="text-xl font-bold text-navy-900">Secure Report Access</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Your information is protected through secure access controls.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="label-base" htmlFor="patientId">Patient ID</label>
                      <input
                        id="patientId"
                        type="text"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="input-base"
                        placeholder="Enter your Patient ID"
                        autoComplete="off"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="dob">Date of Birth</label>
                      <input
                        id="dob"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="input-base"
                        disabled={loading}
                      />
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-start gap-2 rounded-lg bg-error-50 p-3 text-sm text-error-700"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
                      {loading ? 'Verifying...' : 'View My Report'}
                    </button>
                  </form>

                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Lock className="h-3.5 w-3.5" />
                    Your information is encrypted and securely processed.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-navy-900">Your Reports</h2>
                    <p className="text-sm text-slate-500">Welcome, {result.patientName}</p>
                  </div>
                  <button onClick={handleReset} className="btn-ghost text-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                </div>

                {result.reports.length > 0 ? (
                  <div className="space-y-4">
                    {result.reports.map((report) => (
                      <div key={report.id} className="card flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-semibold text-navy-900">{report.testName}</p>
                            <p className="text-sm text-slate-500">
                              Report #: {report.reportNumber} | Date: {formatDate(report.reportDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={report.signedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-xs"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </a>
                          <button
                            onClick={() => handleDownload(report.id)}
                            className="btn-primary text-xs"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                    <p className="text-center text-xs text-slate-400">
                      These links are temporary and will expire in 30 minutes for your security.
                    </p>
                  </div>
                ) : (
                  <div className="card text-center">
                    <p className="text-slate-600">No reports are currently available for your account.</p>
                    <p className="mt-2 text-sm text-slate-400">Please contact United MediLab if you believe this is an error.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
