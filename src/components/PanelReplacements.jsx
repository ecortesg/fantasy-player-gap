import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function PanelReplacements({ data, currentPick, nextPick, picksInBetween }) {
  const [sorting, setSorting] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
        id: "player",
        header: "Player",
      }),
      columnHelper.accessor("position", {
        header: "Position",
      }),
      columnHelper.accessor("adp", {
        header: "ADP",
      }),
      columnHelper.accessor("fpts", {
        header: "FPts",
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
    <div className="flex flex-col h-full xl:gap-0 gap-4">
      <h2 className="h-1/6 text-xl font-semibold">REPLACEMENTS</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b sticky top-0 bg-gray-100">
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
              <tr className="border-b hover:bg-gray-200" key={row.id}>
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
      <div className="flex-1 flex justify-around items-center">
        <div className="text-center">
          <p className="font-semibold text-xl">
            {currentPick.round}.{currentPick.number} ({currentPick.overall})
          </p>
          <p className="text-sm">Current Pick</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl">
            {nextPick.round}.{nextPick.number} ({nextPick.overall})
          </p>
          <p className="text-sm">Next Pick</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl">{picksInBetween}</p>
          <p className="text-sm">In Between</p>
        </div>
      </div>
    </div>
  );
}

export default PanelReplacements;
