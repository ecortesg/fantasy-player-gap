import { useState } from "react";
import { arrayRange, roundNumber } from "../utils";
import DraftHeader from "./DraftHeader";
import DraftBoard from "./DraftBoard";
import DraftPanel from "./DraftPanel";
import SettingsForm from "./SettingsForm";
import SettingsModal from "./SettingsModal";
import useLocalStorage from "../hooks/useLocalStorage";
import { useDraftSettingsStore } from "../store/draftSettingsStore";

function Dashboard({ data }) {
  const draftSettings = useDraftSettingsStore((state) => state.draftSettings);

  const [roster, setRoster] = useState(1);
  const [draftState, setDraftState] = useLocalStorage(
    "draftState",
    draftObject(draftSettings, data)
  );

  const { counter, picks, freeAgents } = draftState;
  const { teams, rounds } = draftSettings;

  const isFirstPick = counter === 0;
  const isLastPick = counter === teams * rounds;
  const prevPick = picks[counter - 1] || {
    player: { first_name: "", last_name: "", position: "" },
  };
  const uniquePositions = [...new Set(data.map((elem) => elem.position))];

  const currentPick = picks[counter];
  const nextPick = picks
    .slice(counter + 2) // 2 because we want to ignore the pick at the turn
    .find((elem) => currentPick.team === elem.team);
  const picksInBetween = nextPick.overall - currentPick.overall;

  const replacements = [];
  for (let pos of uniquePositions) {
    let replacement = freeAgents
      .slice(picksInBetween)
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
    (elem) => elem.team === roster && Object.keys(elem.player).length > 0
  );

  function selectPlayer(playerId) {
    const selectedPlayer = freeAgents.find((player) => player.id === playerId);
    setDraftState({
      ...draftState,
      picks: [
        ...picks.slice(0, counter),
        {
          ...picks[counter],
          player: selectedPlayer,
        },
        ...picks.slice(counter + 1),
      ],
      freeAgents: freeAgents.filter((player) => player.id !== playerId),
      counter: counter + 1,
    });
  }

  function undoPrevPick() {
    const selectedPlayer = prevPick.player;
    setDraftState({
      ...draftState,
      picks: [
        ...picks.slice(0, counter - 1),
        {
          ...picks[counter - 1],
          player: {},
        },
        ...picks.slice(counter),
      ],
      freeAgents: [...freeAgents, selectedPlayer],
      counter: counter - 1,
    });
  }

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
      <main className="grid min-h-screen grid-rows-[80px_auto_50vh]">
        <DraftHeader />
        <DraftBoard data={picks} teams={teams} rounds={rounds} />
        <DraftPanel
          freeAgentsRanked={freeAgentsRanked}
          selectPlayer={selectPlayer}
          isFirstPick={isFirstPick}
          isLastPick={isLastPick}
          undoPrevPick={undoPrevPick}
          currentPick={currentPick}
          nextPick={nextPick}
          picksInBetween={picksInBetween}
          replacements={replacements}
          teams={teams}
          setRoster={setRoster}
          currentRoster={currentRoster}
        />
      </main>
    </>
  );
}

export default Dashboard;

function draftPicks(teams, rounds) {
  const picks = [];
  let ov = 1;
  for (let i = 1; i <= rounds + 2; i++) {
    let order;
    if (i % 2 === 1) {
      order = arrayRange(1, teams, 1);
    } else {
      order = arrayRange(1, teams, 1).reverse();
    }
    for (let j of order) {
      let pick = {};
      pick.overall = ov;
      pick.round = i;
      pick.number = order[j - 1];
      pick.team = j;
      pick.player = {};
      picks.push(pick);
      ov++;
    }
  }
  return picks;
}

function draftObject(draftSettings, data) {
  const { scoring, adp, teams, rounds } = draftSettings;
  const counter = 0;
  const picks = draftPicks(teams, rounds);
  const freeAgents = data
    .map((elem) => {
      return {
        id: elem.id,
        first_name: elem.first_name,
        last_name: elem.last_name,
        position: elem.position,
        adp: elem.stats[`adp_${adp}`] || 999,
        fpts: Object.keys(scoring).reduce((total, key) => {
          return total + scoring[key] * (elem.stats[key] || 0);
        }, 0),
      };
    })
    .filter((elem) => elem.adp < 999 || elem.fpts > 0)
    .sort((a, b) => {
      return a.adp - b.adp || b.fpts - a.fpts;
    });

  return {
    counter,
    picks,
    freeAgents,
  };
}
