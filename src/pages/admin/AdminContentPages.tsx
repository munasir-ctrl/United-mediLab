import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, MessageSquare, Star, HelpCircle, Stethoscope, TestTube, ScrollText, BarChart3, Settings as SettingsIcon, Loader2, Trash2, Plus, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { Skeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { Badge } from '@/components/Badge';
import { Dialog, ConfirmDialog } from '@/components/Dialog';
import {
  getAllAppointments, updateAppointment, getAllContactMessages, updateContactMessage,
  getAllServices, getAllTests, getAllFaqs, getAllTestimonials, getAllSiteSettings, updateSiteSetting,
  getAuditLogs, getReportAccessLogs, logAudit,
  getDashboardStats,
} from '@/services/data-service';
import { supabase } from '@/lib/supabase';
import { formatDate, formatDateTime, timeAgo, getStatusColor } from '@/lib/utils';
import type { Appointment, ContactMessage, Service, Test, FAQ, Testimonial, SiteSetting, AuditLog, ReportAccessLog } from '@/types';

// ============================================================================
// APPOINTMENTS
// ============================================================================
export function AdminAppointmentsPage() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); try { setItems(await getAllAppointments()); } catch { toast.error('Failed to load'); } finally { setLoading(false); } }

  const filtered = statusFilter === 'all' ? items : items.filter((i) => i.status === statusFilter);

  async function updateStatus(id: string, status: string) {
    try { await updateAppointment(id, { status: status as Appointment['status'] }); toast.success('Updated'); load(); }
    catch { toast.error('Failed'); }
  }

  return (
    <>
      <SEO title="Appointments" noindex />
      <div className="space-y-6">
        <div><h2 className="text-2xl font-bold text-navy-900">Appointments</h2><p className="text-sm text-slate-500">Test booking requests</p></div>
        <div className="flex gap-2 flex-wrap">{['all', 'new', 'contacted', 'confirmed', 'completed', 'cancelled'].map((s) => <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${statusFilter === s ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</button>)}</div>
        {loading ? <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div> :
         filtered.length > 0 ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200/60"><div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Test/Package</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><p className="font-medium text-navy-900">{a.patient_name}</p><p className="text-xs text-slate-400">{a.phone}</p></td>
                  <td className="px-4 py-3 text-slate-600">{a.test_or_package}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(a.preferred_date)} {a.preferred_time}</td>
                  <td className="px-4 py-3"><Badge className={getStatusColor(a.status)}>{a.status}</Badge></td>
                  <td className="px-4 py-3"><div className="flex justify-end gap-1">
                    <a href={`tel:${a.phone}`} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50"><Phone className="h-4 w-4" /></a>
                    <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs"><option value="new">New</option><option value="contacted">Contacted</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table></div></div>
        ) : <EmptyState title="No appointments" icon={<Calendar className="h-7 w-7" />} />}
      </div>
    </>
  );
}

// ============================================================================
// MESSAGES
// ============================================================================
export function AdminMessagesPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<ContactMessage | null>(null);

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); try { setItems(await getAllContactMessages()); } catch { toast.error('Failed'); } finally { setLoading(false); } }

  async function markRead(id: string) {
    try { await updateContactMessage(id, { status: 'read' }); load(); setViewItem(null); } catch { toast.error('Failed'); }
  }

  return (
    <>
      <SEO title="Messages" noindex />
      <div className="space-y-6">
        <div><h2 className="text-2xl font-bold text-navy-900">Contact Messages</h2><p className="text-sm text-slate-500">Messages from the contact form</p></div>
        {loading ? <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div> :
         items.length > 0 ? (
          <div className="space-y-2">
            {items.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-soft ring-1 ring-slate-200/60 hover:cursor-pointer" onClick={() => { setViewItem(m); if (m.status === 'new') markRead(m.id); }}>
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600"><Mail className="h-5 w-5" /></div><div><p className="font-medium text-navy-900">{m.name}</p><p className="text-sm text-slate-500 truncate max-w-md">{m.message}</p></div></div>
                <div className="flex items-center gap-3"><Badge className={getStatusColor(m.status)}>{m.status}</Badge><span className="text-xs text-slate-400">{timeAgo(m.created_at)}</span></div>
              </div>
            ))}
          </div>
        ) : <EmptyState title="No messages" icon={<Mail className="h-7 w-7" />} />}
      </div>
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} title="Message">
        {viewItem && <div className="space-y-3 text-sm"><div><p className="text-xs text-slate-400">From</p><p className="font-semibold">{viewItem.name}</p><p>{viewItem.phone} {viewItem.email && `| ${viewItem.email}`}</p></div>{viewItem.subject && <div><p className="text-xs text-slate-400">Subject</p><p>{viewItem.subject}</p></div>}<div><p className="text-xs text-slate-400">Message</p><p className="rounded-lg bg-slate-50 p-3">{viewItem.message}</p></div><p className="text-xs text-slate-400">{formatDateTime(viewItem.created_at)}</p></div>}
      </Dialog>
    </>
  );
}

