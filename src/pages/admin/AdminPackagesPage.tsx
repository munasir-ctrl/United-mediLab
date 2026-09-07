import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Star, Trash2, Eye, EyeOff, Package as PackageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { Skeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { Badge } from '@/components/Badge';
import { ConfirmDialog } from '@/components/Dialog';
import { getAllPackages, deletePackage, updatePackage, logAudit } from '@/services/data-service';
import { formatCurrency, getCategoryColor, getCategoryLabel } from '@/lib/utils';
import type { Package } from '@/types';

export function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { loadPackages(); }, []);

  async function loadPackages() {
    setLoading(true);
    try { setPackages(await getAllPackages()); } catch { toast.error('Failed to load packages'); }
    finally { setLoading(false); }
  }

  async function toggleActive(pkg: Package) {
    try {
      await updatePackage(pkg.id, { is_active: !pkg.is_active }, []);
      await logAudit('package_edit', 'package', pkg.id, { is_active: !pkg.is_active });
      toast.success(`Package ${!pkg.is_active ? 'activated' : 'deactivated'}`);
      loadPackages();
    } catch { toast.error('Failed to update package'); }
  }

  async function toggleFeatured(pkg: Package) {
    try {
      await updatePackage(pkg.id, { is_featured: !pkg.is_featured }, []);
      toast.success(`Package ${!pkg.is_featured ? 'featured' : 'unfeatured'}`);
      loadPackages();
    } catch { toast.error('Failed to update package'); }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await deletePackage(deleteId);
      await logAudit('package_delete', 'package', deleteId);
      toast.success('Package deleted');
      loadPackages();
    } catch { toast.error('Failed to delete package'); }
  }

  return (
    <>
      <SEO title="Packages" noindex />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-navy-900">Packages</h2><p className="text-sm text-slate-500">Manage health check packages</p></div>
          <Link to="/admin/packages/new" className="btn-primary"><Plus className="h-5 w-5" />New Package</Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48" />)}</div>
        ) : packages.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.id} className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge className={getCategoryColor(pkg.category)}>{getCategoryLabel(pkg.category)}</Badge>
                    {pkg.is_featured && <Badge className="bg-primary-50 text-primary-700 ring-1 ring-primary-200"><Star className="h-3 w-3 fill-current" /> Featured</Badge>}
                  </div>
                  <span className={`text-xs font-semibold ${pkg.is_active ? 'text-success-600' : 'text-slate-400'}`}>{pkg.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <h3 className="font-bold text-navy-900">{pkg.name}</h3>
                <div className="mt-2 flex items-end gap-2">
                  {pkg.offer_price != null && <span className="text-xl font-extrabold text-primary-700">{formatCurrency(pkg.offer_price)}</span>}
                  {pkg.original_price != null && <span className="text-sm text-slate-400 line-through">{formatCurrency(pkg.original_price)}</span>}
                </div>
                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                  <Link to={`/admin/packages/${pkg.id}`} className="btn-ghost flex-1 text-sm"><Edit className="h-4 w-4" />Edit</Link>
                  <button onClick={() => toggleFeatured(pkg)} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600" title="Toggle Featured"><Star className="h-4 w-4" /></button>
                  <button onClick={() => toggleActive(pkg)} className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-600" title="Toggle Active">{pkg.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                  <button onClick={() => setDeleteId(pkg.id)} className="rounded-lg p-2 text-slate-500 hover:bg-error-50 hover:text-error-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState title="No packages" icon={<PackageIcon className="h-7 w-7" />} action={<Link to="/admin/packages/new" className="btn-primary">Create Package</Link>} />}
      </div>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Package" message="This will permanently delete the package and all its tests." confirmLabel="Delete" danger />
    </>
  );
}
