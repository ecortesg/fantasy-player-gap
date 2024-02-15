import { useEffect } from "react";
import { roundNumber } from "../utils";
import DraftHeader from "./DraftHeader";
import DraftBoard from "./DraftBoard";
import DraftPanel from "./DraftPanel";
import SettingsForm from "./SettingsForm";
import SettingsModal from "./SettingsModal";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { useDraftStore } from "../store/draftStore";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";

function Dashboard({ data }) {
  const [counter, picks, assignPlayer, removePlayer, selectedPlayers] =
    useDraftStore((state) => [
      state.counter,
      state.picks,
      state.assignPlayer,
      state.removePlayer,
      state.selectedPlayers,
    ]);
  const [adp, scoring, teams] = useDraftSettingsStore((state) => [
    state.adp,
    state.scoring,
    state.teams,
  ]);
  const roster = useDashboardSettingsStore((state) => state.roster);

  const selectedAndProjectedPlayers = new Set(
    picks
      .map((pick) => pick.player?.id)
      .filter((playerId) => playerId !== undefined)
  );

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
            return total + scoring[key] * (elem.stats[key] || 0);
          }, 0),
          2
        ),
      };
    })
    .filter((elem) => elem.adp < 999 || elem.fpts > 0)
    .filter((elem) => !selectedPlayers.includes(elem.id))
    .sort((a, b) => {
      return a.adp - b.adp || b.fpts - a.fpts;
    });

  const currentPick = picks[counter];
  const nextPick = picks
    .slice(counter + 2) // 2 because we want to ignore the pick at the turn
    .find((elem) => currentPick.team === elem.team);
  const picksBeforeYou = nextPick.overall - currentPick.overall;
  const picksInBewteen = picks.slice(counter, counter + picksBeforeYou);

  useEffect(() => {
    picks.slice(counter).forEach((pick) => {
      removePlayer(pick.overall - 1);
    });

    picksInBewteen.forEach((pick, index) => {
      const projectedPlayer = freeAgents[index];
      const { id, first_name, last_name, position } = projectedPlayer;
      assignPlayer(
        { id, first_name, last_name, position, isProjection: true },
        pick.overall - 1
      );
    });
  }, [counter, adp, scoring, teams]);

  const uniquePositions = [...new Set(data.map((elem) => elem.position))];

  const replacements = [];
  for (let pos of uniquePositions) {
    let replacement = freeAgents
      .filter((elem) => !selectedAndProjectedPlayers.has(elem.id))
      .find((elem) => elem.position === pos) || {
      first_name: "N/A",
      last_name: "",
      position: pos,
      adp: 999,
      fpts: 0,
    };
    replacements.push(replacement);
  }

  const currentRoster = picks.filter(
    (elem) =>
      elem.team === roster &&
      !elem.player.isProjection &&
      Object.keys(elem.player).length > 0
  );

  const freeAgentsRanked = freeAgents
    .map((elem) => {
      const replacement = replacements.find(
        (repl) => repl.position === elem.position
      );

      const freeAgent = { ...elem };
      freeAgent.gap = roundNumber(freeAgent.fpts - replacement.fpts, 1);

      if (freeAgent.adp <= nextPick.overall) {
        freeAgent.urgency = { value: 1, text: "High" };
      } else if (
        freeAgent.adp <=
        nextPick.overall + picks[nextPick.overall - 1].overall
      ) {
        freeAgent.urgency = { value: 2, text: "Medium" };
      } else {
        freeAgent.urgency = { value: 3, text: "Low" };
      }

      return freeAgent;
    })
    .sort((a, b) => {
      return a.urgency.value - b.urgency.value || b.gap - a.gap;
    });

  freeAgentsRanked.forEach((elem, index) => (elem.rank = index + 1));

  return (
    <>
      <SettingsModal>
        <SettingsForm />
      </SettingsModal>
      <main className="grid min-h-screen grid-rows-[56px_auto_50vh]">
        <DraftHeader />
        <DraftBoard />
        <DraftPanel
          freeAgentsRanked={freeAgentsRanked}
          currentPick={currentPick}
          nextPick={nextPick}
          picksBeforeYou={picksBeforeYou}
          replacements={replacements}
          currentRoster={currentRoster}
        />
      </main>
    </>
  );
}

export default Dashboard;
