import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import Button from '@/components/common/Button';
import { Panel, PanelInset } from '@/components/common/AppShell';
import Toast from '@/components/common/Toast';

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    open: false,
  });

  const showSnackbar = (message: string) => {
    setSnackbar({ message, type: 'success', open: true });

    window.setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
      navigate('/');
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setSnackbar({
        message: 'Email is required',
        type: 'error',
        open: true,
      });
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showSnackbar('Reset link sent successfully');
    } catch {
      setSnackbar({
        message: 'Something went wrong',
        type: 'error',
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <Panel className="w-full max-w-md p-4 sm:p-6">
        <PanelInset className="p-6 sm:p-8">
          <div className="mb-6 flex flex-col items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-slate-200/70 bg-white/85 dark:border-slate-700 dark:bg-slate-900/80">
              <img
                src={logo}
                alt="Parijat logo"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="mt-5 app-tag">
              <span className="app-kicker-dot" />
              <span>Account recovery</span>
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Enter your email address and we will send a reset link back to
              your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-[1.15rem] border border-slate-200/80 bg-white/90 px-4 py-3 text-sm outline-none placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full justify-center py-3"
              icon="arrow-right"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <Link
              to="/"
              className="font-semibold text-teal-700 hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200"
            >
              Back to login
            </Link>
          </p>
        </PanelInset>
      </Panel>

      <Toast
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}

export default ForgotPassword;
