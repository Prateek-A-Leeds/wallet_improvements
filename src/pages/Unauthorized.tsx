import { Link } from 'react-router-dom';
import AppIcon from '@/components/common/AppIcon';
import Button from '@/components/common/Button';
import { Panel, PanelInset } from '@/components/common/AppShell';

function Unauthorized() {
  return (
    <div className="app-shell flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <Panel className="w-full max-w-lg p-4 sm:p-6">
        <PanelInset className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
            <AppIcon name="close" className="h-7 w-7" />
          </div>

          <div className="mt-5 app-tag mx-auto w-max">
            <span className="app-kicker-dot" />
            <span>Access denied</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50">
            403 - Unauthorized
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
            You do not have permission to access this page. Return to the
            dashboard or sign in with an account that has the right role.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/home">
              <Button icon="arrow-right">Go to Home</Button>
            </Link>

            <Link to="/">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </PanelInset>
      </Panel>
    </div>
  );
}

export default Unauthorized;
