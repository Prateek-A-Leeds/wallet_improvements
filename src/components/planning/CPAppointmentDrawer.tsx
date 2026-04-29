/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';

type TerritoryRow = {
  id: number;
  territoryName: string;
  region: string;
  zone: string;
  division: string;
};

type PhasingStatus = 'Approved by Retail Head' | 'Not Started';

export type CPAppointmentRecord = {
  id: number;
  financialYear: string;
  department: string;
  status: PhasingStatus;
  territories: TerritoryRow[];
};

type CPAppointmentDrawerProps = {
  open: boolean;
  record: CPAppointmentRecord | null;
  onClose: () => void;
  module: 'CP Wise Budgeting' | 'CP Appointment';
};

const pageSizeOptions = [10, 25, 50, 100] as const;

function CPAppointmentDrawer({
  open,
  record,
  onClose,
  module,
}: CPAppointmentDrawerProps) {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [pageSize, setPageSize] =
    useState<(typeof pageSizeOptions)[number]>(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (open) {
      setSearch('');
      setRegionFilter('');
      setZoneFilter('');
      setDivisionFilter('');
      setPageSize(10);
      setCurrentPage(1);
    }
  }, [open, record]);

  const rows = record?.territories ?? [];

  const regionOptions = useMemo(
    () => [...new Set(rows.map((row) => row.region))].sort(),
    [rows],
  );

  const zoneOptions = useMemo(
    () => [...new Set(rows.map((row) => row.zone))].sort(),
    [rows],
  );

  const divisionOptions = useMemo(
    () => [...new Set(rows.map((row) => row.division))].sort(),
    [rows],
  );

  const filteredRows = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !searchTerm ||
        String(row.id).includes(searchTerm) ||
        row.territoryName.toLowerCase().includes(searchTerm);

      const matchesRegion = !regionFilter || row.region === regionFilter;
      const matchesZone = !zoneFilter || row.zone === zoneFilter;
      const matchesDivision =
        !divisionFilter || row.division === divisionFilter;

      return matchesSearch && matchesRegion && matchesZone && matchesDivision;
    });
  }, [rows, search, regionFilter, zoneFilter, divisionFilter]);

  const totalRows = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const startRow = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  if (!open || !record) return null;

  return (
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 flex h-full w-full max-w-275 flex-col bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {module === 'CP Wise Budgeting'
                ? 'Annual CP Budget'
                : `Create Annual Budget ${record.financialYear}`}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Territory
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
          <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px_220px]">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by sr. no. or territory name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Region
              </label>
              <select
                value={regionFilter}
                onChange={(e) => {
                  setRegionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">All regions</option>
                {regionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Zone
              </label>
              <select
                value={zoneFilter}
                onChange={(e) => {
                  setZoneFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">All zones</option>
                {zoneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Division
              </label>
              <select
                value={divisionFilter}
                onChange={(e) => {
                  setDivisionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">All divisions</option>
                {divisionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                <thead className="bg-amber-400/90 dark:bg-amber-500/80">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                      Sr. No.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                      Territory Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                      Region
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                      Zone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                      Division
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                  {paginatedRows.length > 0 ? (
                    paginatedRows.map((row) => (
                      <tr
                        key={row.id}
                        className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                          {row.id}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                          {row.territoryName}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                          {row.region}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                          {row.zone}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                          {row.division}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                      >
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Showing <span className="font-semibold">{startRow}</span> to{' '}
              <span className="font-semibold">{endRow}</span> of{' '}
              <span className="font-semibold">{totalRows}</span> entries
            </div>

            <div className="flex items-center gap-2">
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Rows
              </label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(
                    Number(e.target.value) as (typeof pageSizeOptions)[number],
                  );
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                First
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {'<'}
              </button>

              <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {totalRows === 0 ? 0 : currentPage}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages || totalRows === 0}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {'>'}
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalRows === 0}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CPAppointmentDrawer;
