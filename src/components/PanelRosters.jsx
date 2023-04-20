import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import RostersDropdown from "./RostersDropdown";

function PanelRosters({ data, teams, setRoster }) {
  const [sorting, setSorting] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor(
      (row) => `${row.player.first_name} ${row.player.last_name}`,
      {
        header: "Player",
      }
    ),
    columnHelper.accessor((row) => row.player.position, {
      header: "Position",
    }),
    columnHelper.accessor((row) => `${row.round}.${row.number}`, {
      header: "Pick",
    }),
  ];

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
          <RostersDropdown teams={teams} setRoster={setRoster} />
        </div>
      </div>
      <div className="h-5/6 overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b sticky top-0 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="overflow-y-auto">
            {table.getRowModel().rows.map((row) => (
              <tr className="border-b hover:bg-slate-100" key={row.id}>
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
