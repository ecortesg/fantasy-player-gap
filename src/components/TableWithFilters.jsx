import { useState, useEffect } from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"
import { VscClose } from "react-icons/vsc"

function TableWithFilters({ data, columns }) {
  const [activePill, setActivePill] = useState("")
  const positions = { QB: 1, RB: 1, WR: 1, TE: 1, K: 1, DEF: 1 }

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })

  const playerColumn = table.getColumn("player")
  const positionColumn = table.getColumn("position")

  function handlePositionChange(value) {
    positionColumn.setFilterValue(value)
    setActivePill(value)
  }

  function handlePlayerChange(value) {
    playerColumn.setFilterValue(value)
  }

  return (
    <div className="h-full">
      <div className="h-1/6 flex flex-col gap-2">
        <PlayerTextField column={playerColumn} onChange={handlePlayerChange} />
        <div className="flex flex-1 items-center gap-x-2 shrink-0 flex-wrap md:justify-start justify-center">
          <PositionPill
            key="ALL"
            label="ALL"
            position=""
            activePill={activePill}
            handlePositionChange={handlePositionChange}
          />
          {Object.keys(positions).map((position) => {
            if (positions[position] > 0) {
              return (
                <PositionPill
                  key={position}
                  label={position}
                  position={position}
                  activePill={activePill}
                  handlePositionChange={handlePositionChange}
                />
              )
            }
          })}
        </div>
      </div>
      <div className="h-5/6 overflow-x-auto">
        <table className="w-full">
          <thead className="border-b sticky top-0 bg-white dark:bg-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                    }}
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
    </div>
  )
}

export default TableWithFilters

function PositionPill({ activePill, position, label, handlePositionChange }) {
  return (
    <div
      className={`${
        activePill === position
          ? "bg-blue-500 dark:bg-indigo-500 text-white"
          : "hover:bg-slate-200 dark:hover:bg-slate-600"
      } rounded-full w-12 cursor-pointer text-center`}
      onClick={() => handlePositionChange(position)}
    >
      {label}
    </div>
  )
}

function PlayerTextField({ column, onChange, debounce = 500 }) {
  const columnFilterValue = column.getFilterValue() ?? ""
  const [value, setValue] = useState(columnFilterValue)

  useEffect(() => {
    setValue(columnFilterValue)
  }, [columnFilterValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className="relative w-fit">
      <input
        className="border rounded pl-2 pr-8 py-0.5 bg-slate-200 dark:bg-slate-800 border-none outline-none"
        type="text"
        placeholder="Find player"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== "" && (
        <VscClose
          className="absolute right-1 top-0 h-7 w-7 rounded-full cursor-pointer"
          onClick={() => setValue("")}
        />
      )}
    </div>
  )
}
