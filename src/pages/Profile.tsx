import { useMemo, useState, useEffect } from 'react';
import Container from '@/components/common/Container';

type TerritoryRow = {
  id: number;
  territoryCode: string;
  territory: string;
  spCode: string;
  spName: string;
};

type RegionKey =
  | 'IB-ASIA-PACIFIC'
  | 'IB-NORTH-AFRICA'
  | 'IB-MIDDLE-EAST'
  | 'IB-EUROPE';

type RegionData = {
  key: RegionKey;
  title: RegionKey;
  rows: TerritoryRow[];
};

const profile = {
  name: 'Prateek Sharma',
  empCode: 'EXP-024',
  email: 'prateek.a@hubhopper.in',
  mobile: '+91 9876543210',
  dob: '14 Sep 1998',
  doj: '07 Apr 2026',
  department: 'International Business',
  branch: 'Noida',
  reporting: 'Vishal Dhamija',
  grade: 'SDE II',
  lastOnline: new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }),
  coverImage:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  profileImage:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
};

const regionData: RegionData[] = [
  {
    key: 'IB-ASIA-PACIFIC',
    title: 'IB-ASIA-PACIFIC',
    rows: [
      {
        id: 1,
        territoryCode: '900040',
        territory: 'Bangladesh',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 2,
        territoryCode: '900250',
        territory: 'India',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 3,
        territoryCode: '900260',
        territory: 'Iran',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 4,
        territoryCode: '900360',
        territory: 'Myanmar',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 5,
        territoryCode: '900420',
        territory: 'Philippines',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 6,
        territoryCode: '900470',
        territory: 'Taiwan',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 7,
        territoryCode: '900500',
        territory: 'Thailand',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 8,
        territoryCode: '900610',
        territory: 'Vietnam',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 9,
        territoryCode: '900740',
        territory: 'Indonesia',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 10,
        territoryCode: '900820',
        territory: 'Malaysia',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 11,
        territoryCode: '900920',
        territory: 'Sri Lanka',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
      {
        id: 12,
        territoryCode: '901011',
        territory: 'Hongkong',
        spCode: 'EXP-024',
        spName: 'Vishal Dhamija',
      },
    ],
  },
  {
    key: 'IB-NORTH-AFRICA',
    title: 'IB-NORTH-AFRICA',
    rows: [
      {
        id: 1,
        territoryCode: '910110',
        territory: 'Egypt',
        spCode: 'NA-011',
        spName: 'Amit Rao',
      },
      {
        id: 2,
        territoryCode: '910120',
        territory: 'Morocco',
        spCode: 'NA-011',
        spName: 'Amit Rao',
      },
      {
        id: 3,
        territoryCode: '910130',
        territory: 'Algeria',
        spCode: 'NA-011',
        spName: 'Amit Rao',
      },
      {
        id: 4,
        territoryCode: '910140',
        territory: 'Tunisia',
        spCode: 'NA-014',
        spName: 'Nikhil Suri',
      },
      {
        id: 5,
        territoryCode: '910150',
        territory: 'Libya',
        spCode: 'NA-014',
        spName: 'Nikhil Suri',
      },
      {
        id: 6,
        territoryCode: '910160',
        territory: 'Sudan',
        spCode: 'NA-017',
        spName: 'Megha Jain',
      },
    ],
  },
  {
    key: 'IB-MIDDLE-EAST',
    title: 'IB-MIDDLE-EAST',
    rows: [
      {
        id: 1,
        territoryCode: '920210',
        territory: 'UAE',
        spCode: 'ME-101',
        spName: 'Rahul Mehta',
      },
      {
        id: 2,
        territoryCode: '920220',
        territory: 'Saudi Arabia',
        spCode: 'ME-101',
        spName: 'Rahul Mehta',
      },
      {
        id: 3,
        territoryCode: '920230',
        territory: 'Qatar',
        spCode: 'ME-108',
        spName: 'Arjun Nanda',
      },
      {
        id: 4,
        territoryCode: '920240',
        territory: 'Oman',
        spCode: 'ME-108',
        spName: 'Arjun Nanda',
      },
      {
        id: 5,
        territoryCode: '920250',
        territory: 'Kuwait',
        spCode: 'ME-115',
        spName: 'Ishita Sharma',
      },
      {
        id: 6,
        territoryCode: '920260',
        territory: 'Bahrain',
        spCode: 'ME-115',
        spName: 'Ishita Sharma',
      },
    ],
  },
  {
    key: 'IB-EUROPE',
    title: 'IB-EUROPE',
    rows: [
      {
        id: 1,
        territoryCode: '930310',
        territory: 'Germany',
        spCode: 'EU-202',
        spName: 'Rohan Kapoor',
      },
      {
        id: 2,
        territoryCode: '930320',
        territory: 'France',
        spCode: 'EU-202',
        spName: 'Rohan Kapoor',
      },
      {
        id: 3,
        territoryCode: '930330',
        territory: 'Italy',
        spCode: 'EU-209',
        spName: 'Sneha Arora',
      },
      {
        id: 4,
        territoryCode: '930340',
        territory: 'Spain',
        spCode: 'EU-209',
        spName: 'Sneha Arora',
      },
      {
        id: 5,
        territoryCode: '930350',
        territory: 'Poland',
        spCode: 'EU-214',
        spName: 'Kunal Sethi',
      },
      {
        id: 6,
        territoryCode: '930360',
        territory: 'Netherlands',
        spCode: 'EU-214',
        spName: 'Kunal Sethi',
      },
    ],
  },
];

const pageSizeOptions = [10, 25, 50, 100] as const;

function Profile() {
  const [activeRegion, setActiveRegion] =
    useState<RegionKey>('IB-ASIA-PACIFIC');
  const [search, setSearch] = useState('');
  const [territoryFilter, setTerritoryFilter] = useState('');
  const [spNameFilter, setSpNameFilter] = useState('');
  const [pageSize, setPageSize] =
    useState<(typeof pageSizeOptions)[number]>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastOnline, setLastOnline] = useState(() => new Date());

  useEffect(() => {
    let intervalId: number;

    const startMinuteUpdates = () => {
      setLastOnline(new Date());

      intervalId = window.setInterval(() => {
        setLastOnline(new Date());
      }, 60 * 1000);
    };

    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeoutId = window.setTimeout(() => {
      startMinuteUpdates();
    }, msUntilNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  const activeRegionData = useMemo(
    () =>
      regionData.find((region) => region.key === activeRegion) ?? regionData[0],
    [activeRegion],
  );

  const territoryOptions = useMemo(
    () =>
      [...new Set(activeRegionData.rows.map((row) => row.territory))].sort(),
    [activeRegionData],
  );

  const spNameOptions = useMemo(
    () => [...new Set(activeRegionData.rows.map((row) => row.spName))].sort(),
    [activeRegionData],
  );

  const filteredRows = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return activeRegionData.rows.filter((row) => {
      const matchesSearch =
        !searchTerm ||
        row.territoryCode.toLowerCase().includes(searchTerm) ||
        row.spCode.toLowerCase().includes(searchTerm);

      const matchesTerritory =
        !territoryFilter || row.territory === territoryFilter;

      const matchesSpName = !spNameFilter || row.spName === spNameFilter;

      return matchesSearch && matchesTerritory && matchesSpName;
    });
  }, [activeRegionData, search, territoryFilter, spNameFilter]);

  const totalRows = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const startRow = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  const handleRegionChange = (region: RegionKey) => {
    setActiveRegion(region);
    setSearch('');
    setTerritoryFilter('');
    setSpNameFilter('');
    setPageSize(10);
    setCurrentPage(1);
  };

  function getRegionPillClasses(region: RegionKey, isActive: boolean) {
    const base = 'rounded-full px-4 py-2 text-sm font-medium transition border';

    if (region === 'IB-ASIA-PACIFIC') {
      return isActive
        ? `${base} border-cyan-600 bg-cyan-600 text-white`
        : `${base} border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-800 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-300`;
    }

    if (region === 'IB-NORTH-AFRICA') {
      return isActive
        ? `${base} border-amber-600 bg-amber-600 text-white`
        : `${base} border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300`;
    }

    if (region === 'IB-MIDDLE-EAST') {
      return isActive
        ? `${base} border-emerald-600 bg-emerald-600 text-white`
        : `${base} border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300`;
    }

    return isActive
      ? `${base} border-violet-600 bg-violet-600 text-white`
      : `${base} border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 dark:hover:bg-violet-800 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300`;
  }

  return (
    <section className="py-6 sm:py-10">
      <Container>
        <div className="grid items-start gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div
                className="relative h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${profile.coverImage})` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/35 via-slate-900/10 to-transparent" />
              </div>

              <div className="relative px-4 pb-5 sm:px-6 sm:pb-6">
                <div className="-mt-14 flex justify-center sm:-mt-14">
                  <div className="rounded-full bg-white p-1.5 shadow-lg dark:bg-slate-900">
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-white sm:h-28 sm:w-28 dark:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-100">
                    {profile.name}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {profile.empCode}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Email
                  </p>
                  <p className="mt-2 break-all text-sm font-semibold text-slate-900 dark:text-slate-100 sm:break-normal">
                    {profile.email}
                  </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Mobile
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {profile.mobile}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      DOB
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {profile.dob}
                    </p>
                  </div>

                  <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      DOJ
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {profile.doj}
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-teal-600 to-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-teal-700 hover:to-cyan-700"
                >
                  Email to MSSI
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Department & Branch
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl bg-linear-to-br from-blue-50 to-cyan-50 p-4 dark:from-slate-800 dark:to-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Department
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {profile.department}
                  </p>
                </div>

                <div className="rounded-2xl bg-linear-to-br from-violet-50 to-fuchsia-50 p-4 dark:from-slate-800 dark:to-slate-900">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Branch
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {profile.branch}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Reporting Details
              </h2>

              <div className="mt-4 grid gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Reporting
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {profile.reporting}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Grade
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {profile.grade}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Last Online
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {lastOnline.toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Territory Hierarchy
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Explore regional territory ownership details.
              </p>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="flex flex-wrap gap-2">
                {regionData.map((region) => {
                  const isActive = region.key === activeRegion;
                  return (
                    <button
                      key={region.key}
                      type="button"
                      onClick={() => handleRegionChange(region.key)}
                      className={getRegionPillClasses(region.key, isActive)}
                    >
                      {region.title}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_180px_180px]">
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
                    placeholder="Search by territory code or SP code"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Territory
                  </label>
                  <select
                    value={territoryFilter}
                    onChange={(e) => {
                      setTerritoryFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">All territories</option>
                    {territoryOptions.map((territory) => (
                      <option key={territory} value={territory}>
                        {territory}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    SP Name
                  </label>
                  <select
                    value={spNameFilter}
                    onChange={(e) => {
                      setSpNameFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">All SP names</option>
                    {spNameOptions.map((spName) => (
                      <option key={spName} value={spName}>
                        {spName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-950">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                          Territory Code
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                          Territory
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                          SP Code
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                          SP Name
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                      {paginatedRows.length > 0 ? (
                        paginatedRows.map((row) => (
                          <tr
                            key={`${activeRegion}-${row.id}`}
                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          >
                            <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                              {row.territoryCode}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                              {row.territory}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                              {row.spCode}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                              {row.spName}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                          >
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
                <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
                  <div>
                    Showing <span className="font-semibold">{startRow}</span> to{' '}
                    <span className="font-semibold">{endRow}</span> of{' '}
                    <span className="font-semibold">{totalRows}</span> rows
                  </div>

                  <div className="text-slate-500 dark:text-slate-400">
                    Page{' '}
                    <span className="font-semibold">
                      {totalRows === 0 ? 0 : currentPage}
                    </span>{' '}
                    of <span className="font-semibold">{totalPages}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                        setCurrentPage(1);
                      }}
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

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Profile;
