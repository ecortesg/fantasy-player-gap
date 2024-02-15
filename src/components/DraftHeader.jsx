import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdSettings,
} from "react-icons/md";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { ADP_TEXT } from "../data/settings_data";

function DraftHeader() {
  const [teams, rounds, adp, theme, changeTheme] = useDraftSettingsStore(
    (state) => [
      state.teams,
      state.rounds,
      state.adp,
      state.theme,
      state.changeTheme,
    ]
  );

  const updateIsModalOpen = useDashboardSettingsStore(
    (state) => state.updateIsModalOpen
  );

  return (
    <section className="flex justify-between items-center px-4 bg-slate-50 dark:bg-slate-800 dark:text-white">
      <div>
        <h1 className="font-bold text-xl">Fantasy Player Gap</h1>
        <p className="font-semibold text-sm">
          {teams} Teams · {rounds} Rounds · {ADP_TEXT[adp]}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <a
          href="https://ko-fi.com/S6S8QVBNF"
          target="_blank"
          className="cursor-pointer h-14"
        >
          <img
            src="kofi-logo.png"
            alt="Buy Me a Coffee at ko-fi.com"
            className="h-full rounded-full"
          />
        </a>
        {theme === "dark" ? (
          <MdOutlineDarkMode
            className="cursor-pointer rounded-full mr-2"
            size={32}
            onClick={() => changeTheme()}
          />
        ) : (
          <MdOutlineLightMode
            className="cursor-pointer rounded-full mr-2"
            size={32}
            onClick={() => changeTheme()}
          />
        )}
        <MdSettings
          className="cursor-pointer rounded-ful"
          size={32}
          onClick={() => updateIsModalOpen(true)}
        />
      </div>
    </section>
  );
}

export default DraftHeader;
