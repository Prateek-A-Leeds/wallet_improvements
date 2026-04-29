import { useMemo, useState } from 'react';
import Container from '@/components/common/Container';

type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Rejected';

type TicketItem = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  moduleLeaf: string;
  modulePath: string;
  attachmentName: string;
  attachmentUrl: string;
  createdDate: string;
  status: TicketStatus;
};

const moduleOptions = [
  { leaf: 'Raise Ticket', path: 'Tickets > Raise Ticket' },
  { leaf: 'Ticket History', path: 'Tickets > Ticket History' },
  { leaf: 'Monthly Report', path: 'Tickets > Reports > Monthly Report' },
  { leaf: 'Performance', path: 'Tickets > Reports > Performance' },
  { leaf: 'Leads', path: 'Sales > Leads' },
  { leaf: 'Opportunities', path: 'Sales > Opportunities' },
  { leaf: 'Products', path: 'Inventory > Products' },
  { leaf: 'Stock', path: 'Inventory > Stock' },
  { leaf: 'Supplier List', path: 'Inventory > Suppliers > Supplier List' },
  { leaf: 'Apply Leave', path: 'HRMS > Leave > Apply Leave' },
];

const dummyTickets: TicketItem[] = [
  {
    id: 1001,
    name: 'Prateek',
    mobile: '8285123451',
    email: 'prateek.a@hubhopper.in',
    moduleLeaf: 'Monthly Report',
    modulePath: 'Tickets > Reports > Monthly Report',
    attachmentName: 'sales-report-april.pdf',
    attachmentUrl: 'https://example.com/files/sales-report-april.pdf',
    createdDate: '2026-04-08T09:20:00',
    status: 'Open',
  },
  {
    id: 1002,
    name: 'Ankit',
    mobile: '9810011122',
    email: 'ankit@example.com',
    moduleLeaf: 'Products',
    modulePath: 'Inventory > Products',
    attachmentName: 'product-image-01.png',
    attachmentUrl: 'https://example.com/files/product-image-01.png',
    createdDate: '2026-04-07T16:40:00',
    status: 'In Progress',
  },
  {
    id: 1003,
    name: 'Riya',
    mobile: '9876543210',
    email: 'riya@example.com',
    moduleLeaf: 'Leads',
    modulePath: 'Sales > Leads',
    attachmentName: 'lead-list.pdf',
    attachmentUrl: 'https://example.com/files/lead-list.pdf',
    createdDate: '2026-04-06T11:15:00',
    status: 'Resolved',
  },
  {
    id: 1004,
    name: 'Saurabh',
    mobile: '9123412345',
    email: 'saurabh@example.com',
    moduleLeaf: 'Apply Leave',
    modulePath: 'HRMS > Leave > Apply Leave',
    attachmentName: 'leave-doc.pdf',
    attachmentUrl: 'https://example.com/files/leave-doc.pdf',
    createdDate: '2026-04-05T10:00:00',
    status: 'Rejected',
  },
  {
    id: 1005,
    name: 'Neha',
    mobile: '9988776655',
    email: 'neha@example.com',
    moduleLeaf: 'Ticket History',
    modulePath: 'Tickets > Ticket History',
    attachmentName: 'history-export.pdf',
    attachmentUrl: 'https://example.com/files/history-export.pdf',
    createdDate: '2026-04-04T14:10:00',
    status: 'Open',
  },
  {
    id: 1006,
    name: 'Manish',
    mobile: '9012345678',
    email: 'manish@example.com',
    moduleLeaf: 'Opportunities',
    modulePath: 'Sales > Opportunities',
    attachmentName: 'opportunity-sheet.pdf',
    attachmentUrl: 'https://example.com/files/opportunity-sheet.pdf',
    createdDate: '2026-04-03T09:30:00',
    status: 'In Progress',
  },
  {
    id: 1007,
    name: 'Priya',
    mobile: '9898989898',
    email: 'priya@example.com',
    moduleLeaf: 'Supplier List',
    modulePath: 'Inventory > Suppliers > Supplier List',
    attachmentName: 'supplier-list.pdf',
    attachmentUrl: 'https://example.com/files/supplier-list.pdf',
    createdDate: '2026-04-02T13:55:00',
    status: 'Resolved',
  },
  {
    id: 1008,
    name: 'Vikas',
    mobile: '9345612780',
    email: 'vikas@example.com',
    moduleLeaf: 'Performance',
    modulePath: 'Tickets > Reports > Performance',
    attachmentName: 'performance-chart.png',
    attachmentUrl: 'https://example.com/files/performance-chart.png',
    createdDate: '2026-04-01T17:05:00',
    status: 'Rejected',
  },
  {
    id: 1009,
    name: 'Aman',
    mobile: '9765432109',
    email: 'aman@example.com',
    moduleLeaf: 'Raise Ticket',
    modulePath: 'Tickets > Raise Ticket',
    attachmentName: 'issue-screenshot.png',
    attachmentUrl: 'https://example.com/files/issue-screenshot.png',
    createdDate: '2026-03-31T15:25:00',
    status: 'Open',
  },
  {
    id: 1010,
    name: 'Simran',
    mobile: '9871200456',
    email: 'simran@example.com',
    moduleLeaf: 'Stock',
    modulePath: 'Inventory > Stock',
    attachmentName: 'stock-sheet.pdf',
    attachmentUrl: 'https://example.com/files/stock-sheet.pdf',
    createdDate: '2026-03-30T12:20:00',
    status: 'In Progress',
  },
  {
    id: 1011,
    name: 'Karan',
    mobile: '9011199911',
    email: 'karan@example.com',
    moduleLeaf: 'Monthly Report',
    modulePath: 'Tickets > Reports > Monthly Report',
    attachmentName: 'ticket-metrics.pdf',
    attachmentUrl: 'https://example.com/files/ticket-metrics.pdf',
    createdDate: '2026-03-29T08:45:00',
    status: 'Resolved',
  },
  {
    id: 1012,
    name: 'Isha',
    mobile: '8899776655',
    email: 'isha@example.com',
    moduleLeaf: 'Products',
    modulePath: 'Inventory > Products',
    attachmentName: 'catalog-image.webp',
    attachmentUrl: 'https://example.com/files/catalog-image.webp',
    createdDate: '2026-03-28T10:10:00',
    status: 'Rejected',
  },
];

