import { useEffect, useMemo, useState } from 'react';
import Container from '@/components/common/Container';
import CPAppointmentDrawer, {
  type CPAppointmentRecord,
} from '@/components/planning/CPAppointmentDrawer';

type PhasingViewStatus = 'Approved by Retail Head' | 'Not Started';

const pageSizeOptions = [10, 25, 50, 100] as const;

const dummyRows: CPAppointmentRecord[] = [
  {
    id: 1,
    financialYear: 'FY 2021-22',
    department: 'Retail',
    status: 'Approved by Retail Head',
    territories: [],
  },
  {
    id: 2,
    financialYear: 'FY 2022-23',
    department: 'Retail',
    status: 'Approved by Retail Head',
    territories: [],
  },
  {
    id: 3,
    financialYear: 'FY 2023-24',
    department: 'Retail',
    status: 'Approved by Retail Head',
    territories: [],
  },
  {
    id: 4,
    financialYear: 'FY 2024-25',
    department: 'Retail',
    status: 'Approved by Retail Head',
    territories: [],
  },
  {
    id: 5,
    financialYear: 'FY 2025-26',
    department: 'Retail',
    status: 'Not Started',
    territories: [
      {
        id: 1,
        territoryName: 'Delhi NCR',
        region: 'North',
        zone: 'Zone A',
        division: 'Division 1',
      },
      {
        id: 2,
        territoryName: 'Gurgaon',
        region: 'North',
        zone: 'Zone A',
        division: 'Division 1',
      },
      {
        id: 3,
        territoryName: 'Noida',
        region: 'North',
        zone: 'Zone A',
        division: 'Division 2',
      },
      {
        id: 4,
        territoryName: 'Jaipur',
        region: 'North',
        zone: 'Zone B',
        division: 'Division 3',
      },
      {
        id: 5,
        territoryName: 'Lucknow',
        region: 'North',
        zone: 'Zone B',
        division: 'Division 3',
      },
      {
        id: 6,
        territoryName: 'Chandigarh',
        region: 'North',
        zone: 'Zone C',
        division: 'Division 4',
      },
      {
        id: 7,
        territoryName: 'Indore',
        region: 'Central',
        zone: 'Zone D',
        division: 'Division 5',
      },
      {
        id: 8,
        territoryName: 'Bhopal',
        region: 'Central',
        zone: 'Zone D',
        division: 'Division 5',
      },
      {
        id: 9,
        territoryName: 'Nagpur',
        region: 'Central',
        zone: 'Zone E',
        division: 'Division 6',
      },
      {
        id: 10,
        territoryName: 'Pune',
        region: 'West',
        zone: 'Zone F',
        division: 'Division 7',
      },
      {
        id: 11,
        territoryName: 'Mumbai',
        region: 'West',
        zone: 'Zone F',
        division: 'Division 7',
      },
      {
        id: 12,
        territoryName: 'Ahmedabad',
        region: 'West',
        zone: 'Zone G',
        division: 'Division 8',
      },
    ],
  },
  {
    id: 6,
    financialYear: 'FY 2026-27',
    department: 'Retail',
    status: 'Not Started',
    territories: [
      {
        id: 1,
        territoryName: 'Hyderabad',
        region: 'South',
        zone: 'Zone H',
        division: 'Division 9',
      },
      {
        id: 2,
        territoryName: 'Bengaluru',
        region: 'South',
        zone: 'Zone H',
        division: 'Division 9',
      },
      {
        id: 3,
        territoryName: 'Chennai',
        region: 'South',
        zone: 'Zone I',
        division: 'Division 10',
      },
      {
        id: 4,
        territoryName: 'Kochi',
        region: 'South',
        zone: 'Zone I',
        division: 'Division 10',
      },
    ],
  },
];

function getStatusClasses(status: PhasingViewStatus) {
  switch (status) {
    case 'Approved by Retail Head':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';
    case 'Not Started':
      return 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  }
}

function CPWiseBudgeting() {
  const [selectedRow, setSelectedRow] = useState<CPAppointmentRecord | null>(
    null,
  );

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
      <section className="py-10">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                CP Wise Budgeting
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                View CP wise budget records by financial year, department, and
                status.
              </p>
            </div>

            <div className="px-6 py-5">
              <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px_160px]">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Search
                  </label>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by sr. no. or financial year"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Department
                  </label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setDepartmentFilter('');
                      setStatusFilter('');
                      setPageSize(10);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="max-h-[calc(100vh-320px)] overflow-y-auto overflow-x-auto scroll-smooth [scrollbar-width:none]">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="sticky top-0 z-10 bg-amber-400 dark:bg-amber-500">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Sr. No.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Financial Year
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Department
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Action
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
                                    : 'cursor-pointer text-teal-600 hover:text-teal-700 hover:underline dark:text-teal-400 dark:hover:text-teal-300'
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
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
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
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
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
        </Container>
      </section>

      <CPAppointmentDrawer
        open={Boolean(selectedRow)}
        record={selectedRow}
        onClose={() => setSelectedRow(null)}
        module="CP Wise Budgeting"
      />
    </>
  );
}

export default CPWiseBudgeting;
