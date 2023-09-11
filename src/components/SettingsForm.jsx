import { useState } from "react";
import {
  GENERAL,
  PASSING,
  RUSHING,
  RECEIVING,
  DEFENSE,
  MISC,
} from "../data/settings_data";
import { IoMdClose } from "react-icons/io";
import { useDraftSettingsStore } from "../store/draftSettingsStore";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";

function SettingsForm({ handleSubmit }) {
  const updateIsModalOpen = useDashboardSettingsStore(
    (state) => state.updateIsModalOpen
  );

  const [draftSettings, updateDraftSettings] = useDraftSettingsStore(
    (state) => [state.draftSettings, state.updateDraftSettings]
  );

  const [values, setValues] = useState(draftSettings);

  function handleChange(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  function handleNestedChange(e) {
    setValues({
      ...values,
      scoring: { ...values.scoring, [e.target.id]: e.target.value },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateDraftSettings(values);
    // updateDraftState
    updateIsModalOpen(false);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex w-full h-[10%] justify-between align-middle p-4">
        <h2 className="text-2xl font-bold">New Draft</h2>
        <IoMdClose
          className="text-3xl cursor-pointer"
          onClick={() => updateIsModalOpen(false)}
        />
      </div>
      <hr />
      <form className="w-full h-[90%]" onSubmit={handleSubmit}>
        <div className="overflow-auto h-[85%] w-full p-4">
          <h3 className="font-semibold text-lg mb-4">GENERAL</h3>
          {GENERAL.map((field) => {
            return (
              <div
                key={field.id}
                className="flex w-full mb-4 justify-between items-center"
              >
                <label htmlFor={field.id}>{field.label}</label>
                <select
                  name={field.id}
                  id={field.id}
                  value={values[field.id]}
                  onChange={handleChange}
                  className="border rounded w-1/3 px-2 py-1"
                >
                  {field.options.map((option) => {
                    return (
                      <option key={option.id} value={draftSettings[option.id]}>
                        {option.text}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}
          <SettingsSection
            fields={PASSING}
            title="SCORING"
            subtitle="Passing"
            values={values}
            handleNestedChange={handleNestedChange}
          />
          <SettingsSection
            fields={RUSHING}
            subtitle="Rushing"
            values={values}
            handleNestedChange={handleNestedChange}
          />
          <SettingsSection
            fields={RECEIVING}
            subtitle="Receiving"
            values={values}
            handleNestedChange={handleNestedChange}
          />
          <SettingsSection
            fields={DEFENSE}
            subtitle="Defense"
            values={values}
            handleNestedChange={handleNestedChange}
          />
          <SettingsSection
            fields={MISC}
            subtitle="Misc"
            values={values}
            handleNestedChange={handleNestedChange}
          />
        </div>
        <div className="flex w-full h-[15%] justify-end p-4">
          <input
            className="my-auto bg-teal-500 py-2 px-4 rounded cursor-pointer text-white hover:bg-teal-400"
            type="submit"
            value="Done"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;

function SettingsSection({
  fields,
  title = null,
  subtitle = null,
  values,
  handleNestedChange,
}) {
  return (
    <div>
      {title && <h3 className="font-semibold text-lg mb-4">{title}</h3>}
      {subtitle && <h4 className="font-semibold mb-4">{subtitle}</h4>}
      {fields.map((field) => {
        return (
          <div
            key={field.id}
            className="flex w-full mb-4 justify-between items-center"
          >
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              type="number"
              step={field.step || "0.1"}
              value={values.scoring[field.id]}
              onChange={handleNestedChange}
              // onBlur={handleBlur}
              // onKeyDown={handleKeyDown}
              className="border rounded py-1 px-2 w-1/3"
            />
          </div>
        );
      })}
    </div>
  );
}
