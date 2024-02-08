import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { arrayRange } from "../utils";

function RostersDropdown() {
  const { teams } = useDraftSettingsStore((state) => state.draftSettings);
  const updateRoster = useDashboardSettingsStore((state) => state.updateRoster);

  const teamsArray = arrayRange(1, teams, 1);

  return (
    <select
      className="border rounded shadow"
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
  );
}

export default RostersDropdown;
