import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileSearch, CalendarPlus, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import type { SiteSettings } from '@/types';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Tests', path: '/tests' },
  { label: 'Packages', path: '/packages' },
  { label: 'Contact', path: '/contact' },
];

export function PublicLayout({ children, settings }: { children: React.ReactNode; settings: SiteSettings | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const announcement = settings?.announcement_enabled && settings?.announcement_text;

  return (
    <div className="flex min-h-screen flex-col">
      {announcement && (
        <div className="bg-primary-700 py-2 text-center text-xs font-medium text-white">
          {announcement}
        </div>
      )}

      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-white/90 shadow-soft backdrop-blur-lg'
            : 'bg-white'
        )}
      >
        <div className="container-page">
          <div className={cn('flex items-center justify-between transition-all', scrolled ? 'h-14' : 'h-16 md:h-20')}>
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Link to="/patient-reports" className="btn-primary text-xs">
                <FileSearch className="h-4 w-4" />
                Get Your Report
              </Link>
              <Link to="/book-test" className="btn-secondary text-xs">
                <CalendarPlus className="h-4 w-4" />
                Book a Test
              </Link>
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-float"
            >
              <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="space-y-3 border-t border-slate-100 p-4">
                <Link to="/patient-reports" className="btn-primary w-full">
                  <FileSearch className="h-4 w-4" />
                  Get Your Report
                </Link>
                <Link to="/book-test" className="btn-secondary w-full">
                  <CalendarPlus className="h-4 w-4" />
                  Book a Test
                </Link>
                {settings?.business_phone && (
                  <a href={`tel:${settings.business_phone}`} className="btn-ghost w-full">
                    <Phone className="h-4 w-4" />
                    {settings.business_phone}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <Footer settings={settings} />
    </div>
  );
}

function Footer({ settings }: { settings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-slate-400">
              Professional diagnostic laboratory in Perumbavoor, Kerala. Accurate testing with secure digital report access.
            </p>
            {settings?.business_phone && (
              <a href={`tel:${settings.business_phone}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                <Phone className="h-4 w-4" />
                {settings.business_phone}
              </a>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Services', path: '/services' },
                { label: 'Tests', path: '/tests' },
                { label: 'Health Packages', path: '/packages' },
                { label: 'Patient Reports', path: '/patient-reports' },
                { label: 'Book a Test', path: '/book-test' },
                { label: 'Contact', path: '/contact' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-slate-400 transition-colors hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Location</h3>
            <address className="text-sm leading-relaxed text-slate-400 not-italic">
              {settings?.business_address || 'Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump, Perumbavoor, Kerala 683542'}
            </address>
            <div className="mt-4 space-y-2 text-sm">
              <Link to="/privacy" className="block text-slate-400 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="block text-slate-400 hover:text-white">Terms &amp; Conditions</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <Link to="/book-test" className="btn-primary w-full text-xs">
                Book a Test
              </Link>
              <Link to="/patient-reports" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/15">
                <FileSearch className="h-4 w-4" />
                Get Your Report
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          &copy; {year} United MediLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
