import PanelRankings from "./PanelRankings";
import PanelRosters from "./PanelRosters";
import PanelReplacements from "./PanelReplacements";

function DraftPanel({
  freeAgentsRanked,
  selectPlayer,
  isFirstPick,
  isLastPick,
  undoPrevPick,
  currentPick,
  nextPick,
  picksInBetween,
  replacements,
  teams,
  setRoster,
  currentRoster,
}) {
  return (
    <section className="w-full xl:flex z-10 bg-white h-[50vh] fixed bottom-0 overflow-y-auto">
      <div className="xl:w-1/2 w-full md:h-full h-5/6 overflow-hidden p-5">
        <PanelRankings
          data={freeAgentsRanked}
          selectPlayer={selectPlayer}
          isFirstPick={isFirstPick}
          isLastPick={isLastPick}
          undoPrevPick={undoPrevPick}
        />
      </div>
      <div className="w-full xl:w-1/4 bg-gray-100 p-5">
        <PanelReplacements
          data={replacements}
          currentPick={currentPick}
          nextPick={nextPick}
          picksInBetween={picksInBetween}
        />
      </div>
      <div className="w-full xl:w-1/4 p-5">
        <PanelRosters
          data={currentRoster}
          teams={teams}
          setRoster={setRoster}
        />
      </div>
    </section>
  );
}

export default DraftPanel;
