import { IoMdSettings } from "react-icons/io";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { ADP_TEXT } from "../data/settings_data";

function DraftHeader() {
  const updateIsModalOpen = useDashboardSettingsStore(
    (state) => state.updateIsModalOpen
  );

  const draftSettings = useDraftSettingsStore((state) => state.draftSettings);

  return (
    <section className="flex justify-between items-center px-5 pt-5 bg-white">
      <h1 className="font-bold sm:text-base text-xs">
        FANTASY<span className="block sm:text-2xl text-base">PLAYERGAP</span>
      </h1>
      <div className="flex sm:gap-6 gap-2 text-end">
        <div>
          <p className="sm:text-2xl font-semibold">
            {draftSettings.teams} Teams · {draftSettings.rounds} Rounds
          </p>
          <p className="sm:text-base text-xs">ADP {draftSettings.adp}</p>
        </div>
        <IoMdSettings
          className="sm:text-5xl text-[40px] sm:text-[56px] cursor-pointer text-gray-400 hover:text-black"
          onClick={() => updateIsModalOpen(true)}
        />
      </div>
    </section>
  );
}

export default DraftHeader;
