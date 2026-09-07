import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, X } from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { Skeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { Badge } from '@/components/Badge';
import { Dialog } from '@/components/Dialog';
import { getAllPackageBookings, updatePackageBooking, logAudit } from '@/services/data-service';
import { formatDate, formatDateTime, getStatusColor } from '@/lib/utils';
import type { PackageBooking } from '@/types';

const bookingStatuses = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'] as const;

export function AdminBookingsPage() {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editBooking, setEditBooking] = useState<PackageBooking | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => { loadBookings(); }, []);

  async function loadBookings() {
    setLoading(true);
    try { setBookings(await getAllPackageBookings()); } catch { toast.error('Failed to load bookings'); }
    finally { setLoading(false); }
  }

  const filtered = statusFilter === 'all' ? bookings : bookings.filter((b) => b.status === statusFilter);

  async function updateStatus(id: string, status: string) {
    try {
      await updatePackageBooking(id, { status: status as PackageBooking['status'] });
      await logAudit('booking_status_change', 'booking', id, { status });
      toast.success('Status updated');
      loadBookings();
    } catch { toast.error('Failed to update status'); }
  }

  async function saveNote() {
    if (!editBooking) return;
    try {
      await updatePackageBooking(editBooking.id, { internal_note: note });
      toast.success('Note saved');
      setEditBooking(null);
      loadBookings();
    } catch { toast.error('Failed to save note'); }
  }

  return (
    <>
      <SEO title="Package Bookings" noindex />
      <div className="space-y-6">
        <div><h2 className="text-2xl font-bold text-navy-900">Package Bookings</h2><p className="text-sm text-slate-500">Manage package booking requests</p></div>

        <div className="flex gap-2 flex-wrap">
          {['all', ...bookingStatuses].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${statusFilter === s ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>

        {loading ? <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20" />)}</div> :
         filtered.length > 0 ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200/60">
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"><tr>
                <th className="px-4 py-3">Customer</th><th className="px-4 py-3">Package</th><th className="px-4 py-3">Date/Time</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Created</th><th className="px-4 py-3 text-right">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3"><p className="font-medium text-navy-900">{b.patient_name}</p><p className="text-xs text-slate-400">{b.phone}</p></td>
                    <td className="px-4 py-3 text-slate-600">{b.package_name ?? '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(b.preferred_date)} {b.preferred_time}</td>
                    <td className="px-4 py-3"><Badge className={getStatusColor(b.status)}>{b.status}</Badge></td>
                    <td className="px-4 py-3 text-xs text-slate-400">{formatDateTime(b.created_at)}</td>
                    <td className="px-4 py-3"><div className="flex justify-end gap-1">
                      <a href={`tel:${b.phone}`} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600"><Phone className="h-4 w-4" /></a>
                      <button onClick={() => { setEditBooking(b); setNote(b.internal_note ?? ''); }} className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-600"><MessageSquare className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </div>
        ) : <EmptyState title="No bookings found" icon={<Calendar className="h-7 w-7" />} />}
      </div>

      <Dialog open={!!editBooking} onClose={() => setEditBooking(null)} title="Booking Details">
        {editBooking && (
          <div className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div><p className="text-xs text-slate-400">Customer</p><p className="font-semibold">{editBooking.patient_name}</p></div>
              <div><p className="text-xs text-slate-400">Phone</p><a href={`tel:${editBooking.phone}`} className="font-semibold text-primary-700">{editBooking.phone}</a></div>
              <div><p className="text-xs text-slate-400">Package</p><p>{editBooking.package_name}</p></div>
              {editBooking.email && <div><p className="text-xs text-slate-400">Email</p><p>{editBooking.email}</p></div>}
              <div><p className="text-xs text-slate-400">Preferred Date</p><p>{formatDate(editBooking.preferred_date)} {editBooking.preferred_time}</p></div>
              {editBooking.message && <div><p className="text-xs text-slate-400">Message</p><p className="rounded-lg bg-slate-50 p-3">{editBooking.message}</p></div>}
            </div>
            <div><label className="label-base">Status</label>
              <select value={editBooking.status} onChange={(e) => { updateStatus(editBooking.id, e.target.value); setEditBooking({ ...editBooking, status: e.target.value as PackageBooking['status'] }); }} className="input-base text-sm">
                {bookingStatuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div><label className="label-base">Internal Note</label><textarea value={note} onChange={(e) => setNote(e.target.value)} className="input-base text-sm min-h-[80px]" /></div>
            <button onClick={saveNote} className="btn-primary w-full">Save Note</button>
          </div>
        )}
      </Dialog>
    </>
  );
}
