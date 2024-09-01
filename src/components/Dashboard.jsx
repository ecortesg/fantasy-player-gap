import { useEffect } from "react"
import { roundNumber } from "../utils"
import DraftHeader from "./DraftHeader"
import DraftBoard from "./DraftBoard"
import DraftPanel from "./DraftPanel"
import SettingsForm from "./SettingsForm"
import SetPlayerForm from "./SetPlayerForm"
import Modal from "./Modal"
import { useDraftSettingsStore } from "../store/draftSettingsStore"
import { useDraftStore } from "../store/draftStore"
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore"
import RemovePlayerForm from "./RemovePlayerForm"

function Dashboard({ data }) {
  const [picks, rosters, assignPlayer, removePlayer, selectedPlayers] =
    useDraftStore((state) => [
      state.picks,
      state.rosters,
      state.assignPlayer,
      state.removePlayer,
      state.selectedPlayers,
    ])
  const [adp, scoring, teams] = useDraftSettingsStore((state) => [
    state.adp,
    state.scoring,
    state.teams,
  ])
  const modal = useDashboardSettingsStore((state) => state.modal)

  const selectedAndProjectedPlayers = new Set(
    picks
      .map((pick) => pick.player?.id)
      .filter((playerId) => playerId !== undefined)
  )

  const freeAgents = data
    .map((elem) => {
      return {
        id: elem.id,
        first_name: elem.first_name,
        last_name: elem.last_name,
        position: elem.position,
        adp: elem.stats[`adp_${adp}`] || 999,
        fpts: roundNumber(
          Object.keys(scoring).reduce((total, key) => {
            return total + scoring[key] * (elem.stats[key] || 0)
          }, 0),
          2
        ),
      }
    })
    .filter((elem) => elem.adp < 999 || elem.fpts > 0)
    .filter((elem) => !selectedPlayers.includes(elem.id))
    .sort((a, b) => {
      return a.adp - b.adp || b.fpts - a.fpts
    })

  const currentPick = picks.find(
    (pick) => Object.keys(pick.player).length === 0 || pick.player.isProjection
  )
  const nextPick = picks
    .slice(currentPick.overall + 1) // 1 because we want to ignore the pick at the turn
    .find((elem) => currentPick.team === elem.team)
  const picksBeforeYou = nextPick.overall - currentPick.overall
  const picksInBewteen = picks.slice(
    currentPick.overall - 1,
    currentPick.overall - 1 + picksBeforeYou
  )

  useEffect(() => {
    picks
      // .slice(currentPick.overall - 1, currentPick.overall - 1 + 3 * teams)
      .forEach((pick) => {
        if (pick.player.isProjection) {
          removePlayer(pick)
        }
      })

    let index = 0

    picksInBewteen.forEach((pick) => {
      // TODO: Make projected picks based on roster and position of need
      // Has to be done in state since the state is updated async and the following approach doesn't work... The roster/countByPostition is not what it's supposed to be
      // const roster = rosters[pick.team]

      // const countByPosition = {}
      // roster.forEach((elem) => {
      //   if (countByPosition[elem.player.position]) {
      //     countByPosition[elem.player.position] += 1
      //   } else {
      //     countByPosition[elem.player.position] = 1
      //   }
      // })

      // console.log(pick.team, countByPosition)

      if (Object.keys(pick.player).length === 0 || pick.player.isProjection) {
        const projectedPlayer = freeAgents[index]
        const { id, first_name, last_name, position } = projectedPlayer
        assignPlayer(
          { id, first_name, last_name, position, isProjection: true },
          pick
        )
        index++
      }
    })
  }, [adp, scoring, teams, selectedPlayers])

  const uniquePositions = [...new Set(data.map((elem) => elem.position))]

  const replacements = []
  for (let pos of uniquePositions) {
    let replacement = freeAgents
      .filter((elem) => !selectedAndProjectedPlayers.has(elem.id))
      .find((elem) => elem.position === pos) || {
      first_name: "N/A",
      last_name: "",
      position: pos,
      adp: 999,
      fpts: 0,
    }
    replacements.push(replacement)
  }

  const freeAgentsRanked = freeAgents
    .map((elem) => {
      const replacement = replacements.find(
        (repl) => repl.position === elem.position
      )

      const freeAgent = { ...elem }
      freeAgent.gap = roundNumber(freeAgent.fpts - replacement.fpts, 1)

      if (freeAgent.adp <= nextPick.overall) {
        freeAgent.urgency = { value: 1, text: "High" }
      } else if (
        freeAgent.adp <=
        nextPick.overall + picks[nextPick.overall - 1].overall
      ) {
        freeAgent.urgency = { value: 2, text: "Medium" }
      } else {
        freeAgent.urgency = { value: 3, text: "Low" }
      }

      return freeAgent
    })
    .sort((a, b) => {
      return a.urgency.value - b.urgency.value || b.gap - a.gap
    })

  freeAgentsRanked.forEach((elem, index) => (elem.rank = index + 1))

  return (
    <>
      {modal === "settings" && (
        <Modal
          className={"w-full md:w-3/4 xl:w-1/2 h-full md:h-3/4 md:rounded-xl"}
        >
          <SettingsForm />
        </Modal>
      )}
      {modal === "setPlayer" && (
        <Modal
          className={"w-full md:w-3/4 xl:w-1/2 h-full md:h-1/2 md:rounded-xl"}
        >
          <SetPlayerForm data={freeAgents} />
        </Modal>
      )}
      {modal === "removePlayer" && (
        <Modal className={"sm:w-96 w-full rounded-xl"}>
          <RemovePlayerForm />
        </Modal>
      )}
      <main className="grid min-h-screen grid-rows-[56px_auto_50vh] bg-slate-50 dark:bg-slate-800">
        <DraftHeader />
        <DraftBoard />
        <DraftPanel
          freeAgentsRanked={freeAgentsRanked}
          currentPick={currentPick}
          nextPick={nextPick}
          picksBeforeYou={picksBeforeYou}
          replacements={replacements}
        />
      </main>
    </>
  )
}

export default Dashboard
