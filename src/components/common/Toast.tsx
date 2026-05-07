import AppIcon, { type AppIconName } from '@/components/common/AppIcon';

type ToastVariant = 'success' | 'error' | 'info';

type ToastProps = {
  open: boolean;
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
};

const toneClasses: Record<ToastVariant, string> = {
  success:
    'border-emerald-200/70 bg-emerald-50/95 text-emerald-950 dark:border-emerald-500/20 dark:bg-emerald-950/70 dark:text-emerald-100',
  error:
    'border-rose-200/70 bg-rose-50/95 text-rose-950 dark:border-rose-500/20 dark:bg-rose-950/70 dark:text-rose-100',
  info: 'border-slate-200/70 bg-white/95 text-slate-950 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100',
};

const iconMap: Record<ToastVariant, AppIconName> = {
  success: 'spark',
  error: 'close',
  info: 'history',
};

function Toast({
  open,
  message,
  variant = 'info',
  onClose,
}: ToastProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-[1.4rem] border px-4 py-3 shadow-[0_18px_50px_-20px_rgba(15,23,42,0.4)] backdrop-blur ${toneClasses[variant]}`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/10 bg-current/5">
          <AppIcon name={iconMap[variant]} className="h-4 w-4" />
        </div>

        <p className="min-w-0 flex-1 text-sm font-medium">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-current/70 hover:bg-current/10 hover:text-current"
          aria-label="Dismiss message"
        >
          <AppIcon name="close" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
