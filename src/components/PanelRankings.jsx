import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useDraftStore } from "../store/draftStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { VscClose } from "react-icons/vsc";

function PanelRankings({ data }) {
  const [activePill, setActivePill] = useState("");
  const positions = { QB: 1, RB: 1, WR: 1, TE: 1, K: 1, DEF: 1 };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const [
    assignPlayer,
    removePlayer,
    counter,
    increaseCounter,
    decreaseCounter,
    addSelectedPlayer,
    removeSelectedPlayer,
  ] = useDraftStore((state) => [
    state.assignPlayer,
    state.removePlayer,
    state.counter,
    state.increaseCounter,
    state.decreaseCounter,
    state.addSelectedPlayer,
    state.removeSelectedPlayer,
  ]);

  const [teams, rounds] = useDraftSettingsStore((state) => [
    state.teams,
    state.rounds,
  ]);

  const isFirstPick = counter === 0;
  const isLastPick = counter === teams * rounds;

  function selectPlayer(playerProps) {
    const { id, first_name, last_name, position } = playerProps;
    assignPlayer(
      { id, first_name, last_name, position, isProjection: false },
      counter
    );
    increaseCounter();
    addSelectedPlayer(id);
  }

  function undoPrevPick() {
    removePlayer(counter - 1);
    decreaseCounter();
    removeSelectedPlayer();
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.display({
      id: "select",
      header: "",
      size: 50,
      cell: (props) => (
        <button
          type="button"
          className={`h-full rounded-full flex text-xl text-white ${
            isLastPick
              ? "bg-blue-300 dark:bg-indigo-300"
              : "cursor-pointer bg-blue-500 dark:bg-indigo-500"
          }`}
          onClick={() => selectPlayer(props.row.original)}
          disabled={isLastPick}
        >
          <IoMdAdd />
        </button>
      ),
    }),
    columnHelper.accessor("rank", {
      header: "Rank",
      size: 50,
    }),
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
    columnHelper.accessor("gap", {
      header: "Gap",
      size: 100,
    }),
    columnHelper.accessor((row) => row.urgency.text, {
      header: "Urgency",
      sortingFn: (a, b) => a.original.urgency.value - b.original.urgency.value,
      size: 100,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const playerColumn = table.getColumn("player");
  const positionColumn = table.getColumn("position");

  function handlePositionChange(value) {
    positionColumn.setFilterValue(value);
    setActivePill(value);
  }

  function handlePlayerChange(value) {
    playerColumn.setFilterValue(value);
  }

  return (
    <div className="h-full">
      <div className="h-1/6">
        <div className="flex justify-between mb-4">
          <PlayerTextField
            column={playerColumn}
            onChange={handlePlayerChange}
          />
          <button
            type="button"
            className={`rounded px-3 py-1 shadow text-base ${
              isFirstPick
                ? "bg-slate-300 dark:bg-slate-800 text-slate-500"
                : "cursor-pointer bg-red-500 text-white"
            }`}
            disabled={isFirstPick}
            onClick={undoPrevPick}
          >
            UNDO
          </button>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap md:justify-start justify-center">
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
              );
            }
          })}
        </div>
      </div>
      <div className="overflow-x-auto h-5/6">
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
  );
}

export default PanelRankings;

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
  );
}

function PlayerTextField({ column, onChange, debounce = 500 }) {
  const columnFilterValue = column.getFilterValue() ?? "";
  const [value, setValue] = useState(columnFilterValue);

  useEffect(() => {
    setValue(columnFilterValue);
  }, [columnFilterValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative">
      <input
        className="border rounded pl-2 pr-8 py-1 bg-slate-200 dark:bg-slate-800 border-none outline-none"
        type="text"
        placeholder="Find player"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== "" && (
        <VscClose
          className="absolute right-1 top-[3px] h-7 w-7 rounded-full cursor-pointer"
          onClick={() => setValue("")}
        />
      )}
    </div>
  );
}
