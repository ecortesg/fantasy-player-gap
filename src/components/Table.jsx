import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function Table({ columns, data }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
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
  );
}

export default Table;
