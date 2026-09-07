import { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Users as UsersIcon, FileText, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { Skeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { Badge } from '@/components/Badge';
import { Dialog, ConfirmDialog } from '@/components/Dialog';
import { getAllPatients, createPatient, updatePatient, getPatientReports, logAudit } from '@/services/data-service';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Patient, Report } from '@/types';

export function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [viewPatient, setViewPatient] = useState<Patient | null>(null);
  const [patientReports, setPatientReports] = useState<Report[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ patient_id: '', full_name: '', date_of_birth: '', phone: '', email: '', gender: '', address: '', notes: '' });

  useEffect(() => { loadPatients(); }, []);

  async function loadPatients() {
    setLoading(true);
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch { toast.error('Failed to load patients'); }
    finally { setLoading(false); }
  }

  const filtered = useMemo(() => {
    if (!search) return patients;
    const q = search.toLowerCase();
    return patients.filter((p) => p.patient_id.toLowerCase().includes(q) || p.full_name.toLowerCase().includes(q) || (p.phone ?? '').includes(q));
  }, [patients, search]);

  async function handleCreate() {
    if (!form.patient_id || !form.full_name || !form.date_of_birth) { toast.error('Please fill required fields'); return; }
    setSubmitting(true);
    try {
      await createPatient({ patient_id: form.patient_id, full_name: form.full_name, date_of_birth: form.date_of_birth, phone: form.phone || null, email: form.email || null, gender: form.gender || null, address: form.address || null, notes: form.notes || null });
      await logAudit('patient_create', 'patient', undefined, { patient_id: form.patient_id });
      toast.success('Patient created');
      setCreateOpen(false);
      setForm({ patient_id: '', full_name: '', date_of_birth: '', phone: '', email: '', gender: '', address: '', notes: '' });
      loadPatients();
    } catch { toast.error('Failed to create patient'); }
    finally { setSubmitting(false); }
  }

  async function handleEdit() {
    if (!editPatient) return;
    setSubmitting(true);
    try {
      await updatePatient(editPatient.id, { full_name: form.full_name, date_of_birth: form.date_of_birth, phone: form.phone || null, email: form.email || null, gender: form.gender || null, address: form.address || null, notes: form.notes || null });
      await logAudit('patient_edit', 'patient', editPatient.id);
      toast.success('Patient updated');
      setEditPatient(null);
      loadPatients();
    } catch { toast.error('Failed to update patient'); }
    finally { setSubmitting(false); }
  }

  async function handleView(p: Patient) {
    setViewPatient(p);
    setPatientReports([]);
    try {
      const reps = await getPatientReports(p.id);
      setPatientReports(reps);
    } catch { /* ok */ }
  }

  function openEdit(p: Patient) {
    setEditPatient(p);
    setForm({ patient_id: p.patient_id, full_name: p.full_name, date_of_birth: p.date_of_birth, phone: p.phone ?? '', email: p.email ?? '', gender: p.gender ?? '', address: p.address ?? '', notes: p.notes ?? '' });
  }

  return (
    <>
      <SEO title="Patients" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-navy-900">Patients</h2><p className="text-sm text-slate-500">Manage patient records</p></div>
          <button onClick={() => { setForm({ patient_id: '', full_name: '', date_of_birth: '', phone: '', email: '', gender: '', address: '', notes: '' }); setCreateOpen(true); }} className="btn-primary"><Plus className="h-5 w-5" />Add Patient</button>
        </div>

        <div className="relative rounded-xl bg-white p-4 shadow-soft ring-1 ring-slate-200/60">
          <Search className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by Patient ID, name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-12" />
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : filtered.length > 0 ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200/60">
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"><tr>
                <th className="px-4 py-3">Patient ID</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">DOB</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3 text-right">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-navy-900">{p.patient_id}</td>
                    <td className="px-4 py-3 text-slate-700">{p.full_name}</td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(p.date_of_birth)}</td>
                    <td className="px-4 py-3 text-slate-600">{p.phone ?? '-'}</td>
                    <td className="px-4 py-3"><div className="flex justify-end gap-1">
                      <button onClick={() => handleView(p)} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600" title="View"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => openEdit(p)} className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-600" title="Edit"><Edit className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </div>
        ) : <EmptyState title="No patients found" icon={<UsersIcon className="h-7 w-7" />} action={<button onClick={() => setCreateOpen(true)} className="btn-primary">Add Patient</button>} />}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={createOpen || !!editPatient} onClose={() => { setCreateOpen(false); setEditPatient(null); }} title={editPatient ? 'Edit Patient' : 'Add Patient'}>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="label-base">Patient ID {!editPatient && <span className="text-error-500">*</span>}</label><input type="text" value={form.patient_id} disabled={!!editPatient} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} className="input-base text-sm disabled:bg-slate-50" placeholder="UML001" /></div>
            <div><label className="label-base">Full Name <span className="text-error-500">*</span></label><input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="input-base text-sm" /></div>
            <div><label className="label-base">Date of Birth <span className="text-error-500">*</span></label><input type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} className="input-base text-sm" /></div>
            <div><label className="label-base">Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-base text-sm" /></div>
            <div><label className="label-base">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-base text-sm" /></div>
            <div><label className="label-base">Gender</label><select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="input-base text-sm"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
          </div>
          <div><label className="label-base">Address</label><input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-base text-sm" /></div>
          <div><label className="label-base">Notes</label><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-base text-sm min-h-[60px]" /></div>
          <button onClick={editPatient ? handleEdit : handleCreate} disabled={submitting} className="btn-primary w-full">{submitting ? 'Saving...' : 'Save'}</button>
        </div>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewPatient} onClose={() => setViewPatient(null)} title="Patient Details">
        {viewPatient && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div><p className="text-xs text-slate-400">Patient ID</p><p className="font-semibold text-navy-900">{viewPatient.patient_id}</p></div>
              <div><p className="text-xs text-slate-400">Name</p><p className="font-semibold text-navy-900">{viewPatient.full_name}</p></div>
              <div><p className="text-xs text-slate-400">Date of Birth</p><p className="text-slate-700">{formatDate(viewPatient.date_of_birth)}</p></div>
              <div><p className="text-xs text-slate-400">Phone</p><p className="text-slate-700">{viewPatient.phone ?? '-'}</p></div>
              <div><p className="text-xs text-slate-400">Email</p><p className="text-slate-700">{viewPatient.email ?? '-'}</p></div>
              <div><p className="text-xs text-slate-400">Gender</p><p className="text-slate-700 capitalize">{viewPatient.gender ?? '-'}</p></div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-navy-900">Reports ({patientReports.length})</h4>
              {patientReports.length > 0 ? (
                <div className="space-y-2">
                  {patientReports.map((r) => (
                    <div key={r.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                      <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary-600" /><div><p className="text-sm font-medium">{r.test_name}</p><p className="text-xs text-slate-400">{r.report_number} | {formatDate(r.report_date)}</p></div></div>
                      <Badge className={getStatusColor(r.status)}>{r.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-slate-400">No reports yet.</p>}
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
