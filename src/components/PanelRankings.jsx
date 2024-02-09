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
import RankingsPositionFilter from "./RankingsPositionFilter";
import { IoMdAddCircle } from "react-icons/io";
import { useDraftStore } from "../store/draftStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";

function PanelRankings({ data }) {
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
      cell: (props) => (
        <button
          type="button"
          className={`text-2xl  flex ${
            isLastPick ? "text-teal-200" : "cursor-pointer text-teal-500"
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
    }),
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
    columnHelper.accessor("gap", {
      header: "Gap",
    }),
    columnHelper.accessor((row) => row.urgency.text, {
      header: "Urgency",
      sortingFn: (a, b) => a.original.urgency.value - b.original.urgency.value,
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

  return (
    <>
      <div className="md:h-1/6 grid grid-cols-[75%_25%] grid-rows-2 gap-2">
        <RankingsPlayerFilter
          column={playerColumn}
          onChange={(value) => playerColumn.setFilterValue(value)}
        />
        <button
          type="button"
          className={`rounded px-3 py-1 text-white shadow m-auto sm:text-base text-xs ${
            isFirstPick ? "bg-red-300" : "cursor-pointer bg-red-500"
          }`}
          disabled={isFirstPick}
          onClick={undoPrevPick}
        >
          UNDO
        </button>
        <div className="col-span-2">
          <RankingsPositionFilter
            onChange={(value) => positionColumn.setFilterValue(value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto h-5/6">
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
                            ? "cursor-pointer select-none px-1"
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
