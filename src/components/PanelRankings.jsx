import { createColumnHelper } from "@tanstack/react-table"
import { useDraftStore } from "../store/draftStore"
import { useDraftSettingsStore } from "../store/draftSettingsStore"
import { IoMdAdd } from "react-icons/io"
import TableWithFilters from "./TableWithFilters"

function PanelRankings({ data, currentPick }) {
  const [assignPlayer, addSelectedPlayer] = useDraftStore((state) => [
    state.assignPlayer,
    state.addSelectedPlayer,
  ])

  const [teams, rounds] = useDraftSettingsStore((state) => [
    state.teams,
    state.rounds,
  ])

  const isLastPick = currentPick.overall > teams * rounds

  function selectPlayer(playerProps) {
    const { id, first_name, last_name, position } = playerProps
    assignPlayer(
      { id, first_name, last_name, position, isProjection: false },
      currentPick
    )
    addSelectedPlayer(id)
  }

  const columnHelper = createColumnHelper()
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
  ]

  return <TableWithFilters columns={columns} data={data} />
}

export default PanelRankings
