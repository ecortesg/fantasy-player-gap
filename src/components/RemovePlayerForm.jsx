import { IoMdClose } from "react-icons/io"
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore"
import { useDraftStore } from "../store/draftStore"

export function RemovePlayerForm() {
  const [updateIsModalOpen, manualPick] = useDashboardSettingsStore((state) => [
    state.updateIsModalOpen,
    state.manualPick,
  ])

  const [removePlayer, removeSelectedPlayer] = useDraftStore((state) => [
    state.removePlayer,
    state.removeSelectedPlayer,
  ])

  const { number, overall, round, team, player } = manualPick

  function remove() {
    removePlayer(manualPick)
    removeSelectedPlayer(player.id)
    updateIsModalOpen(false)
  }

  function cancel() {
    updateIsModalOpen(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex w-full justify-between p-4">
        <div>
          <h2 className="text-xl font-bold">Remove Player</h2>
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
      <p className="text-center">{`${player.first_name} ${player.last_name}`}</p>
      <p className="text-center">{player.position}</p>
      <div className="p-4 h-full flex justify-evenly items-center">
        <button
          type="button"
          className="bg-slate-400 dark:bg-slate-500 text-white py-2 px-4 rounded cursor-pointer"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
          onClick={remove}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default RemovePlayerForm
