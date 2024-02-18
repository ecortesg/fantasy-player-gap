import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "./Table";

function PanelReplacements({ data, currentPick, nextPick, picksBeforeYou }) {
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
        id: "player",
        header: "Player",
        size: 200,
      }),
      columnHelper.accessor("position", {
        header: "Position",
        size: 100,
      }),
      columnHelper.accessor("adp", {
        header: "ADP",
        size: 100,
      }),
      columnHelper.accessor("fpts", {
        header: "FPts",
        size: 100,
      }),
    ],
    []
  );

  return (
    <div className="h-full flex flex-col">
      <h2 className="h-1/6 text-lg font-semibold text-center md:text-left">
        REPLACEMENTS
      </h2>
      <div className="overflow-x-auto">
        <Table columns={columns} data={data} />
      </div>
      <div className="flex-1 flex justify-around items-center">
        <div className="text-center">
          <p className="font-semibold text-xl">
            {currentPick.round}.{currentPick.number} ({currentPick.overall})
          </p>
          <p className="text-sm">Current Pick</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl">
            {nextPick.round}.{nextPick.number} ({nextPick.overall})
          </p>
          <p className="text-sm">Next Pick</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl">{picksBeforeYou}</p>
          <p className="text-sm">Before You</p>
        </div>
      </div>
    </div>
  );
}

export default PanelReplacements;
