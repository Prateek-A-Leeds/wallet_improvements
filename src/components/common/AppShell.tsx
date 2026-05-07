import type { HTMLAttributes, ReactNode } from 'react';

type WrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function PageSection({ children, className, ...props }: WrapperProps) {
  return (
    <section
      className={mergeClasses('px-4 py-6 sm:px-6 sm:py-8 lg:px-8', className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function Panel({ children, className, ...props }: WrapperProps) {
  return (
    <div
      className={mergeClasses(
        'app-surface-strong overflow-hidden rounded-[2rem] ring-1 ring-slate-200/70 dark:ring-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PanelInset({ children, className, ...props }: WrapperProps) {
  return (
    <div
      className={mergeClasses(
        'rounded-[1.5rem] border border-slate-200/85 bg-white/92 shadow-[0_14px_35px_-26px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/8 dark:bg-slate-950/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <div className="app-tag mb-4">
            <span className="app-kicker-dot" />
            <span>{eyebrow}</span>
          </div>
        ) : null}

        <h1 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl dark:text-slate-50">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 max-w-[65ch] text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}

export function MetricPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-full border border-slate-200/70 bg-white/80 px-4 py-3 text-left dark:border-slate-800 dark:bg-slate-950/60">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  );
}
