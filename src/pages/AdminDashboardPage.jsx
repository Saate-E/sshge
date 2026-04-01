import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as XLSX from "xlsx";
import headerLogo from "../assets/images.jpg";
import { isAdminAuthenticated, logoutAdmin } from "../lib/adminAuth";
import { getRegistrations } from "../lib/registration";

function AdminDashboardPage() {
  const isAuthenticated = isAdminAuthenticated();
  const [registrations, setRegistrations] = useState(() => getRegistrations());
  const [memberFilter, setMemberFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");

  useEffect(() => {
    const syncRegistrations = () => {
      setRegistrations(getRegistrations());
    };

    window.addEventListener("storage", syncRegistrations);
    const intervalId = window.setInterval(syncRegistrations, 1000);

    return () => {
      window.removeEventListener("storage", syncRegistrations);
      window.clearInterval(intervalId);
    };
  }, []);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((item) => {
      const matchesMember =
        memberFilter === "all"
          ? true
          : memberFilter === "member"
            ? item.isMember === "Yes"
            : item.isMember !== "Yes";

      const matchesState =
        stateFilter === "all" ? true : item.stateOfResidence === stateFilter;

      return matchesMember && matchesState;
    });
  }, [memberFilter, registrations, stateFilter]);

  const availableStates = useMemo(() => {
    return [
      ...new Set(
        registrations.map((item) => item.stateOfResidence).filter(Boolean),
      ),
    ].sort();
  }, [registrations]);

  const exportRows = filteredRegistrations.map((person) => ({
    Name: person.name,
    Phone: person.phoneNumber,
    Gender: person.gender,
    Email: person.email,
    State: person.stateOfResidence,
    Occupation: person.occupation,
    MemberStatus: person.isMember,
    RegistrationNumber: person.registrationNumber,
  }));

  const handleExport = (type) => {
    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(
      workbook,
      `sshge-registrations.${type === "excel" ? "xlsx" : "csv"}`,
      { bookType: type === "excel" ? "xlsx" : "csv" },
    );
  };

  const totalRegistrations = registrations.length;
  const filteredCount = filteredRegistrations.length;
  const femaleCount = registrations.filter(
    (item) => item.gender === "Female",
  ).length;
  const maleCount = registrations.filter(
    (item) => item.gender === "Male",
  ).length;
  const memberCount = registrations.filter(
    (item) => item.isMember === "Yes",
  ).length;
  const nonMemberCount = totalRegistrations - memberCount;
  const highestChartValue = Math.max(
    totalRegistrations,
    femaleCount,
    maleCount,
    1,
  );

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <img
            src={headerLogo}
            alt="Light Nation"
            className="h-12 w-auto rounded-lg object-cover sm:h-14"
          />
          <div className="flex items-center gap-3">
            <Link
              to="/admin/login"
              onClick={logoutAdmin}
              className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DashboardStat
              label="Total Registered"
              value={totalRegistrations}
            />
            <DashboardStat label="Real-time Count" value={totalRegistrations} />
            <DashboardStat label="Females" value={femaleCount} />
            <DashboardStat label="Males" value={maleCount} />
          </section>

          <section className="grid gap-8 xl:grid-cols-2">
            <ChartCard title="Registered People Chart">
              <BarMetric
                label="Registered People"
                value={totalRegistrations}
                maxValue={highestChartValue}
              />
              <BarMetric
                label="Members"
                value={memberCount}
                maxValue={highestChartValue}
              />
              <BarMetric
                label="Non-members"
                value={nonMemberCount}
                maxValue={highestChartValue}
              />
            </ChartCard>

            <ChartCard title="Female and Male Chart">
              <BarMetric
                label="Females"
                value={femaleCount}
                maxValue={highestChartValue}
              />
              <BarMetric
                label="Males"
                value={maleCount}
                maxValue={highestChartValue}
              />
            </ChartCard>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto]">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Filter by Member / Non-member
                </span>
                <select
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-orange-400"
                  value={memberFilter}
                  onChange={(event) => setMemberFilter(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="member">Member</option>
                  <option value="non-member">Non-member</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Filter by State
                </span>
                <select
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-orange-400"
                  value={stateFilter}
                  onChange={(event) => setStateFilter(event.target.value)}
                >
                  <option value="all">All states</option>
                  {availableStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleExport("csv")}
                  className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Export CSV
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("excel")}
                  className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                  Export Excel
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
                  Spreadsheet
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-white">
                  Registered People
                </h1>
              </div>
              <p className="text-sm text-slate-400">
                Showing {filteredCount} of {totalRegistrations} registrations
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-left">
                <thead className="bg-slate-950/70 text-sm uppercase tracking-wide text-slate-300">
                  <tr>
                    <th className="px-4 py-4">Name</th>
                    <th className="px-4 py-4">Phone</th>
                    <th className="px-4 py-4">Gender</th>
                    <th className="px-4 py-4">Email</th>
                    <th className="px-4 py-4">State</th>
                    <th className="px-4 py-4">Occupation</th>
                    <th className="px-4 py-4">Reg No</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-slate-900">
                  {filteredRegistrations.length > 0 ? (
                    filteredRegistrations.map((person) => (
                      <tr
                        key={`${person.registrationNumber}-${person.createdAt}`}
                      >
                        <td className="px-4 py-4 text-white">{person.name}</td>
                        <td className="px-4 py-4 text-slate-300">
                          {person.phoneNumber}
                        </td>
                        <td className="px-4 py-4 text-slate-300">
                          {person.gender}
                        </td>
                        <td className="px-4 py-4 text-slate-300">
                          {person.email}
                        </td>
                        <td className="px-4 py-4 text-slate-300">
                          {person.stateOfResidence}
                        </td>
                        <td className="px-4 py-4 text-slate-300">
                          {person.occupation}
                        </td>
                        <td className="px-4 py-4 font-semibold text-orange-300">
                          {person.registrationNumber}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-4 py-8 text-center text-slate-400"
                        colSpan="7"
                      >
                        No registrations match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function DashboardStat({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
        {label}
      </p>
      <p className="mt-3 text-4xl font-bold text-white">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

function BarMetric({ label, value, maxValue }) {
  const width = `${Math.max((value / maxValue) * 100, value > 0 ? 12 : 0)}%`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-4 rounded-full bg-slate-800">
        <div
          className="h-4 rounded-full bg-linear-to-r from-orange-500 to-amber-300"
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
