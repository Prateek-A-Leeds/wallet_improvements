export type MonthWisePhasingViewRecord = {
  id: number;
  financialYear: string;
  department: string;
  status: 'Approved by Retail Head' | 'In Progress';
};

type MonthWisePhasingViewDrawerProps = {
  open: boolean;
  record: MonthWisePhasingViewRecord | null;
  onClose: () => void;
};

function MonthWisePhasingViewDrawer({
  open,
  record,
  onClose,
}: MonthWisePhasingViewDrawerProps) {
  if (!open || !record) return null;

  return (
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 flex h-full w-full max-w-275 flex-col bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Department
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {record.department}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Close drawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Default Column
            </h3>
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              Column goes here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthWisePhasingViewDrawer;
