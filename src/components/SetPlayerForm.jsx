import { IoMdClose, IoMdAdd } from "react-icons/io"
import { createColumnHelper } from "@tanstack/react-table"
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore"
import TableWithFilters from "./TableWithFilters"
import { useDraftStore } from "../store/draftStore"

export function SetPlayerForm({ data }) {
  const [updateIsModalOpen, manualPick] = useDashboardSettingsStore((state) => [
    state.updateIsModalOpen,
    state.manualPick,
  ])

  const [assignPlayer, addSelectedPlayer] = useDraftStore((state) => [
    state.assignPlayer,
    state.addSelectedPlayer,
  ])

  const { number, overall, round, team } = manualPick

  function selectPlayer(playerProps) {
    const { id, first_name, last_name, position } = playerProps
    assignPlayer(
      { id, first_name, last_name, position, isProjection: false },
      manualPick
    )
    addSelectedPlayer(id)
    updateIsModalOpen(false)
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
          className="h-full rounded-full flex text-xl text-white cursor-pointer bg-blue-500 dark:bg-indigo-500"
          onClick={() => selectPlayer(props.row.original)}
        >
          <IoMdAdd />
        </button>
      ),
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
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex w-full justify-between p-4">
        <div>
          <h2 className="text-xl font-bold">Set Player</h2>
          <p className="font-semibold text-sm">
            Pick {`${round}.${number} (${overall})`} · Team {team}
          </p>
        </div>
        <IoMdClose
          className="cursor-pointer"
          size={32}
          onClick={() => updateIsModalOpen(false)}
        />
      </div>
      <div className="p-4 overflow-y-auto h-full">
        <TableWithFilters columns={columns} data={data} />
      </div>
    </div>
  )
}

export default SetPlayerForm
