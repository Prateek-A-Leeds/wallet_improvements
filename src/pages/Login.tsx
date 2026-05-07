import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import AppIcon from '@/components/common/AppIcon';
import Button from '@/components/common/Button';
import {
  MetricPill,
  Panel,
  PanelInset,
} from '@/components/common/AppShell';
import Toast from '@/components/common/Toast';
import { mockUsers } from '@/data/users';
import { getWithExpiry, setWithExpiry } from '@/utils/auth';

type SnackbarType = 'success' | 'error';

type LocationState = {
  snackbar?: {
    message: string;
    type: SnackbarType;
  };
};

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

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const locationState = location.state as LocationState | null;

    if (locationState?.snackbar) {
      showSnackbar(locationState.snackbar.message, locationState.snackbar.type);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const token = getWithExpiry('token');
    const user = getWithExpiry('user', true);

    if (!token || !user) {
      setCheckingAuth(false);
      return;
    }

    setAutoLogin(true);

    window.setTimeout(() => {
      showSnackbar(`Welcome back ${user.username}`, 'success');

      window.setTimeout(() => {
        navigate('/home');
      }, 500);
    }, 2000);
  }, [navigate]);

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ message, type, open: true });

    window.setTimeout(() => {
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

      await new Promise((resolve) => setTimeout(resolve, 800));

      const user = mockUsers.find(
        (u) => u.username === form.username && u.password === form.password,
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      setWithExpiry('token', 'mock_token_123', 10 * 60 * 1000);
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

      window.setTimeout(() => {
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
      <div className="app-shell flex min-h-[100dvh] items-center justify-center px-4 py-8">
        <Panel className="w-full max-w-md p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-slate-200/70 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80">
            <img src={logo} alt="Parijat logo" className="h-9 w-9 object-contain" />
          </div>
          <div className="mt-6 flex justify-center">
            <div className="h-12 w-12 rounded-full border-2 border-teal-600/20 border-t-teal-600 animate-spin" />
          </div>
          <p className="mt-5 text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-slate-50">
            Restoring your workspace
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Checking your existing session before we open the dashboard.
          </p>
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

  return (
    <div className="app-shell flex min-h-[100dvh] items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1240px] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="hidden overflow-hidden lg:block">
          <div className="grid h-full min-h-[720px] grid-rows-[auto_1fr] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-slate-200/70 bg-white/85 dark:border-slate-700 dark:bg-slate-900/80">
                <img src={logo} alt="Parijat logo" className="h-9 w-9 object-contain" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Retail wallet
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50">
                  A central workspace for planning, budgeting, and retail operations.
                </h1>
              </div>
            </div>

            <div className="grid content-between gap-8 pt-10">
              <div className="max-w-xl">
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Parijat Wallet brings planning modules, budgeting views,
                  appointment records, and operational tracking into one place so
                  teams can move between related workflows from a single system.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <MetricPill label="Planning" value="Phasing and budgeting" />
                <MetricPill label="Records" value="Appointments and views" />
                <MetricPill label="Access" value="Role-based modules" />
              </div>

              <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <PanelInset className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Project highlights
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <li>Retail planning flows are grouped into one connected workspace.</li>
                    <li>Teams can open budget, phasing, and appointment screens from the same navigation model.</li>
                    <li>Role-based access keeps each user focused on the modules relevant to their work.</li>
                  </ul>
                </PanelInset>

                <PanelInset className="flex flex-col justify-between p-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Access
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Sign in with your assigned credentials to enter the workspace and access the modules available for your role.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-teal-700 dark:text-teal-200">
                    <AppIcon name="spark" className="h-4 w-4" />
                    <span>Parijat Industries retail workspace</span>
                  </div>
                </PanelInset>
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="p-4 sm:p-6">
          <PanelInset className="p-6 sm:p-8">
            <div className="mb-8 flex flex-col items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-slate-200/70 bg-white/85 dark:border-slate-700 dark:bg-slate-900/80">
                <img src={logo} alt="Parijat logo" className="h-9 w-9 object-contain" />
              </div>
              <div className="mt-5 app-tag">
                <span className="app-kicker-dot" />
                <span>Secure sign in</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50">
                Welcome back
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
                Use your username and password to open the wallet workspace.
                Session feedback and validation stay inline so you always know
                what changed.
              </p>
            </div>

            <form onSubmit={handleSubmit} method="POST" className="space-y-5">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={`w-full rounded-[1.15rem] border bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] outline-none placeholder:text-slate-400 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 ${
                    errors.username
                      ? 'border-rose-400'
                      : 'border-slate-200/80 dark:border-slate-700'
                  }`}
                  placeholder="Enter your username"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This matches the username in your assigned wallet account.
                </p>
                {errors.username ? (
                  <p className="text-xs text-rose-500">{errors.username}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-teal-700 hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200"
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
                    className={`w-full rounded-[1.15rem] border bg-white/90 px-4 py-3 pr-12 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] outline-none placeholder:text-slate-400 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 ${
                      errors.password
                        ? 'border-rose-400'
                        : 'border-slate-200/80 dark:border-slate-700'
                    }`}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <AppIcon
                      name={showPassword ? 'eye-off' : 'eye'}
                      className="h-4 w-4"
                    />
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Password visibility is local to this device only.
                </p>
                {errors.password ? (
                  <p className="text-xs text-rose-500">{errors.password}</p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center py-3"
                icon="arrow-right"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              © 2026 Parijat Industries
            </p>
          </PanelInset>
        </Panel>
      </div>

      <Toast
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}

export default Login;
