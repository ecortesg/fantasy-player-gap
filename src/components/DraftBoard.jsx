import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { useDraftStore } from "../store/draftStore";
import { arrayRange } from "../utils";
import { useEffect } from "react";

function DraftBoard() {
  const { teams, rounds } = useDraftSettingsStore(
    (state) => state.draftSettings
  );
  const picks = useDraftStore((state) => state.picks);

  const teamsArray = arrayRange(0, teams - 1, 1);
  const roundsArray = arrayRange(0, rounds - 1, 1);

  useEffect(() => {
    const headerClone = document.getElementById("board-header-clone");

    window.onscroll = () => {
      let scroll = window.scrollY;
      headerClone.style.transform = `translateY(${scroll}px)`;
      if (scroll > 4 * 14) {
        //20 * 4 comes from the "-top-20" class in header clone
        headerClone.style.opacity = 1;
      } else {
        headerClone.style.opacity = 0;
      }
    };
  }, []);

  return (
    <section className="overflow-x-auto flex bg-slate-50">
      <div className="min-w-screen m-auto relative">
        <div
          id="board-header-clone"
          className="flex mx-2 gap-2 bg-slate-50 z-10 absolute -top-14"
        >
          {teamsArray.map((tm) => {
            return (
              <div
                key={tm}
                className="w-36 h-16 flex justify-center items-center"
              >
                <p>Team {tm + 1}</p>
              </div>
            );
          })}
        </div>
        <div id="board-header" className="flex mx-2 gap-2 bg-slate-50">
          {teamsArray.map((tm) => {
            return (
              <div
                key={tm}
                className="w-36 h-14 flex justify-center items-center"
              >
                <p>Team {tm + 1}</p>
              </div>
            );
          })}
        </div>
        <div id="board-body" className="">
          {roundsArray.map((rd) => {
            return (
              <div
                key={rd}
                className={`flex mx-2 gap-2 ${
                  rd % 2 === 1 ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {teamsArray.map((tm) => {
                  return (
                    <div key={tm} className="mb-2">
                      <BoardCard pick={picks[teams * rd + tm]} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DraftBoard;

function BoardCard({ pick }) {
  const colors = {
    QB: "bg-qb",
    RB: "bg-rb",
    WR: "bg-wr",
    TE: "bg-te",
    K: "bg-k",
    DEF: "bg-def",
  };

  return (
    <div
      className={`px-2 w-36 h-16 text-sm ${
        colors[pick.player.position] || "bg-slate-300"
      } ${
        pick.player.isProjection ? "bg-opacity-40 opacity-50" : "bg-opacity-50"
      } rounded-lg relative text-sm`}
    >
      <p className="absolute top-0 right-2">
        {pick.round}.{pick.number}
      </p>
      <p>{pick.player.first_name}</p>
      <p>{pick.player.last_name}</p>
      <p>{pick.player.position}</p>
    </div>
  );
}
