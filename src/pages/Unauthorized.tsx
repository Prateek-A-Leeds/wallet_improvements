import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mb-6 text-6xl">🚫</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          403 - Unauthorized
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          You do not have permission to access this page.
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/home"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Go to Home
          </Link>

          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
