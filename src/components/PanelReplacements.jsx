import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function PanelReplacements({ data, currentPick, nextPick, picksBeforeYou }) {
  const [sorting, setSorting] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
        id: "player",
        header: "Player",
        size: 200,
      }),
      columnHelper.accessor("position", {
        header: "Position",
        size: 100,
      }),
      columnHelper.accessor("adp", {
        header: "ADP",
        size: 100,
      }),
      columnHelper.accessor("fpts", {
        header: "FPts",
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
    <div className="h-full flex flex-col">
      <h2 className="h-1/6 text-lg font-semibold text-center md:text-left">
        REPLACEMENTS
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b sticky top-0 bg-white dark:bg-slate-700">
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
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                className={`border-b hover:bg-slate-200 dark:hover:bg-slate-800 border-none ${
                  index % 2 === 0 ? "bg-slate-100 dark:bg-slate-600" : ""
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
          <p className="font-semibold text-xl">{picksBeforeYou}</p>
          <p className="text-sm">Before You</p>
        </div>
      </div>
    </div>
  );
}

export default PanelReplacements;
