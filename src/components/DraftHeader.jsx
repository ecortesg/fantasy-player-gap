import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineSettings,
} from "react-icons/md";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { ADP_TEXT } from "../data/settings_data";

function DraftHeader() {
  const { teams, rounds, adp } = useDraftSettingsStore(
    (state) => state.draftSettings
  );

  const updateIsModalOpen = useDashboardSettingsStore(
    (state) => state.updateIsModalOpen
  );

  return (
    <section className="flex justify-between items-center px-4 bg-slate-50">
      <div>
        <h1 className="font-bold text-lg">Fantasy Player Gap</h1>
        <p className="font-semibold text-xs">
          {teams} Teams · {rounds} Rounds · {ADP_TEXT[adp]}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <a
          href="https://ko-fi.com/S6S8QVBNF"
          target="_blank"
          className="cursor-pointer h-12"
        >
          <img
            src="kofi-logo.png"
            alt="Buy Me a Coffee at ko-fi.com"
            className="h-full rounded-full"
          />
        </a>
        <MdOutlineDarkMode
          className="cursor-pointer rounded-full mr-1"
          size={28}
          onClick={() => changeTheme()}
        />
        {/* {theme === "dark" ? (
          <MdOutlineDarkMode
            className="cursor-pointer rounded-full"
            size={28}
            onClick={() => changeTheme()}
          />
        ) : (
          <MdOutlineLightMode
            className="cursor-pointer rounded-full"
            size={28}
            onClick={() => changeTheme()}
          />
        )} */}
        <MdOutlineSettings
          className="cursor-pointer rounded-ful"
          size={28}
          onClick={() => updateIsModalOpen(true)}
        />
      </div>
    </section>
  );
}

export default DraftHeader;
