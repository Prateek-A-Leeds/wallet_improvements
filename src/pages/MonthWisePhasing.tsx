import { useMemo, useState } from 'react';
import { PageSection, Panel, PanelInset, SectionHeading } from '@/components/common/AppShell';
import Container from '@/components/common/Container';
import MonthWisePhasingDrawer, {
  type MonthWisePhasingRecord,
} from '@/components/planning/MonthWisePhasingDrawer';

type PhasingStatus = 'Approved by Retail Head' | 'In Progress';

const dummyRows: MonthWisePhasingRecord[] = [
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
    status: 'In Progress',
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
    status: 'In Progress',
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

function getStatusClasses(status: PhasingStatus) {
  switch (status) {
    case 'Approved by Retail Head':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';
    case 'In Progress':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  }
}

function MonthWisePhasing() {
  const [selectedRow, setSelectedRow] = useState<MonthWisePhasingRecord | null>(
    null,
  );

  const rows = useMemo(
    () =>
      dummyRows.map((row, index) => ({
        ...row,
        serialNumber: index + 1,
      })),
    [],
  );

  return (
    <>
      <PageSection className="pb-8 pt-2">
        <Container>
          <Panel className="p-5 sm:p-7">
            <SectionHeading
              eyebrow="Planning records"
              title="Month Wise Phasing"
              description="Review month wise phasing records by financial year and department."
            />

            <div className="mt-6">
              <PanelInset className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200/70 dark:divide-slate-800">
                    <thead className="bg-slate-950 dark:bg-slate-900">
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
                      {rows.length > 0 ? (
                        rows.map((row) => (
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
            </div>
          </Panel>
        </Container>
      </PageSection>

      <MonthWisePhasingDrawer
        open={Boolean(selectedRow)}
        record={selectedRow}
        onClose={() => setSelectedRow(null)}
      />
    </>
  );
}

export default MonthWisePhasing;
