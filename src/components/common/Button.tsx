import type { ButtonHTMLAttributes, ReactNode } from 'react';
import AppIcon, { type AppIconName } from '@/components/common/AppIcon';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: AppIconName;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-teal-700 text-white shadow-[0_18px_45px_-24px_rgba(15,118,110,0.8)] hover:bg-teal-600',
  secondary:
    'border-slate-200/80 bg-white/80 text-slate-900 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-900',
  ghost:
    'border-transparent bg-transparent text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-900/70',
};

function Button({
  children,
  className = '',
  variant = 'primary',
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition active:scale-[0.98] ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition group-hover:translate-x-0.5 group-hover:-translate-y-px dark:bg-white/10">
          <AppIcon name={icon} className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </button>
  );
}

export default Button;
