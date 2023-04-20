import { arrayRange } from "../utils";
import BoardCard from "./BoardCard";
import { useEffect } from "react";

function DraftBoard({ data, teams, rounds, scoring, adp, onOpen }) {
  const teamsArray = arrayRange(0, teams - 1, 1);
  const roundsArray = arrayRange(0, rounds - 1, 1);

  useEffect(() => {
    const headerClone = document.getElementById("board-header-clone");

    window.onscroll = () => {
      let scroll = window.scrollY;
      headerClone.style.transform = `translateY(${scroll}px)`;
      if (scroll > 4 * 20) {
        //20 * 4 comes from the -top-20 class in header clone
        headerClone.style.opacity = 1;
      } else {
        headerClone.style.opacity = 0;
      }
    };
  }, []);

  return (
    <div className="overflow-x-auto flex">
      <div className="min-w-screen m-auto relative">
        <div
          id="board-header-clone"
          className="flex mx-2 gap-2 bg-white z-10 absolute -top-20"
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
        <div id="board-header" className="flex mx-2 gap-2 bg-white">
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
                      <BoardCard pick={data[teams * rd + tm]} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DraftBoard;
