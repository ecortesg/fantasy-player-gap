import { arrayRange } from "../utils";

function RostersDropdown({ teams, setRoster }) {
  const teamsArray = arrayRange(1, teams, 1);
  return (
    <select
      className="border rounded shadow"
      onChange={(e) => setRoster(parseInt(e.target.value))}
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
