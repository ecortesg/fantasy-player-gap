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
    <section className="w-full flex flex-col xl:flex-row z-10 bg-white dark:bg-slate-700 dark:text-white h-[50vh] fixed bottom-0 overflow-y-auto  shadow-[0_-2px_6px_0_rgba(0,0,0,0.4)]">
      <div className="xl:w-1/2 p-4 md:min-h-full min-h-screen">
        <PanelRankings data={freeAgentsRanked} />
      </div>
      <div className="xl:w-1/4 p-4 min-h-[400px]  xl:rounded-tl-xl shadow-[-2px_0_6px_0_rgba(0,0,0,0.4)]">
        <PanelReplacements
          data={replacements}
          currentPick={currentPick}
          nextPick={nextPick}
          picksBeforeYou={picksBeforeYou}
        />
      </div>
      <div className="xl:w-1/4 p-4 min-h-[400px]  xl:rounded-tl-xl shadow-[-2px_0_6px_0_rgba(0,0,0,0.4)]">
        <PanelRosters data={currentRoster} />
      </div>
    </section>
  );
}

export default DraftPanel;
