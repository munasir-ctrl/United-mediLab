import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { SEO } from '@/components/SEO';
import { Logo } from '@/components/Logo';

export function AdminLoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError('');

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  }

  return (
    <>
      <SEO title="Admin Login" noindex />
      <div className="flex min-h-screen flex-col bg-navy-950">
        <div className="flex flex-1 items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="rounded-2xl bg-white p-8 shadow-float">
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="mb-4">
                  <Logo />
                </div>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Lock className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold text-navy-900">Admin Login</h1>
                <p className="mt-1 text-sm text-slate-500">Sign in to access the admin dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label-base">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-base pl-12"
                      placeholder="admin@unitedmedilab.com"
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div>
                  <label className="label-base">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-base pl-12"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-error-50 p-3 text-sm text-error-700">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-700">
                  <ArrowLeft className="h-4 w-4" />
                  Back to website
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
