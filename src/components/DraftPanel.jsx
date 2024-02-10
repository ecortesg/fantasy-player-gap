import PanelRankings from "./PanelRankings";
import PanelRosters from "./PanelRosters";
import PanelReplacements from "./PanelReplacements";

function DraftPanel({
  freeAgentsRanked,
  currentPick,
  nextPick,
  picksBeforeYou,
  replacements,
  currentRoster,
}) {
  return (
    <section className="w-full xl:flex z-10 bg-white h-[50vh] fixed bottom-0 overflow-y-auto border-t shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
      <div className="xl:w-1/2 w-full h-full overflow-hidden p-4">
        <PanelRankings data={freeAgentsRanked} />
      </div>
      <div className="w-full xl:w-1/4 p-4 border-l rounded-tl-xl shadow-[-2px_0_6px_0_rgba(0,0,0,0.2)]">
        <PanelReplacements
          data={replacements}
          currentPick={currentPick}
          nextPick={nextPick}
          picksBeforeYou={picksBeforeYou}
        />
      </div>
      <div className="w-full xl:w-1/4 p-4 h-5/6 sm:h-full border-l rounded-tl-xl shadow-[-2px_0_6px_0_rgba(0,0,0,0.2)]">
        <PanelRosters data={currentRoster} />
      </div>
    </section>
  );
}

export default DraftPanel;
