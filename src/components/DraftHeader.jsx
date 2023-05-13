import { SETTINGS_TEXT } from "../data/settings_data";
import { IoMdSettings } from "react-icons/io";

function DraftHeader({ settings, onOpen }) {
  return (
    <section className="flex justify-between items-center px-5 pt-5 bg-white">
      <h1 className="font-bold sm:text-base text-xs">
        FANTASY<span className="block sm:text-2xl text-base">PLAYERGAP</span>
      </h1>
      <div className="flex sm:gap-6 gap-2 text-end">
        <div>
          <p className="sm:text-2xl font-semibold">
            {settings.teams} Teams · {settings.rounds} Rounds
          </p>
          <p className="sm:text-base text-xs">
            Scoring {SETTINGS_TEXT[settings.scoring]} · ADP{" "}
            {SETTINGS_TEXT[settings.adp]}
          </p>
        </div>
        <IoMdSettings
          className="sm:text-5xl text-[40px] sm:text-[56px] cursor-pointer text-gray-400 hover:text-black"
          onClick={onOpen}
        />
      </div>
    </section>
  );
}

export default DraftHeader;
