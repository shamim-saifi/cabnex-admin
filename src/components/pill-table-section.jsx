import React, { useState } from "react";
import { Link } from "react-router";

export default function PillTableSection() {
  const pills = ["Rental", "City taxi", "Transfer", "Outstation", "Activity"];

  const types = {
    one: "One Way",
    two: "Round Trip",
    multi: "Multi City",
  };

  const [activePill, setActivePill] = useState("rental");
  const [activeType, setActiveType] = useState("one");

  // Example table data
  const data = [
    {
      _id: 1,
      name: "Anita Sharma",
      trip: "rental",
      status: "Pending",
    },
    {
      _id: 2,
      name: "Rohit Verma",
      trip: "rental",
      status: "Pending",
    },
    {
      _id: 3,
      name: "Sunita Rao",
      trip: "rental",
      status: "Paused",
    },
    {
      _id: 4,
      name: "Aman Singh",
      trip: "rental",
      status: "Pending",
    },
    {
      _id: 5,
      name: "Priya Kapoor",
      trip: "outstation",
      type: "two",
      status: "Pending",
    },
    {
      _id: 6,
      name: "Priya Kapoor",
      trip: "activity",
      status: "Pending",
    },
    {
      _id: 7,
      name: "Karan Patel",
      trip: "outstation",
      type: "one",
      status: "Pending",
    },
    {
      _id: 8,
      name: "Neha Gupta",
      trip: "transfer",
      status: "Pending",
    },
    {
      _id: 9,
      name: "Vikram Das",
      trip: "city taxi",
      status: "Pending",
    },
  ];

  const filtered = data.filter((d) => d.trip === activePill.toLowerCase());

  const typeFiltered = filtered.filter((d) =>
    activePill === "Outstation" ? d.type === activeType : true,
  );

  return (
    <section className="bg-card mx-auto w-full rounded-xl p-4">
      {/* Header with scrollable pills */}
      <div className="mb-4">
        <div className="relative">
          <div className="no-scrollbar overflow-x-auto">
            <div className="flex items-center gap-3 px-2 py-2">
              {pills.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePill(p)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-shadow focus:ring-2 focus:ring-offset-1 focus:outline-none ${
                    activePill.toLowerCase() === p.toLowerCase()
                      ? "shadow-blue-1/10 bg-chart-5 text-white shadow-lg"
                      : "text-foreground bg-chart-1/40 hover:bg-chart-1"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        {activePill === "Outstation" && (
          <div className="mt-2">
            <div className="relative">
              <div className="no-scrollbar overflow-x-auto">
                <div className="flex items-center gap-3 px-2 py-2">
                  {Object.entries(types).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setActiveType(key)}
                      className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap transition-shadow focus:ring-2 focus:ring-offset-1 focus:outline-none ${
                        activeType.toLowerCase() === key.toLowerCase()
                          ? "shadow-blue-1/10 bg-chart-5 text-white shadow-lg"
                          : "bg-chart-1/40 hover:bg-chart-1 text-black"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-b-2 border-white/10" />

      {/* Main card with table in the middle */}
      <div className="bg-card mt-4 rounded-2xl shadow-sm">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">All {activePill} Bookings</h3>
            <Link
              to={`/bookings?serviceType=${activePill.toLowerCase()}`}
              className="text-muted-foreground text-sm hover:underline"
            >
              View All
            </Link>
          </div>

          {/* Table: use a simple accessible table with responsive wrapper */}
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full table-fixed divide-y">
              <thead className="bg-chart-1">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Trip
                  </th>
                  {activePill === "Outstation" && (
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Type
                    </th>
                  )}
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y">
                {(activePill === "Outstation" ? typeFiltered : filtered).map(
                  (row) => (
                    <tr key={row._id} className="hover:bg-muted/40">
                      <td className="px-4 py-3 text-sm">{row.name}</td>
                      <td className="px-4 py-3 text-sm">{row.trip}</td>
                      {activePill === "Outstation" && (
                        <td className="px-4 py-3 text-sm">{types[row.type]}</td>
                      )}

                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            row.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        <Link
                          to={`/bookings/${row._id}`}
                          className="cursor-pointer rounded-md bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-500/80"
                        >
                          View
                        </Link>
                        <button className="text-destructive hover:bg-muted ml-2 cursor-pointer rounded-md px-3 py-1 text-sm font-medium">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ),
                )}
                {(activePill === "Outstation" ? typeFiltered : filtered)
                  .length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-muted-foreground px-4 py-6 text-center text-sm"
                    >
                      No results for "
                      {activePill === "Outstation"
                        ? `Outstation ${activeType[0].toUpperCase() + activeType.slice(1)}`
                        : activePill}
                      ".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer controls
          <div className="mt-4 flex items-center justify-between">
            <div className="text-muted-foreground text-sm">
              Tip: swipe the pills above to filter quickly.
            </div>
            <div className="flex items-center gap-2">
              <button className="hover:bg-muted rounded-md px-3 py-1 text-sm font-medium">
                Export
              </button>
              <button className="bg-primary rounded-md px-3 py-1 text-sm font-medium text-white hover:brightness-95">
                Add
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