const pageSizeOptions = [10, 25, 50, 100] as const;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB');
}

function getStatusClasses(status: TicketStatus) {
  switch (status) {
    case 'Open':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300';
    case 'In Progress':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300';
    case 'Resolved':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';
    case 'Rejected':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  }
}

function TicketHistory() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [dateSort, setDateSort] = useState<'latest' | 'oldest'>('latest');
  const [pageSize, setPageSize] =
    useState<(typeof pageSizeOptions)[number]>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTickets = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    const result = dummyTickets
      .filter((ticket) => {
        const matchesSearch =
          !searchTerm ||
          String(ticket.id).includes(searchTerm) ||
          ticket.name.toLowerCase().includes(searchTerm) ||
          ticket.email.toLowerCase().includes(searchTerm) ||
          ticket.mobile.toLowerCase().includes(searchTerm);

        const matchesModule =
          !moduleFilter || ticket.moduleLeaf === moduleFilter;

        const matchesStatus = !statusFilter || ticket.status === statusFilter;

        return matchesSearch && matchesModule && matchesStatus;
      })
      .sort((a, b) => {
        const aTime = new Date(a.createdDate).getTime();
        const bTime = new Date(b.createdDate).getTime();
        return dateSort === 'latest' ? bTime - aTime : aTime - bTime;
      });

    return result;
  }, [search, moduleFilter, statusFilter, dateSort]);

  const totalRows = filteredTickets.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredTickets.slice(start, end);
  }, [filteredTickets, currentPage, pageSize]);

  const startRow = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleModuleFilterChange = (value: string) => {
    setModuleFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: 'latest' | 'oldest') => {
    setDateSort(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value as (typeof pageSizeOptions)[number]);
    setCurrentPage(1);
  };

  return (
    <section className="py-10">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          <div className="shadow-lg shadow-slate-700/5 dark:shadow-slate-300/5 px-6 py-5">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Ticket History
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              View, search, and track submitted tickets.
            </p>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_220px_180px_180px]">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Search
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search by ID, name, email, or mobile"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Module
                </label>
                <select
                  value={moduleFilter}
                  onChange={(e) => handleModuleFilterChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="">All modules</option>
                  {moduleOptions.map((module) => (
                    <option key={module.path} value={module.leaf}>
                      {module.leaf}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Sort by date
                </label>
                <select
                  value={dateSort}
                  onChange={(e) =>
                    handleSortChange(e.target.value as 'latest' | 'oldest')
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="latest">Latest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilterChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="">All status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                  <thead className="bg-slate-50 dark:bg-slate-950">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        Mobile
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        Module
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        Attachment
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        Created Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                    {paginatedTickets.length > 0 ? (
                      paginatedTickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                            {ticket.id}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                            {ticket.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                            {ticket.mobile}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                            {ticket.email}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                            <span
                              title={ticket.modulePath}
                              className="cursor-default"
                            >
                              {ticket.moduleLeaf}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <a
                              href={ticket.attachmentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                              {ticket.attachmentName}
                            </a>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                            {formatDate(ticket.createdDate)}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                ticket.status,
                              )}`}
                            >
                              {ticket.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                        >
                          No tickets found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span>
                    Showing{' '}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {startRow}
                    </span>{' '}
                    to{' '}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {endRow}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {totalRows}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span> | Page</span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {totalPages === 0 ? 0 : currentPage}
                  </span>
                  <span>of {totalPages}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Rows
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) =>
                      handlePageSizeChange(Number(e.target.value))
                    }
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Previous
                </button>

                <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {currentPage}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages || totalRows === 0}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TicketHistory;
