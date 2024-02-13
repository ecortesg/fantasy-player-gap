import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { arrayRange } from "../utils";

function PanelRosters({ data }) {
  const [sorting, setSorting] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => `${row.player.first_name} ${row.player.last_name}`,
        {
          header: "Player",
          size: 200,
        }
      ),
      columnHelper.accessor((row) => row.player.position, {
        header: "Position",
        size: 100,
      }),
      columnHelper.accessor((row) => `${row.round}.${row.number}`, {
        header: "Pick",
        size: 100,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="h-1/6">
        <h2 className="text-xl font-semibold">ROSTER</h2>
        <div className="flex justify-center">
          <RostersDropdown />
        </div>
      </div>
      <div className="h-5/6 overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b sticky top-0 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer p-1 flex items-center"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}{" "}
                        {header.column.getCanSort()
                          ? {
                              asc: <FaSortUp className="h-3" />,
                              desc: <FaSortDown className="h-3" />,
                            }[header.column.getIsSorted()] ?? (
                              <FaSort className="h-3" />
                            )
                          : ""}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="overflow-y-auto">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                className={`border-b hover:bg-slate-200 ${
                  index % 2 === 0 ? "bg-slate-100" : ""
                }`}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="whitespace-nowrap px-2" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PanelRosters;

function RostersDropdown() {
  const { teams } = useDraftSettingsStore((state) => state.draftSettings);
  const updateRoster = useDashboardSettingsStore((state) => state.updateRoster);

  const teamsArray = arrayRange(1, teams, 1);

  return (
    <select
      className="border rounded shadow"
      onChange={(e) => updateRoster(parseInt(e.target.value))}
    >
      {teamsArray.map((tm) => {
        return (
          <option key={tm} value={tm}>
            Team {tm}
          </option>
        );
      })}
    </select>
  );
}
