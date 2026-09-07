import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth-context';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Loader2 } from 'lucide-react';
import { getSiteSettings } from '@/services/data-service';
import type { SiteSettings } from '@/types';

// Public pages (eagerly loaded)
import { HomePage } from '@/pages/HomePage';
import { PackagesPage } from '@/pages/PackagesPage';
import { PackageDetailPage } from '@/pages/PackageDetailPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { TestsPage } from '@/pages/TestsPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { BookTestPage } from '@/pages/BookTestPage';
import { PatientReportsPage } from '@/pages/PatientReportsPage';
import { PrivacyPage, TermsPage, LocationsPage } from '@/pages/LegalPages';

// Admin pages (eagerly loaded — they're behind auth)
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminReportsPage } from '@/pages/admin/AdminReportsPage';
import { AdminUploadReportPage } from '@/pages/admin/AdminUploadReportPage';
import { AdminPatientsPage } from '@/pages/admin/AdminPatientsPage';
import { AdminPackagesPage } from '@/pages/admin/AdminPackagesPage';
import { AdminPackageEditorPage } from '@/pages/admin/AdminPackageEditorPage';
import { AdminBookingsPage } from '@/pages/admin/AdminBookingsPage';
import {
  AdminAppointmentsPage, AdminMessagesPage, AdminServicesPage,
  AdminTestsPage, AdminFaqsPage, AdminTestimonialsPage,
  AdminAnalyticsPage, AdminAuditLogsPage, AdminSettingsPage,
} from '@/pages/admin/AdminContentPages';

import { PublicLayout } from '@/layouts/PublicLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 30000 },
  },
});

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
    </div>
  );
}

function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  return <PublicLayout settings={settings}>{children}</PublicLayout>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster position="top-right" richColors />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicLayoutWrapper><HomePage /></PublicLayoutWrapper>} />
              <Route path="/about" element={<PublicLayoutWrapper><AboutPage /></PublicLayoutWrapper>} />
              <Route path="/services" element={<PublicLayoutWrapper><ServicesPage /></PublicLayoutWrapper>} />
              <Route path="/tests" element={<PublicLayoutWrapper><TestsPage /></PublicLayoutWrapper>} />
              <Route path="/packages" element={<PublicLayoutWrapper><PackagesPage /></PublicLayoutWrapper>} />
              <Route path="/packages/:slug" element={<PublicLayoutWrapper><PackageDetailPage /></PublicLayoutWrapper>} />
              <Route path="/book-test" element={<PublicLayoutWrapper><BookTestPage /></PublicLayoutWrapper>} />
              <Route path="/contact" element={<PublicLayoutWrapper><ContactPage /></PublicLayoutWrapper>} />
              <Route path="/locations" element={<PublicLayoutWrapper><LocationsPage /></PublicLayoutWrapper>} />
              <Route path="/patient-reports" element={<PublicLayoutWrapper><PatientReportsPage /></PublicLayoutWrapper>} />
              <Route path="/privacy" element={<PublicLayoutWrapper><PrivacyPage /></PublicLayoutWrapper>} />
              <Route path="/terms" element={<PublicLayoutWrapper><TermsPage /></PublicLayoutWrapper>} />

              {/* Admin login */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin protected routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="reports" element={<ProtectedRoute roles={['super_admin', 'admin', 'lab_staff']}><AdminReportsPage /></ProtectedRoute>} />
                <Route path="reports/upload" element={<ProtectedRoute roles={['super_admin', 'admin', 'lab_staff']}><AdminUploadReportPage /></ProtectedRoute>} />
                <Route path="patients" element={<ProtectedRoute><AdminPatientsPage /></ProtectedRoute>} />
                <Route path="packages" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminPackagesPage /></ProtectedRoute>} />
                <Route path="packages/new" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminPackageEditorPage /></ProtectedRoute>} />
                <Route path="packages/:id" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminPackageEditorPage /></ProtectedRoute>} />
                <Route path="package-bookings" element={<ProtectedRoute><AdminBookingsPage /></ProtectedRoute>} />
                <Route path="services" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminServicesPage /></ProtectedRoute>} />
                <Route path="tests" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminTestsPage /></ProtectedRoute>} />
                <Route path="appointments" element={<ProtectedRoute><AdminAppointmentsPage /></ProtectedRoute>} />
                <Route path="messages" element={<ProtectedRoute><AdminMessagesPage /></ProtectedRoute>} />
                <Route path="faqs" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminFaqsPage /></ProtectedRoute>} />
                <Route path="testimonials" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminTestimonialsPage /></ProtectedRoute>} />
                <Route path="analytics" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminAnalyticsPage /></ProtectedRoute>} />
                <Route path="audit-logs" element={<ProtectedRoute roles={['super_admin']}><AdminAuditLogsPage /></ProtectedRoute>} />
                <Route path="settings" element={<ProtectedRoute roles={['super_admin', 'admin']}><AdminSettingsPage /></ProtectedRoute>} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<PublicLayoutWrapper><NotFound /></PublicLayoutWrapper>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-navy-900">404</h1>
      <p className="mt-4 text-slate-500">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary mt-6">Go Home</a>
    </div>
  );
}