// ============================================================================
// SERVICES
// ============================================================================
export function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Service | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '', icon: '', display_order: 0, is_active: true });

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); try { setItems(await getAllServices()); } catch { toast.error('Failed'); } finally { setLoading(false); } }

  async function save() {
    try {
      if (editItem) { await supabase.from('services').update({ name: form.name, description: form.description, icon: form.icon, display_order: form.display_order, is_active: form.is_active }).eq('id', editItem.id); toast.success('Updated'); }
      else { await supabase.from('services').insert({ name: form.name, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'), description: form.description, icon: form.icon, display_order: form.display_order, is_active: form.is_active }); toast.success('Created'); }
      setEditItem(null); setCreateOpen(false); setForm({ name: '', slug: '', description: '', icon: '', display_order: 0, is_active: true }); load();
    } catch { toast.error('Failed to save'); }
  }

  return (
    <>
      <SEO title="Services" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-navy-900">Services</h2><p className="text-sm text-slate-500">Laboratory service categories</p></div><button onClick={() => { setCreateOpen(true); setForm({ name: '', slug: '', description: '', icon: '', display_order: 0, is_active: true }); }} className="btn-primary"><Plus className="h-5 w-5" />Add Service</button></div>
        {loading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-32" />)}</div> :
         items.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((s) => (
           <div key={s.id} className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60"><h3 className="font-bold text-navy-900">{s.name}</h3><p className="mt-1 text-sm text-slate-500">{s.description}</p><div className="mt-3 flex items-center justify-between"><Badge className={s.is_active ? getStatusColor('active') : getStatusColor('archived')}>{s.is_active ? 'Active' : 'Inactive'}</Badge><button onClick={() => { setEditItem(s); setForm({ name: s.name, slug: s.slug, description: s.description ?? '', icon: s.icon ?? '', display_order: s.display_order, is_active: s.is_active }); }} className="btn-ghost text-sm"><Edit className="h-4 w-4" />Edit</button></div></div>
         ))}</div> : <EmptyState title="No services" icon={<Stethoscope className="h-7 w-7" />} />}
      </div>
      <Dialog open={createOpen || !!editItem} onClose={() => { setCreateOpen(false); setEditItem(null); }} title={editItem ? 'Edit Service' : 'Add Service'}>
        <div className="space-y-3">
          <div><label className="label-base">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-base text-sm" /></div>
          <div><label className="label-base">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-base text-sm min-h-[60px]" /></div>
          <div><label className="label-base">Icon name</label><input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-base text-sm" placeholder="microscope, droplet, etc." /></div>
          <div><label className="label-base">Display Order</label><input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="input-base text-sm" /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4" /> Active</label>
          <button onClick={save} className="btn-primary w-full">Save</button>
        </div>
      </Dialog>
    </>
  );
}

// ============================================================================
// TESTS
// ============================================================================
export function AdminTestsPage() {
  const [items, setItems] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Test | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '', category: '', sample_type: '', preparation: '', turnaround_time: '', is_featured: false, is_active: true, display_order: 0 });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); try { setItems(await getAllTests()); } catch { toast.error('Failed'); } finally { setLoading(false); } }

  async function save() {
    try {
      const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
      if (editItem) { await supabase.from('tests').update({ ...form }).eq('id', editItem.id); toast.success('Updated'); }
      else { await supabase.from('tests').insert({ ...form, slug }); toast.success('Created'); }
      setEditItem(null); setCreateOpen(false); load();
    } catch { toast.error('Failed'); }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try { await supabase.from('tests').delete().eq('id', deleteId); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  }

  return (
    <>
      <SEO title="Tests" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-navy-900">Tests</h2><p className="text-sm text-slate-500">Diagnostic test catalog</p></div><button onClick={() => { setCreateOpen(true); setForm({ name: '', slug: '', description: '', category: '', sample_type: '', preparation: '', turnaround_time: '', is_featured: false, is_active: true, display_order: 0 }); }} className="btn-primary"><Plus className="h-5 w-5" />Add Test</button></div>
        {loading ? <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div> :
         items.length > 0 ? <div className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200/60"><div className="overflow-x-auto"><table className="w-full text-sm">
           <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
           <tbody className="divide-y divide-slate-100">{items.map((t) => (
             <tr key={t.id} className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-navy-900">{t.name}</td><td className="px-4 py-3 text-slate-600">{t.category ?? '-'}</td><td className="px-4 py-3"><Badge className={t.is_active ? getStatusColor('active') : getStatusColor('archived')}>{t.is_active ? 'Active' : 'Inactive'}</Badge></td>
             <td className="px-4 py-3"><div className="flex justify-end gap-1"><button onClick={() => { setEditItem(t); setForm({ name: t.name, slug: t.slug, description: t.description ?? '', category: t.category ?? '', sample_type: t.sample_type ?? '', preparation: t.preparation ?? '', turnaround_time: t.turnaround_time ?? '', is_featured: t.is_featured, is_active: t.is_active, display_order: t.display_order }); }} className="rounded-lg p-2 text-slate-500 hover:bg-teal-50"><Edit className="h-4 w-4" /></button><button onClick={() => setDeleteId(t.id)} className="rounded-lg p-2 text-slate-500 hover:bg-error-50"><Trash2 className="h-4 w-4" /></button></div></td></tr>
           ))}</tbody>
         </table></div></div> : <EmptyState title="No tests" icon={<TestTube className="h-7 w-7" />} />}
      </div>
      <Dialog open={createOpen || !!editItem} onClose={() => { setCreateOpen(false); setEditItem(null); }} title={editItem ? 'Edit Test' : 'Add Test'}>
        <div className="space-y-3">
          <div><label className="label-base">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-base text-sm" /></div>
          <div><label className="label-base">Category</label><input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-base text-sm" /></div>
          <div><label className="label-base">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-base text-sm min-h-[60px]" /></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label-base">Sample Type</label><input type="text" value={form.sample_type} onChange={(e) => setForm({ ...form, sample_type: e.target.value })} className="input-base text-sm" /></div><div><label className="label-base">Turnaround</label><input type="text" value={form.turnaround_time} onChange={(e) => setForm({ ...form, turnaround_time: e.target.value })} className="input-base text-sm" /></div></div>
          <div><label className="label-base">Preparation</label><input type="text" value={form.preparation} onChange={(e) => setForm({ ...form, preparation: e.target.value })} className="input-base text-sm" /></div>
          <div className="flex gap-4"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="h-4 w-4" /> Featured</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4" /> Active</label></div>
          <button onClick={save} className="btn-primary w-full">Save</button>
        </div>
      </Dialog>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Test" message="This will permanently delete the test." confirmLabel="Delete" danger />
    </>
  );
}

