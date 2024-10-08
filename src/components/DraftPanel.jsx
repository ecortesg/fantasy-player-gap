import PanelRankings from "./PanelRankings"
import PanelRosters from "./PanelRosters"
import PanelReplacements from "./PanelReplacements"

function DraftPanel({
  freeAgentsRanked,
  currentPick,
  nextPick,
  picksBeforeYou,
  replacements,
}) {
  return (
    <section className="w-full flex flex-col xl:flex-row z-10 bg-white dark:bg-slate-700 dark:text-white h-[50vh] fixed bottom-0 overflow-y-auto  xl:shadow-[0_-2px_6px_0_rgba(0,0,0,0.4)] shadow-[0_-6px_6px_-4px_rgba(0,0,0,0.4)]">
      <div className="xl:w-1/2 p-4 min-h-[550px]">
        <PanelRankings data={freeAgentsRanked} currentPick={currentPick} />
      </div>
      <div className="xl:w-1/4 p-4 min-h-[550px] xl:rounded-tl-xl xl:shadow-[-2px_0_6px_0_rgba(0,0,0,0.4)] shadow-[0_-6px_6px_-4px_rgba(0,0,0,0.4)]">
        <PanelReplacements
          data={replacements}
          currentPick={currentPick}
          nextPick={nextPick}
          picksBeforeYou={picksBeforeYou}
        />
      </div>
      <div className="xl:w-1/4 p-4 min-h-[550px] xl:rounded-tl-xl xl:shadow-[-2px_0_6px_0_rgba(0,0,0,0.4)] shadow-[0_-6px_6px_-4px_rgba(0,0,0,0.4)]">
        <PanelRosters />
      </div>
    </section>
  )
}

export default DraftPanel
