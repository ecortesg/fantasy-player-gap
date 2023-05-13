import PanelRankings from "./PanelRankings";
import PanelRosters from "./PanelRosters";
import PanelReplacements from "./PanelReplacements";

function DraftPanel({
  freeAgentsRanked,
  selectPlayer,
  isFirstPick,
  isLastPick,
  undoPrevPick,
  nextPick,
  replacements,
  teams,
  setRoster,
  currentRoster,
}) {
  return (
    <section className="w-full lg:flex z-10 bg-white h-[50vh] fixed bottom-0 overflow-y-auto">
      <div className="lg:w-1/2 w-full md:h-full h-5/6 overflow-hidden p-5">
        <PanelRankings
          data={freeAgentsRanked}
          selectPlayer={selectPlayer}
          isFirstPick={isFirstPick}
          isLastPick={isLastPick}
          undoPrevPick={undoPrevPick}
        />
      </div>
      <div className="w-full lg:w-1/4 bg-gray-100 p-5">
        <PanelReplacements data={replacements} nextPick={nextPick} />
      </div>
      <div className="w-full lg:w-1/4 p-5">
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