// ============================================================================
// FAQS
// ============================================================================
export function AdminFaqsPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<FAQ | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ question: '', answer: '', category: '', display_order: 0, is_active: true });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); try { setItems(await getAllFaqs()); } catch { toast.error('Failed'); } finally { setLoading(false); } }

  async function save() {
    try {
      if (editItem) { await supabase.from('faqs').update(form).eq('id', editItem.id); toast.success('Updated'); }
      else { await supabase.from('faqs').insert(form); toast.success('Created'); }
      setEditItem(null); setCreateOpen(false); load();
    } catch { toast.error('Failed'); }
  }
  async function handleDelete() { if (!deleteId) return; try { await supabase.from('faqs').delete().eq('id', deleteId); toast.success('Deleted'); load(); } catch { toast.error('Failed'); } }

  return (
    <>
      <SEO title="FAQs" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-navy-900">FAQs</h2><p className="text-sm text-slate-500">Frequently asked questions</p></div><button onClick={() => { setCreateOpen(true); setForm({ question: '', answer: '', category: '', display_order: 0, is_active: true }); }} className="btn-primary"><Plus className="h-5 w-5" />Add FAQ</button></div>
        {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)}</div> :
         items.length > 0 ? <div className="space-y-2">{items.map((f) => (
           <div key={f.id} className="rounded-xl bg-white p-4 shadow-soft ring-1 ring-slate-200/60">
             <div className="flex items-start justify-between gap-3"><div className="flex-1"><p className="font-semibold text-navy-900">{f.question}</p><p className="mt-1 text-sm text-slate-500">{f.answer}</p></div>
             <div className="flex gap-1"><button onClick={() => { setEditItem(f); setForm({ question: f.question, answer: f.answer, category: f.category ?? '', display_order: f.display_order, is_active: f.is_active }); }} className="rounded-lg p-2 text-slate-500 hover:bg-teal-50"><Edit className="h-4 w-4" /></button><button onClick={() => setDeleteId(f.id)} className="rounded-lg p-2 text-slate-500 hover:bg-error-50"><Trash2 className="h-4 w-4" /></button></div></div>
           </div>
         ))}</div> : <EmptyState title="No FAQs" icon={<HelpCircle className="h-7 w-7" />} />}
      </div>
      <Dialog open={createOpen || !!editItem} onClose={() => { setCreateOpen(false); setEditItem(null); }} title={editItem ? 'Edit FAQ' : 'Add FAQ'}>
        <div className="space-y-3">
          <div><label className="label-base">Question</label><input type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="input-base text-sm" /></div>
          <div><label className="label-base">Answer</label><textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="input-base text-sm min-h-[80px]" /></div>
          <div><label className="label-base">Category</label><input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-base text-sm" /></div>
          <div><label className="label-base">Display Order</label><input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="input-base text-sm" /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4" /> Active</label>
          <button onClick={save} className="btn-primary w-full">Save</button>
        </div>
      </Dialog>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete FAQ" message="This will permanently delete the FAQ." confirmLabel="Delete" danger />
    </>
  );
}

