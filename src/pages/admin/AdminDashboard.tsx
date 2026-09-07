import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, FileText, CalendarClock, Eye, TrendingUp,
  Clock, AlertCircle,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { SEO } from '@/components/SEO';
import { Skeleton } from '@/components/Skeleton';
import { getDashboardStats, getAllPackageBookings, getAuditLogs } from '@/services/data-service';
import { timeAgo, cn } from '@/lib/utils';

export function AdminDashboard() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getDashboardStats>> | null>(null);
  const [recentBookings, setRecentBookings] = useState<Awaited<ReturnType<typeof getAllPackageBookings>>>([]);
  const [recentActivity, setRecentActivity] = useState<Awaited<ReturnType<typeof getAuditLogs>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getAllPackageBookings(), getAuditLogs(10)])
      .then(([s, b, a]) => {
        setStats(s);
        setRecentBookings(b.slice(0, 5));
        setRecentActivity(a.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Patients', value: stats?.totalPatients ?? 0, icon: Users, color: 'text-primary-600 bg-primary-50' },
    { label: 'Reports Uploaded', value: stats?.totalReports ?? 0, icon: FileText, color: 'text-teal-600 bg-teal-50' },
    { label: 'Reports This Month', value: stats?.reportsThisMonth ?? 0, icon: TrendingUp, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Package Bookings', value: stats?.totalBookings ?? 0, icon: CalendarClock, color: 'text-navy-600 bg-navy-50' },
    { label: 'Pending Bookings', value: stats?.pendingBookings ?? 0, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Report Accesses', value: stats?.totalAccessLogs ?? 0, icon: Eye, color: 'text-violet-600 bg-violet-50' },
  ];

  const pieData = [
    { name: 'Successful Access', value: (stats?.totalAccessLogs ?? 0) - (stats?.failedAccess ?? 0), color: '#16a34a' },
    { name: 'Failed Attempts', value: stats?.failedAccess ?? 0, color: '#ef4444' },
  ];

  return (
    <>
      <SEO title="Dashboard" noindex />
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Dashboard</h2>
          <p className="text-sm text-slate-500">Overview of your laboratory operations.</p>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {loading ? (
            [...Array(6)].map((_, i) => <Skeleton key={i} className="h-28" />)
          ) : (
            cards.map((card) => (
              <div key={card.label} className="rounded-xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60">
                <div className={cn('mb-3 flex h-10 w-10 items-center justify-center rounded-lg', card.color)}>
                  <card.icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-extrabold text-navy-900">{card.value}</p>
                <p className="text-xs text-slate-500">{card.label}</p>
              </div>
            ))
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Report Access Chart */}
          <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
            <h3 className="text-lg font-bold text-navy-900">Report Access</h3>
            <p className="text-sm text-slate-500">Success vs. failed access attempts</p>
            {loading ? (
              <Skeleton className="mt-4 h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={250} className="mt-4">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Recent Bookings</h3>
              <Link to="/admin/package-bookings" className="text-sm text-primary-600 hover:underline">View all</Link>
            </div>
            {loading ? (
              <div className="mt-4 space-y-3">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12" />)}
              </div>
            ) : recentBookings.length > 0 ? (
              <div className="mt-4 space-y-2">
                {recentBookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{b.patient_name}</p>
                      <p className="text-xs text-slate-500">{b.package_name} | {b.phone}</p>
                    </div>
                    <span className="text-xs text-slate-400">{timeAgo(b.created_at)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">No bookings yet.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200/60">
          <h3 className="text-lg font-bold text-navy-900">Recent Activity</h3>
          {loading ? (
            <div className="mt-4 space-y-3">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="mt-4 space-y-2">
              {recentActivity.map((log) => (
                <div key={log.id} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy-900">{log.action}</p>
                    <p className="text-xs text-slate-500">{log.user_email || 'System'}</p>
                  </div>
                  <span className="text-xs text-slate-400">{timeAgo(log.created_at)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">No recent activity.</p>
          )}
        </div>
      </div>
    </>
  );
}
