import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Eye, Download, Archive, Trash2, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { Skeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { Badge } from '@/components/Badge';
import { ConfirmDialog } from '@/components/Dialog';
import { getAllReports, updateReport, getReportSignedUrl, logAudit } from '@/services/data-service';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Report } from '@/types';

export function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [viewing, setViewing] = useState<Report | null>(null);
  const [viewUrl, setViewUrl] = useState<string | null>(null);
  const [loadingUrl, setLoadingUrl] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    setLoading(true);
    try {
      const data = await getAllReports();
      setReports(data);
    } catch {
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    let r = reports;
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((rep) =>
        rep.report_number.toLowerCase().includes(q) ||
        rep.test_name.toLowerCase().includes(q) ||
        rep.patients?.patient_id.toLowerCase().includes(q) ||
        rep.patients?.full_name.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') r = r.filter((rep) => rep.status === statusFilter);
    return r;
  }, [reports, search, statusFilter]);

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  async function handleView(rep: Report) {
    setViewing(rep);
    setLoadingUrl(true);
    setViewUrl(null);
    try {
      const url = await getReportSignedUrl(rep.file_path);
      setViewUrl(url);
    } catch {
      toast.error('Unable to generate report URL');
    } finally {
      setLoadingUrl(false);
    }
  }

  async function handleArchive() {
    if (!archiveId) return;
    try {
      await updateReport(archiveId, { status: 'archived' });
      await logAudit('report_archive', 'report', archiveId);
      toast.success('Report archived');
      loadReports();
    } catch {
      toast.error('Failed to archive report');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await updateReport(deleteId, { status: 'deleted' });
      await logAudit('report_delete', 'report', deleteId);
      toast.success('Report deleted');
      loadReports();
    } catch {
      toast.error('Failed to delete report');
    }
  }

  async function handleDownload(rep: Report) {
    try {
      const url = await getReportSignedUrl(rep.file_path);
      if (url) window.open(url, '_blank');
    } catch {
      toast.error('Unable to download report');
    }
  }

  return (
    <>
      <SEO title="Reports" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy-900">Reports</h2>
            <p className="text-sm text-slate-500">Manage laboratory reports</p>
          </div>
          <Link to="/admin/reports/upload" className="btn-primary">
            <Plus className="h-5 w-5" />
            Upload Report
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 rounded-xl bg-white p-4 shadow-soft ring-1 ring-slate-200/60">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by report #, patient, test..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="input-base pl-12"
            />
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }} className="input-base w-auto cursor-pointer text-sm">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : paged.length > 0 ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200/60">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Report #</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Test</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paged.map((rep) => (
                    <tr key={rep.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-navy-900">{rep.report_number}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{rep.patients?.full_name}</p>
                        <p className="text-xs text-slate-400">{rep.patients?.patient_id}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{rep.test_name}</td>
                      <td className="px-4 py-3 text-slate-600">{formatDate(rep.report_date)}</td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(rep.status)}>{rep.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => handleView(rep)} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600" title="View">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDownload(rep)} className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-600" title="Download">
                            <Download className="h-4 w-4" />
                          </button>
                          {rep.status === 'active' && (
                            <button onClick={() => setArchiveId(rep.id)} className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600" title="Archive">
                              <Archive className="h-4 w-4" />
                            </button>
                          )}
                          <button onClick={() => setDeleteId(rep.id)} className="rounded-lg p-2 text-slate-500 hover:bg-error-50 hover:text-error-600" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                <p className="text-xs text-slate-500">Page {page + 1} of {totalPages}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="btn-ghost text-sm disabled:opacity-50">Previous</button>
                  <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="btn-ghost text-sm disabled:opacity-50">Next</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState title="No reports found" description="Upload a report to get started." icon={<FileText className="h-7 w-7" />} action={<Link to="/admin/reports/upload" className="btn-primary">Upload Report</Link>} />
        )}
      </div>

      {/* View Dialog */}
      {viewing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => { setViewing(null); setViewUrl(null); }} />
          <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-float animate-scale-in max-h-[90vh] flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-navy-900">{viewing.test_name}</h2>
                <p className="text-sm text-slate-500">{viewing.report_number} | {viewing.patients?.full_name}</p>
              </div>
              <button onClick={() => { setViewing(null); setViewUrl(null); }} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">✕</button>
            </div>
            {loadingUrl ? (
              <div className="flex flex-1 items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>
            ) : viewUrl ? (
              <iframe src={viewUrl} className="w-full flex-1 rounded-lg border border-slate-200" title="Report preview" />
            ) : (
              <p className="py-20 text-center text-slate-500">Unable to load report preview.</p>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog open={!!archiveId} onClose={() => setArchiveId(null)} onConfirm={handleArchive} title="Archive Report" message="This report will be archived. The patient will no longer be able to access it." confirmLabel="Archive" danger={false} />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Report" message="This will mark the report as deleted. This action can be reversed." confirmLabel="Delete" danger />
    </>
  );
}