// ============================================================================
// TESTIMONIALS
// ============================================================================
export function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', review: '', rating: 5, date: '', is_published: false, display_order: 0 });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);
  async function load() { setLoading(true); try { setItems(await getAllTestimonials()); } catch { toast.error('Failed'); } finally { setLoading(false); } }

  async function save() {
    try {
      if (editItem) { await supabase.from('testimonials').update({ ...form, date: form.date || null }).eq('id', editItem.id); toast.success('Updated'); }
      else { await supabase.from('testimonials').insert({ ...form, date: form.date || null }); toast.success('Created'); }
      setEditItem(null); setCreateOpen(false); load();
    } catch { toast.error('Failed'); }
  }
  async function handleDelete() { if (!deleteId) return; try { await supabase.from('testimonials').delete().eq('id', deleteId); toast.success('Deleted'); load(); } catch { toast.error('Failed'); } }

  return (
    <>
      <SEO title="Testimonials" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-navy-900">Testimonials</h2><p className="text-sm text-slate-500">Patient reviews</p></div><button onClick={() => { setCreateOpen(true); setForm({ name: '', review: '', rating: 5, date: '', is_published: false, display_order: 0 }); }} className="btn-primary"><Plus className="h-5 w-5" />Add Testimonial</button></div>
        {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24" />)}</div> :
         items.length > 0 ? <div className="grid gap-4 sm:grid-cols-2">{items.map((t) => (
           <div key={t.id} className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60">
             <div className="flex items-start justify-between"><div className="flex-1"><p className="font-semibold text-navy-900">{t.name}</p><div className="flex gap-0.5 mt-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}</div></div>
             <Badge className={t.is_published ? getStatusColor('active') : getStatusColor('archived')}>{t.is_published ? 'Published' : 'Draft'}</Badge></div>
             <p className="mt-3 text-sm text-slate-600">{t.review}</p>
             <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3"><button onClick={() => { setEditItem(t); setForm({ name: t.name, review: t.review, rating: t.rating, date: t.date ?? '', is_published: t.is_published, display_order: t.display_order }); }} className="btn-ghost text-sm"><Edit className="h-4 w-4" />Edit</button><button onClick={() => setDeleteId(t.id)} className="btn-ghost text-sm text-error-600"><Trash2 className="h-4 w-4" />Delete</button></div>
           </div>
         ))}</div> : <EmptyState title="No testimonials" icon={<Star className="h-7 w-7" />} />}
      </div>
      <Dialog open={createOpen || !!editItem} onClose={() => { setCreateOpen(false); setEditItem(null); }} title={editItem ? 'Edit Testimonial' : 'Add Testimonial'}>
        <div className="space-y-3">
          <div><label className="label-base">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-base text-sm" /></div>
          <div><label className="label-base">Review</label><textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} className="input-base text-sm min-h-[80px]" /></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label-base">Rating</label><select value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="input-base text-sm"><option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option><option value={2}>2 Stars</option><option value={1}>1 Star</option></select></div><div><label className="label-base">Date</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-base text-sm" /></div></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="h-4 w-4" /> Published</label>
          <button onClick={save} className="btn-primary w-full">Save</button>
        </div>
      </Dialog>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Testimonial" message="This will permanently delete the testimonial." confirmLabel="Delete" danger />
    </>
  );
}

