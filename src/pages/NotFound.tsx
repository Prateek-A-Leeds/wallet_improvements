import { Link } from 'react-router-dom';
import Container from '@/components/common/Container';

function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-10px)] items-center py-10">
      <Container>
        <div className="mx-auto max-w-3xl rounded-4xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-slate-700 dark:text-slate-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 9.172a4 4 0 1 1 5.656 5.656M15 15l4.5 4.5M4.5 19.5l5.25-5.25"
                />
              </svg>
            </div>

            <div className="mb-3 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 dark:bg-red-950/40 dark:text-red-400">
              Error 404
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
              Page not found
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 md:text-base">
              The page you are looking for does not exist, may have been moved,
              or the link may be incorrect.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/home"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Go Back
              </button>
            </div>

            <div className="mt-10 w-full rounded-3xl bg-slate-50 p-5 text-left dark:bg-slate-950">
              <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                You can try:
              </p>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p>• Returning to the dashboard</p>
                <p>• Back to the previous page</p>
                <p>• Checking the URL for mistakes</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NotFound;
