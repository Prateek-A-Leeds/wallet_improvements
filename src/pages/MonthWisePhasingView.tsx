import { useEffect, useMemo, useState } from 'react';
import AppIcon from '@/components/common/AppIcon';
import Button from '@/components/common/Button';
import {
  PageSection,
  Panel,
  PanelInset,
  SectionHeading,
} from '@/components/common/AppShell';
import Container from '@/components/common/Container';
import MonthWisePhasingViewDrawer, {
  type MonthWisePhasingViewRecord,
} from '@/components/planning/MonthWisePhasingViewDrawer';

type PhasingViewStatus = 'Approved by Retail Head' | 'In Progress';

const pageSizeOptions = [10, 25, 50, 100] as const;

const dummyRows: MonthWisePhasingViewRecord[] = [
  {
    id: 9,
    financialYear: 'FY 2026-27',
    department: 'Retail',
    status: 'In Progress',
  },
  {
    id: 10,
    financialYear: 'FY 2025-26',
    department: 'Retail',
    status: 'In Progress',
  },
  {
    id: 11,
    financialYear: 'FY 2024-25',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 12,
    financialYear: 'FY 2023-24',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 13,
    financialYear: 'FY 2022-23',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 14,
    financialYear: 'FY 2021-22',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 15,
    financialYear: 'FY 2020-21',
    department: 'Finance',
    status: 'In Progress',
  },
  {
    id: 16,
    financialYear: 'FY 2019-20',
    department: 'Marketing',
    status: 'Approved by Retail Head',
  },
  {
    id: 1,
    financialYear: 'FY 2026-27',
    department: 'Retail',
    status: 'In Progress',
  },
  {
    id: 2,
    financialYear: 'FY 2025-26',
    department: 'Retail',
    status: 'In Progress',
  },
  {
    id: 3,
    financialYear: 'FY 2024-25',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 4,
    financialYear: 'FY 2023-24',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 5,
    financialYear: 'FY 2022-23',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 6,
    financialYear: 'FY 2021-22',
    department: 'Retail',
    status: 'Approved by Retail Head',
  },
  {
    id: 7,
    financialYear: 'FY 2020-21',
    department: 'Finance',
    status: 'In Progress',
  },
  {
    id: 8,
    financialYear: 'FY 2019-20',
    department: 'Marketing',
    status: 'Approved by Retail Head',
  },
];

function getStatusClasses(status: PhasingViewStatus) {
  switch (status) {
    case 'Approved by Retail Head':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';
    case 'In Progress':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  }
}

function MonthWisePhasingView() {
  const [selectedRow, setSelectedRow] =
    useState<MonthWisePhasingViewRecord | null>(null);

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pageSize, setPageSize] =
    useState<(typeof pageSizeOptions)[number]>(10);
  const [currentPage, setCurrentPage] = useState(1);

  const rows = useMemo(
    () =>
      dummyRows.map((row, index) => ({
        ...row,
        serialNumber: index + 1,
      })),
    [],
  );

  const departmentOptions = useMemo(
    () => [...new Set(rows.map((row) => row.department))].sort(),
    [rows],
  );

  const statusOptions = useMemo(
    () => [...new Set(rows.map((row) => row.status))].sort(),
    [rows],
  );

  const filteredRows = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !searchTerm ||
        String(row.serialNumber).includes(searchTerm) ||
        row.financialYear.toLowerCase().includes(searchTerm);

      const matchesDepartment =
        !departmentFilter || row.department === departmentFilter;

      const matchesStatus = !statusFilter || row.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [rows, search, departmentFilter, statusFilter]);

  const totalRows = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const startRow = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentFilter, statusFilter, pageSize]);

  return (
    <>
      <PageSection className="pb-8 pt-2">
        <Container>
          <Panel className="p-5 sm:p-7">
            <SectionHeading
              eyebrow="Planning records"
              title="Month Wise Phasing View"
              description="Review phasing records with filters for financial year, department, and approval status."
            />

            <div className="mt-6 space-y-5">
              <PanelInset className="p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px_170px]">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Search
                  </label>
                  <div className="relative">
                    <AppIcon
                      name="search"
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by sr. no. or financial year"
                      className="w-full rounded-[1.15rem] border border-slate-200/80 bg-white/90 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Department
                  </label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full rounded-[1.15rem] border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
                  >
                    <option value="">All departments</option>
                    {departmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-[1.15rem] border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
                  >
                    <option value="">All status</option>
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setDepartmentFilter('');
                      setStatusFilter('');
                      setPageSize(10);
                      setCurrentPage(1);
                    }}
                    variant="secondary"
                    className="w-full justify-center py-3"
                  >
                    Reset
                  </Button>
                </div>
              </div>
              </PanelInset>

              <PanelInset className="overflow-hidden">
                <div className="max-h-[calc(100vh-320px)] overflow-y-auto overflow-x-auto scroll-smooth [scrollbar-width:none]">
                  <table className="min-w-full divide-y divide-slate-200/70 dark:divide-slate-800">
                    <thead className="sticky top-0 z-10 bg-slate-950 text-white dark:bg-slate-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">
                          Sr. No.
                        </th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">
                          Financial Year
                        </th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">
                          Department
                        </th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200/70 bg-white/85 dark:divide-slate-800 dark:bg-slate-950/30">
                      {paginatedRows.length > 0 ? (
                        paginatedRows.map((row) => (
                          <tr
                            key={row.id}
                            className="transition hover:bg-slate-50/80 dark:hover:bg-slate-900/50"
                          >
                            <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                              {row.serialNumber}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                              {row.financialYear}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                              {row.department}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                  row.status,
                                )}`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <button
                                type="button"
                                disabled={
                                  row.status === 'Approved by Retail Head'
                                }
                                onClick={() => setSelectedRow(row)}
                                className={`font-medium transition ${
                                  row.status === 'Approved by Retail Head'
                                    ? 'cursor-not-allowed text-gray-500 opacity-60 dark:text-slate-500'
                                    : 'cursor-pointer text-teal-700 hover:text-teal-600 hover:underline dark:text-teal-300 dark:hover:text-teal-200'
                                }`}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                          >
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </PanelInset>

              <div className="flex flex-col gap-3 border-t border-slate-200/70 pt-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Showing <span className="font-semibold">{startRow}</span> to{' '}
                  <span className="font-semibold">{endRow}</span> of{' '}
                  <span className="font-semibold">{totalRows}</span> entries
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Rows
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(
                        Number(
                          e.target.value,
                        ) as (typeof pageSizeOptions)[number],
                      );
                    }}
                    className="rounded-full border border-slate-200/80 bg-white/90 px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
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
                    className="rounded-full border border-slate-200/80 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    First
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-full border border-slate-200/80 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    {'<'}
                  </button>

                  <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {totalRows === 0 ? 0 : currentPage}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages || totalRows === 0}
                    className="rounded-full border border-slate-200/80 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    {'>'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages || totalRows === 0}
                    className="rounded-full border border-slate-200/80 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          </Panel>
        </Container>
      </PageSection>

      <MonthWisePhasingViewDrawer
        open={Boolean(selectedRow)}
        record={selectedRow}
        onClose={() => setSelectedRow(null)}
      />
    </>
  );
}

export default MonthWisePhasingView;
