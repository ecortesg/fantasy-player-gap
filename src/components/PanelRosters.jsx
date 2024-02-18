import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { arrayRange } from "../utils";
import Table from "./Table";

function PanelRosters({ data }) {
  const teams = useDraftSettingsStore((state) => state.teams);
  const updateRoster = useDashboardSettingsStore((state) => state.updateRoster);

  const teamsArray = arrayRange(1, teams, 1);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => `${row.player.first_name} ${row.player.last_name}`,
        {
          header: "Player",
          size: 200,
        }
      ),
      columnHelper.accessor((row) => row.player.position, {
        header: "Position",
        size: 100,
      }),
      columnHelper.accessor((row) => `${row.round}.${row.number}`, {
        header: "Pick",
        size: 100,
      }),
    ],
    []
  );

  return (
    <div className="h-full">
      <div className="h-1/6 flex flex-col">
        <h2 className="text-lg font-semibold text-center md:text-left">
          ROSTER
        </h2>
        <div className="flex flex-1 items-center justify-center ">
          <select
            className="rounded bg-slate-200 dark:bg-slate-800 border-none outline-none px-2 py-1"
            onChange={(e) => updateRoster(parseInt(e.target.value))}
          >
            {teamsArray.map((tm) => {
              return (
                <option key={tm} value={tm}>
                  Team {tm}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="h-5/6 overflow-x-auto">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default PanelRosters;
