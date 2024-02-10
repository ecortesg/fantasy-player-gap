import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import RankingsPlayerFilter from "./RankingsPlayerFilter";
import { IoMdAddCircle } from "react-icons/io";
import { useDraftStore } from "../store/draftStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

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

  const { teams, rounds } = useDraftSettingsStore(
    (state) => state.draftSettings
  );

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
          className={`text-2xl flex ${
            isLastPick ? "text-blue-300" : "cursor-pointer text-blue-500"
          }`}
          onClick={() => selectPlayer(props.row.original)}
          disabled={isLastPick}
        >
          <IoMdAddCircle />
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
    <>
      <div className="sm:h-1/6">
        <div className="flex justify-between mb-4">
          <RankingsPlayerFilter
            column={playerColumn}
            onChange={handlePlayerChange}
          />
          <button
            type="button"
            className={`rounded px-3 py-1 text-white shadow sm:text-base text-xs ${
              isFirstPick ? "bg-red-300" : "cursor-pointer bg-red-500"
            }`}
            disabled={isFirstPick}
            onClick={undoPrevPick}
          >
            UNDO
          </button>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap justify-center sm:justify-start">
          <PositionFilterPill
            key="ALL"
            label="ALL"
            position=""
            activePill={activePill}
            handlePositionChange={handlePositionChange}
          />
          {Object.keys(positions).map((position) => {
            if (positions[position] > 0) {
              return (
                <PositionFilterPill
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
        <table className="w-full table-auto">
          <thead className="border-b sticky top-0 bg-white">
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

export default PanelRankings;

function PositionFilterPill({
  activePill,
  position,
  label,
  handlePositionChange,
}) {
  return (
    <div
      className={`${
        activePill === position
          ? "bg-blue-500 text-white"
          : "hover:bg-slate-200 "
      } rounded-full w-12 cursor-pointer text-center`}
      onClick={() => handlePositionChange(position)}
    >
      {label}
    </div>
  );
}
