import { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Users, Package, CalendarClock,
  Stethoscope, TestTube, Mail, HelpCircle, Star, BarChart3,
  ScrollText, Settings, LogOut, Menu, X, Bell, Search,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Reports', path: '/admin/reports', icon: FileText, roles: ['super_admin', 'admin', 'lab_staff'] },
  { label: 'Upload Report', path: '/admin/reports/upload', icon: FileText, roles: ['super_admin', 'admin', 'lab_staff'] },
  { label: 'Patients', path: '/admin/patients', icon: Users, roles: ['super_admin', 'admin', 'lab_staff', 'reception'] },
  { label: 'Packages', path: '/admin/packages', icon: Package, roles: ['super_admin', 'admin'] },
  { label: 'Package Bookings', path: '/admin/package-bookings', icon: CalendarClock, roles: ['super_admin', 'admin', 'reception'] },
  { label: 'Services', path: '/admin/services', icon: Stethoscope, roles: ['super_admin', 'admin'] },
  { label: 'Tests', path: '/admin/tests', icon: TestTube, roles: ['super_admin', 'admin'] },
  { label: 'Appointments', path: '/admin/appointments', icon: CalendarClock, roles: ['super_admin', 'admin', 'reception'] },
  { label: 'Messages', path: '/admin/messages', icon: Mail, roles: ['super_admin', 'admin', 'reception'] },
  { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle, roles: ['super_admin', 'admin'] },
  { label: 'Testimonials', path: '/admin/testimonials', icon: Star, roles: ['super_admin', 'admin'] },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3, roles: ['super_admin', 'admin'] },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: ScrollText, roles: ['super_admin'] },
  { label: 'Settings', path: '/admin/settings', icon: Settings, roles: ['super_admin', 'admin'] },
];

export function AdminLayout() {
  const { profile, signOut, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const visibleItems = navItems.filter((item) => !item.roles || hasRole(...item.roles));

  const currentLabel = navItems.find((item) => item.path === location.pathname)?.label || 'Admin';

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-100 px-5">
          <Link to="/admin">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {visibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                cn(
                  'mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" style={{ width: '1.125rem', height: '1.125rem' }} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <div className="mb-2 px-3 py-2">
            <p className="text-sm font-semibold text-navy-900">{profile?.full_name}</p>
            <p className="text-xs text-slate-500 capitalize">{profile?.role.replace('_', ' ')}</p>
          </div>
          <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-error-600 transition-colors hover:bg-error-50">
            <LogOut className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white"
            >
              <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
                <Logo />
                <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-3">
                {visibleItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      )
                    }
                  >
                    <item.icon className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <button onClick={handleSignOut} className="border-t border-slate-100 p-3 text-sm font-medium text-error-600">
                Sign Out
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-lg md:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-navy-900">{currentLabel}</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Search...</span>
            </div>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-700">
              {profile?.full_name?.charAt(0).toUpperCase() ?? 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
