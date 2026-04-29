import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    message: '',
    type: 'success',
    open: false,
  });

  const showSnackbar = (message: string) => {
    setSnackbar({ message, type: 'success', open: true });

    setTimeout(() => {
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

      // 🔁 mock API
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
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100 px-4 dark:from-slate-950 dark:to-slate-900">
      {/* Background glow (different from login) */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo} className="h-12 w-12 object-contain" />
          <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Forgot Password
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enter your email to receive reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm text-slate-700 dark:text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {/* Back to login */}
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to login
          </Link>
        </p>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div className="fixed left-1/2 top-10 z-9999 -translate-x-1/2">
          <div
            className={`rounded-xl px-4 py-3 text-sm text-white shadow-lg ${
              snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {snackbar.message}
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
