import type { ReactNode } from 'react';

export type UserRole = 'admin' | 'salesman' | 'support';

export type ModuleItem = {
  title: string;
  to?: string;
  description?: string;
  roles?: UserRole[];
  icon?: ReactNode;
  children?: ModuleItem[];
};

export const dashboardModules: ModuleItem[] = [
  {
    title: 'Planning',
    description: 'Manage planning and budgeting workflows.',
    roles: ['admin', 'support', 'salesman'],
    icon: <span>🗂️</span>,
    children: [
      {
        title: 'Budget',
        description: 'Budget related planning modules.',
        roles: ['admin', 'support', 'salesman'],
        children: [
          {
            title: 'Month Wise Phasing',
            to: '/month-wise-phasing',
            description: 'Create month-wise phasing plan.',
            roles: ['admin', 'salesman'],
          },
          {
            title: 'Month Wise Phasing View',
            to: '/month-wise-phasing-view',
            description: 'View month-wise phasing data.',
            roles: ['admin', 'support', 'salesman'],
          },
          {
            title: 'CP Appointment',
            to: '/cp-appointment',
            description: 'Manage CP appointments.',
            roles: ['admin', 'salesman'],
          },
          {
            title: 'CP Wise Budgeting',
            to: '/cp-wise-budgeting',
            description: 'Allocate budget per CP.',
            roles: ['admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'Performance',
    description: 'Manage performance dashboards and reports.',
    roles: ['admin'],
    icon: <span>📈</span>,
    children: [
      {
        title: 'Overview',
        roles: ['admin'],
        children: [
          {
            title: 'Dashboard',
            to: '/performance/dashboard',
            roles: ['admin'],
          },
        ],
      },
      {
        title: 'Sale Performance',
        roles: ['admin'],
        children: [
          {
            title: 'Budget Vs Achievement',
            to: '/performance/budget-vs-achievement',
            roles: ['admin'],
          },
          {
            title: 'Forecast Vs Achievement - Brand Wise',
            to: '/performance/forecast-vs-achievement-brand-wise',
            roles: ['admin'],
          },
        ],
      },
      {
        title: 'Collection Performance',
        roles: ['admin'],
        children: [
          {
            title: 'Forecast Vs Achievement',
            to: '/performance/forecast-vs-achievement',
            roles: ['admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'Forecast',
    description: 'Track leads, pipelines, and conversions.',
    roles: ['admin', 'salesman'],
    icon: <span>🔮</span>, // 👈 changed (unique + meaningful)
    children: [
      {
        title: 'Collection Forecast',
        roles: ['admin', 'salesman'],
        children: [
          {
            title: 'Create Collection Forecast',
            to: '/sales/create-collection-forecast',
            roles: ['admin', 'salesman'],
          },
        ],
      },
      {
        title: 'Reports',
        roles: ['admin'],
        children: [
          {
            title: 'Forecast Report',
            to: '/sales/reports/forecast',
            roles: ['admin', 'salesman'],
          },
          {
            title: 'Forecast Report ZM',
            to: '/sales/reports/forecast-zm',
            roles: ['admin', 'salesman'],
          },
        ],
      },
      {
        title: 'Sales Forecast',
        roles: ['admin', 'salesman'],
        children: [
          {
            title: 'Sales Forecast (TM)',
            to: '/sales/sales-forecast-tm',
            roles: ['admin', 'salesman'],
          },
          {
            title: 'Sales Forecast (RM)',
            to: '/sales/sales-forecast-rm',
            roles: ['admin', 'salesman'],
          },
          {
            title: 'Sales Forecast Overview (TM)',
            to: '/sales/sales-forecast-overview-tm',
            roles: ['admin', 'salesman'],
          },
          {
            title: 'Sales Forecast Overview (RM)',
            to: '/sales/sales-forecast-overview-rm',
            roles: ['admin', 'salesman'],
          },
        ],
      },
    ],
  },
  {
    title: 'Inventory',
    description: 'Manage products, stock, and suppliers.',
    roles: ['admin', 'salesman'],
    icon: <span>📦</span>,
    children: [
      { title: 'Products', to: '/inventory/products', roles: ['salesman'] },
      { title: 'Stock', to: '/inventory/stock', roles: ['admin'] },
      {
        title: 'Suppliers',
        roles: ['admin'],
        children: [
          {
            title: 'Supplier List',
            to: '/inventory/suppliers',
            roles: ['admin'],
          },
          {
            title: 'Add Supplier',
            to: '/inventory/suppliers/add',
            roles: ['admin'],
          },
        ],
      },
    ],
  },

  {
    title: 'Finance',
    description: 'Manage invoices, expenses, and payments.',
    roles: ['admin'],
    icon: <span>💳</span>,
    children: [
      { title: 'Invoices', to: '/finance/invoices', roles: ['admin'] },
      { title: 'Payments', to: '/finance/payments', roles: ['admin'] },
      {
        title: 'Reports',
        roles: ['admin'],
        children: [
          {
            title: 'Profit & Loss',
            to: '/finance/reports/pnl',
            roles: ['admin'],
          },
          {
            title: 'Expenses',
            to: '/finance/reports/expenses',
            roles: ['admin'],
          },
        ],
      },
    ],
  },

  {
    title: 'HRMS',
    description: 'Employee, attendance, and leave modules.',
    roles: ['admin', 'support'],
    icon: <span>🧑‍💼</span>,
    children: [
      { title: 'Employees', to: '/hrms/employees', roles: ['admin'] },
      { title: 'Attendance', to: '/hrms/attendance', roles: ['support'] },
      {
        title: 'Leave',
        roles: ['admin', 'support'],
        children: [
          { title: 'Apply Leave', to: '/hrms/leave/apply', roles: ['support'] },
          {
            title: 'Leave History',
            to: '/hrms/leave/history',
            roles: ['admin'],
          },
        ],
      },
    ],
  },

  {
    title: 'Analytics',
    description: 'Business insights and dashboards.',
    roles: ['admin'],
    icon: <span>📊</span>,
    children: [
      {
        title: 'Executive Dashboard',
        to: '/analytics/executive-dashboard',
        roles: ['admin'],
      },
      {
        title: 'Custom Reports',
        to: '/analytics/custom-reports',
        roles: ['admin'],
      },
      {
        title: 'Segments',
        roles: ['admin'],
        children: [
          {
            title: 'Retail',
            to: '/analytics/segments/retail',
            roles: ['admin'],
          },
          { title: 'CSD', to: '/analytics/segments/csd', roles: ['admin'] },
          { title: 'IB', to: '/analytics/segments/ib', roles: ['admin'] },
        ],
      },
    ],
  },

  {
    title: 'Documents',
    description: 'Centralized document storage and templates.',
    roles: ['admin', 'salesman', 'support'],
    icon: <span>📄</span>,
    children: [
      {
        title: 'All Documents',
        to: '/documents/all',
        roles: ['admin', 'support'],
      },
      { title: 'Templates', to: '/documents/templates', roles: ['admin'] },
      {
        title: 'Policies',
        roles: ['admin', 'support'],
        children: [
          {
            title: 'Terms & Conditions',
            to: '/terms-and-conditions',
            roles: ['admin', 'support'],
          },
          {
            title: 'Privacy Policy',
            to: '/privacy-policy',
            roles: ['admin', 'support'],
          },
          { title: 'FAQ', to: '/faq', roles: ['admin', 'salesman', 'support'] },
        ],
      },
    ],
  },

  {
    title: 'Notifications',
    description: 'Alerts, subscriptions, and announcements.',
    roles: ['admin', 'support'],
    icon: <span>🔔</span>,
    children: [
      {
        title: 'Announcements',
        to: '/notifications/announcements',
        roles: ['support'],
      },
      {
        title: 'Subscriptions',
        to: '/notifications/subscriptions',
        roles: ['admin'],
      },
      {
        title: 'Alert Rules',
        roles: ['admin'],
        children: [
          {
            title: 'Email Alerts',
            to: '/notifications/alerts/email',
            roles: ['admin'],
          },
          {
            title: 'System Alerts',
            to: '/notifications/alerts/system',
            roles: ['admin'],
          },
        ],
      },
    ],
  },
];
