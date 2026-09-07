import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { EmptyState } from '@/components/States';
import { supabase, getAllPackages, createPackage, updatePackage, logAudit } from '@/services/data-service';
import { slugify, getCategoryLabel } from '@/lib/utils';
import type { Package, PackageCategory } from '@/types';

export function AdminPackageEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [pkg, setPkg] = useState<Partial<Package>>({
    name: '', slug: '', category: 'basic', gender: 'any', description: '', short_description: '',
    original_price: null, offer_price: null, is_featured: false, is_active: true, display_order: 0,
    preparation_instructions: '', turnaround_time: '',
  });
  const [tests, setTests] = useState<{ test_name: string; test_group: string | null; display_order: number }[]>([]);

  useEffect(() => {
    if (!id) return;
    getAllPackages().then((all) => {
      const found = all.find((p) => p.id === id);
      if (found) {
        setPkg(found);
        setTests((found.package_tests ?? []).map((t) => ({ test_name: t.test_name, test_group: t.test_group, display_order: t.display_order })));
      }
      setLoading(false);
    }).catch(() => { setLoading(false); toast.error('Failed to load package'); });
  }, [id]);

  function addTest() {
    setTests([...tests, { test_name: '', test_group: null, display_order: tests.length }]);
  }

  function updateTest(i: number, field: 'test_name' | 'test_group', value: string) {
    const updated = [...tests];
    updated[i] = { ...updated[i], [field]: value || null };
    setTests(updated);
  }

  function removeTest(i: number) {
    setTests(tests.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    if (!pkg.name || !pkg.slug) { toast.error('Name and slug are required'); return; }
    setSaving(true);
    try {
      const validTests = tests.filter((t) => t.test_name.trim());
      if (isEdit && id) {
        await updatePackage(id, { ...pkg, updated_by: (await supabase.auth.getUser()).data.user?.id }, validTests);
        await logAudit('package_edit', 'package', id);
        toast.success('Package updated');
      } else {
        const created = await createPackage({ ...pkg, created_by: (await supabase.auth.getUser()).data.user?.id }, validTests);
        await logAudit('package_create', 'package', created.id);
        toast.success('Package created');
      }
      navigate('/admin/packages');
    } catch { toast.error('Failed to save package'); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  return (
    <>
      <SEO title="Package Editor" noindex />
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/packages')} className="btn-ghost"><ArrowLeft className="h-4 w-4" />Back</button>
          <h2 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit Package' : 'New Package'}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
          <h3 className="mb-4 text-sm font-bold text-navy-900">Package Information</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className="label-base">Name</label><input type="text" value={pkg.name ?? ''} onChange={(e) => setPkg({ ...pkg, name: e.target.value, slug: pkg.slug || slugify(e.target.value) })} className="input-base text-sm" /></div>
            <div><label className="label-base">Slug</label><input type="text" value={pkg.slug ?? ''} onChange={(e) => setPkg({ ...pkg, slug: slugify(e.target.value) })} className="input-base text-sm" /></div>
            <div><label className="label-base">Category</label><select value={pkg.category ?? 'basic'} onChange={(e) => setPkg({ ...pkg, category: e.target.value as PackageCategory })} className="input-base text-sm"><option value="basic">Basic</option><option value="primary">Primary</option><option value="master">Master</option><option value="executive">Executive</option><option value="pcod">PCOD</option><option value="promotional">Promotional Offers</option><option value="complete_body">Complete Body</option></select></div>
            <div><label className="label-base">Gender</label><select value={pkg.gender ?? 'any'} onChange={(e) => setPkg({ ...pkg, gender: e.target.value as 'male' | 'female' | 'any' })} className="input-base text-sm"><option value="any">All</option><option value="male">Male</option><option value="female">Female</option></select></div>
            <div><label className="label-base">Display Order</label><input type="number" value={pkg.display_order ?? 0} onChange={(e) => setPkg({ ...pkg, display_order: parseInt(e.target.value) || 0 })} className="input-base text-sm" /></div>
            <div><label className="label-base">Original Price</label><input type="number" value={pkg.original_price ?? ''} onChange={(e) => setPkg({ ...pkg, original_price: e.target.value ? parseFloat(e.target.value) : null })} className="input-base text-sm" /></div>
            <div><label className="label-base">Offer Price</label><input type="number" value={pkg.offer_price ?? ''} onChange={(e) => setPkg({ ...pkg, offer_price: e.target.value ? parseFloat(e.target.value) : null })} className="input-base text-sm" /></div>
            <div className="sm:col-span-2"><label className="label-base">Short Description</label><input type="text" value={pkg.short_description ?? ''} onChange={(e) => setPkg({ ...pkg, short_description: e.target.value })} className="input-base text-sm" /></div>
            <div className="sm:col-span-2"><label className="label-base">Description</label><textarea value={pkg.description ?? ''} onChange={(e) => setPkg({ ...pkg, description: e.target.value })} className="input-base text-sm min-h-[80px]" /></div>
            <div className="sm:col-span-2"><label className="label-base">Preparation Instructions</label><textarea value={pkg.preparation_instructions ?? ''} onChange={(e) => setPkg({ ...pkg, preparation_instructions: e.target.value })} className="input-base text-sm min-h-[60px]" /></div>
            <div className="sm:col-span-2"><label className="label-base">Turnaround Time</label><input type="text" value={pkg.turnaround_time ?? ''} onChange={(e) => setPkg({ ...pkg, turnaround_time: e.target.value })} className="input-base text-sm" /></div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={pkg.is_featured ?? false} onChange={(e) => setPkg({ ...pkg, is_featured: e.target.checked })} className="h-4 w-4 rounded" /> Featured</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={pkg.is_active ?? true} onChange={(e) => setPkg({ ...pkg, is_active: e.target.checked })} className="h-4 w-4 rounded" /> Active</label>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900">Tests</h3>
            <button onClick={addTest} className="btn-secondary text-sm"><Plus className="h-4 w-4" />Add Test</button>
          </div>
          {tests.length > 0 ? (
            <div className="space-y-2">
              {tests.map((t, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" placeholder="Test name" value={t.test_name} onChange={(e) => updateTest(i, 'test_name', e.target.value)} className="input-base text-sm flex-1" />
                  <input type="text" placeholder="Group (optional)" value={t.test_group ?? ''} onChange={(e) => updateTest(i, 'test_group', e.target.value)} className="input-base text-sm w-40" />
                  <button onClick={() => removeTest(i)} className="rounded-lg p-2 text-slate-500 hover:bg-error-50 hover:text-error-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          ) : <EmptyState title="No tests added" className="py-8" />}
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary w-full">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          {saving ? 'Saving...' : 'Save Package'}
        </button>
      </div>
    </>
  );
}