// ============================================================================
// ANALYTICS
// ============================================================================
export function AdminAnalyticsPage() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getDashboardStats>> | null>(null);
  const [accessLogs, setAccessLogs] = useState<ReportAccessLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getReportAccessLogs(50)])
      .then(([s, a]) => { setStats(s); setAccessLogs(a); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  const successCount = accessLogs.filter((l) => l.success).length;
  const failCount = accessLogs.length - successCount;

  return (
    <>
      <SEO title="Analytics" noindex />
      <div className="space-y-6">
        <div><h2 className="text-2xl font-bold text-navy-900">Analytics</h2><p className="text-sm text-slate-500">Platform usage overview</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60"><p className="text-3xl font-extrabold text-navy-900">{stats?.totalPatients ?? 0}</p><p className="text-sm text-slate-500">Total Patients</p></div>
          <div className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60"><p className="text-3xl font-extrabold text-navy-900">{stats?.totalReports ?? 0}</p><p className="text-sm text-slate-500">Total Reports</p></div>
          <div className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60"><p className="text-3xl font-extrabold text-navy-900">{stats?.totalBookings ?? 0}</p><p className="text-sm text-slate-500">Package Bookings</p></div>
          <div className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60"><p className="text-3xl font-extrabold text-success-600">{successCount}</p><p className="text-sm text-slate-500">Successful Report Accesses</p></div>
          <div className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60"><p className="text-3xl font-extrabold text-error-600">{failCount}</p><p className="text-sm text-slate-500">Failed Access Attempts</p></div>
          <div className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60"><p className="text-3xl font-extrabold text-amber-600">{stats?.pendingBookings ?? 0}</p><p className="text-sm text-slate-500">Pending Bookings</p></div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
          <h3 className="mb-4 text-lg font-bold text-navy-900">Recent Report Access Activity</h3>
          {accessLogs.length > 0 ? <div className="space-y-2">{accessLogs.slice(0, 10).map((l) => (
            <div key={l.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
              <div className="flex items-center gap-2"><div className={`h-2 w-2 rounded-full ${l.success ? 'bg-success-500' : 'bg-error-500'}`} /><span className="font-medium">{l.action}</span><span className="text-slate-400">{l.patient_id_attempt ?? '-'}</span></div>
              <span className="text-xs text-slate-400">{timeAgo(l.access_time)}</span>
            </div>
          ))}</div> : <p className="text-sm text-slate-400">No access activity recorded.</p>}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// AUDIT LOGS
// ============================================================================
export function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getAuditLogs(100).then((data) => { setLogs(data); setLoading(false); }).catch(() => setLoading(false)); }, []);

  return (
    <>
      <SEO title="Audit Logs" noindex />
      <div className="space-y-6">
        <div><h2 className="text-2xl font-bold text-navy-900">Audit Logs</h2><p className="text-sm text-slate-500">Admin action history</p></div>
        {loading ? <div className="space-y-3">{[...Array(8)].map((_, i) => <Skeleton key={i} className="h-14" />)}</div> :
         logs.length > 0 ? <div className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200/60"><div className="overflow-x-auto"><table className="w-full text-sm">
           <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Action</th><th className="px-4 py-3">User</th><th className="px-4 py-3">Entity</th><th className="px-4 py-3">Time</th></tr></thead>
           <tbody className="divide-y divide-slate-100">{logs.map((l) => (
             <tr key={l.id} className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-navy-900">{l.action}</td><td className="px-4 py-3 text-slate-600">{l.user_email ?? '-'}</td><td className="px-4 py-3 text-slate-600">{l.entity_type ?? '-'}</td><td className="px-4 py-3 text-xs text-slate-400">{formatDateTime(l.created_at)}</td></tr>
           ))}</tbody>
         </table></div></div> : <EmptyState title="No audit logs" icon={<ScrollText className="h-7 w-7" />} />}
      </div>
    </>
  );
}

// ============================================================================
// SETTINGS
// ============================================================================
export function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    getAllSiteSettings().then((data) => {
      setSettings(data);
      const v: Record<string, string> = {};
      data.forEach((s) => { v[s.key] = s.value ?? ''; });
      setValues(v);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await Promise.all(Object.entries(values).map(([key, value]) => updateSiteSetting(key, value)));
      await logAudit('settings_update', 'site_settings');
      toast.success('Settings saved');
    } catch { toast.error('Failed to save settings'); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  const categories = [...new Set(settings.map((s) => s.category))];

  return (
    <>
      <SEO title="Settings" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-navy-900">Settings</h2><p className="text-sm text-slate-500">Configure business information and preferences</p></div>
          <button onClick={handleSave} disabled={saving} className="btn-primary">{saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}{saving ? 'Saving...' : 'Save All'}</button>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">{cat.replace(/_/g, ' ')}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {settings.filter((s) => s.category === cat).map((s) => (
                <div key={s.key} className={s.key.includes('address') || s.key.includes('message') || s.key.includes('hours') || s.key.includes('description') ? 'sm:col-span-2' : ''}>
                  <label className="label-base">{s.description ?? s.key.replace(/_/g, ' ')}</label>
                  {s.key.includes('address') || s.key.includes('message') || s.key.includes('description') || s.key.includes('hours') ?
                    <textarea value={values[s.key] ?? ''} onChange={(e) => setValues({ ...values, [s.key]: e.target.value })} className="input-base text-sm" /> :
                    <input type="text" value={values[s.key] ?? ''} onChange={(e) => setValues({ ...values, [s.key]: e.target.value })} className="input-base text-sm" />
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSave} disabled={saving} className="btn-primary w-full">{saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}{saving ? 'Saving...' : 'Save All Settings'}</button>
      </div>
    </>
  );
}
