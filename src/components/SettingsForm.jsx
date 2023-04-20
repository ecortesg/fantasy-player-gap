import { SETTINGS_TEXT } from "../data/settings_data";
import { IoMdClose } from "react-icons/io";

const SETTINGS = [
  {
    id: "scoring",
    label: "Scoring",
    options: ["std", "half_ppr", "ppr"],
  },
  {
    id: "adp",
    label: "ADP",
    options: [
      "std",
      "half_ppr",
      "ppr",
      "2qb",
      "dynasty_std",
      "dynasty_half_ppr",
      "dynasty_ppr",
      "dynasty_2qb",
    ],
  },
  {
    id: "teams",
    label: "Teams",
    options: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
  },
  {
    id: "rounds",
    label: "Rounds",
    options: [13, 14, 15, 16],
  },
];

function SettingsForm({ settings, handleSubmit, onClose }) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-end">
        <IoMdClose className="text-3xl cursor-pointer" onClick={onClose} />
      </div>
      <h2 className="text-2xl font-bold">Draft Settings</h2>
      <hr className="my-2" />
      <form className="" onSubmit={handleSubmit}>
        {SETTINGS.map((field) => {
          return (
            <div key={field.id} className="flex w-full my-6 jusify-between">
              <label className="font-semibold w-1/2 m-auto" htmlFor={field.id}>
                {field.label}
              </label>
              <select
                name={field.id}
                id={field.id}
                defaultValue={settings[field.id]}
                className="border rounded w-1/2 px-2 py-1"
              >
                {field.options.map((option) => {
                  return (
                    <option key={option} value={option}>
                      {SETTINGS_TEXT[option] || option}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
        <div className="flex w-full justify-end">
          <input
            className="bg-teal-500 py-2 px-4 rounded cursor-pointer text-white hover:bg-teal-400"
            type="submit"
            value="Save"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;
