import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '@/data/users';
import { getWithExpiry, setWithExpiry } from '@/utils/auth';

type SnackbarType = 'success' | 'error';

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: SnackbarType;
    open: boolean;
  }>({
    message: '',
    type: 'success',
    open: false,
  });

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getWithExpiry('token');
    const user = getWithExpiry('user', true);

    if (!token || !user) {
      setCheckingAuth(false);
      return;
    }

    // simulate API validation
    setAutoLogin(true);

    setTimeout(() => {
      showSnackbar(`Welcome back ${user.username}`, 'success');

      setTimeout(() => {
        navigate('/home');
      }, 500);
    }, 2000);
  }, [navigate]);

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ message, type, open: true });

    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!form.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      let message = '';
      if (!form.username && !form.password) {
        message = 'Username and password are required';
      } else if (!form.username) {
        message = 'Username is required';
      } else if (!form.password) {
        message = 'Password is required';
      } else if (
        mockUsers.some(
          (u) => u.username === form.username && u.password === form.password,
        )
      ) {
        message = 'Invalid credentials';
      }
      showSnackbar(message, 'error');
      return;
    }

    try {
      setLoading(true);

      // 🔁 simulate API
      await new Promise((resolve) => setTimeout(resolve, 800));

      const user = mockUsers.find(
        (u) => u.username === form.username && u.password === form.password,
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      setWithExpiry('token', 'mock_token_123', 10 * 60 * 1000); // 10 minutes
      setWithExpiry(
        'user',
        JSON.stringify({
          username: user.username,
          role: user.role,
          name: user.name,
          mobile: user.mobile,
        }),
        10 * 60 * 1000,
      );

      showSnackbar(`Welcome ${user.username}`, 'success');

      setTimeout(() => {
        navigate('/home');
      }, 800);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showSnackbar(err.message || 'Login failed', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth && autoLogin) {
    return (
      <div className="relative flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Checking session...
          </p>
        </div>

        {snackbar.open && (
          <div className="fixed left-1/2 bottom-15 z-9999 -translate-x-1/2">
            <div
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white shadow-lg ${
                snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              <span>{snackbar.message}</span>

              <button
                onClick={() =>
                  setSnackbar((prev) => ({ ...prev, open: false }))
                }
                className="ml-2 text-xs opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 dark:bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        {/* Logo + Title */}
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo} alt="logo" className="h-12 w-12 object-contain" />
          <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Parijat Wallet
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} method="POST" className="space-y-5">
          {/* Username */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
                        placeholder:text-slate-400 dark:placeholder:text-slate-500
                        ${
                          errors.username
                            ? 'border-red-500'
                            : 'border-slate-300 dark:border-slate-700'
                        }
                        dark:bg-slate-800 dark:text-white
                        `}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full rounded-xl border px-4 py-2.5 pr-10 text-sm outline-none transition
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    ${
                      errors.password
                        ? 'border-red-500'
                        : 'border-slate-300 dark:border-slate-700'
                    }
                    dark:bg-slate-800 dark:text-white
                `}
                placeholder="Enter your password"
              />

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              >
                {showPassword ? (
                  // 👁️ Hide icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-10-7a13.16 13.16 0 012.165-3.245M6.18 6.18A9.956 9.956 0 0112 5c5 0 9 4 10 7a13.17 13.17 0 01-4.293 4.568M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3"
                    />
                  </svg>
                ) : (
                  // 👁️ Show icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c-1 3-5 7-9 7s-8-4-9-7c1-3 5-7 9-7s8 4 9 7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Button with loader */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          © 2026 Parijat Industries
        </p>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div className="fixed left-1/2 bottom-15 z-9999 -translate-x-1/2">
          <div
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white shadow-lg ${
              snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            <span>{snackbar.message}</span>

            <button
              onClick={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              className="ml-2 text-xs opacity-80 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
