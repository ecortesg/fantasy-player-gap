import { useState } from "react"
import {
  GENERAL,
  PASSING,
  RUSHING,
  RECEIVING,
  KICKING,
  DEFENSE,
  MISC,
  ROSTER,
} from "../data/settings_data"
import { IoMdClose } from "react-icons/io"
import { useDraftSettingsStore } from "../store/draftSettingsStore"
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore"
import { useDraftStore } from "../store/draftStore"

function SettingsForm({ handleSubmit }) {
  const updateIsModalOpen = useDashboardSettingsStore(
    (state) => state.updateIsModalOpen
  )

  const [settings, updateSettings] = useDraftSettingsStore((state) => [
    state,
    state.updateSettings,
  ])

  const newDraft = useDraftStore((state) => state.newDraft)

  const [values, setValues] = useState(settings)

  function handleChange(e) {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  function handleScoringChange(e) {
    setValues({
      ...values,
      scoring: { ...values.scoring, [e.target.id]: e.target.value },
    })
  }

  function handleRosterChange(e) {
    setValues({
      ...values,
      roster: { ...values.roster, [e.target.id]: e.target.value },
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateSettings(values)
    updateIsModalOpen(false)
    newDraft()
  }

  return (
    <form
      className="h-full grid grid-rows-12"
      onSubmit={handleSubmit}
      id="settings"
      name="settings"
    >
      <div className="row-span-1 flex w-full justify-between items-center p-4">
        <h2 className="text-xl font-bold">New Draft</h2>
        <IoMdClose
          className="cursor-pointer"
          size={32}
          onClick={() => updateIsModalOpen(false)}
        />
      </div>
      <div className="row-span-10 overflow-y-auto p-6 space-y-12">
        <div>
          <h3 className="font-semibold text-lg">General</h3>
          <hr className="my-4" />
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
                  className="w-40 rounded px-2 py-1 bg-slate-200 dark:bg-slate-800 border-none outline-none"
                >
                  {field.options.map((option) => {
                    return (
                      <option key={option.id} value={option.id}>
                        {option.text}
                      </option>
                    )
                  })}
                </select>
              </div>
            )
          })}
        </div>
        <div>
          <h3 className="font-semibold text-lg">Roster</h3>
          <hr className="my-4" />
          {ROSTER.map((field) => {
            return (
              <div
                key={field.id}
                className="flex w-full mb-4 justify-between items-center gap-2"
              >
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type="number"
                  step="1"
                  value={values.roster[field.id]}
                  onChange={handleRosterChange}
                  className="w-20 rounded px-2 py-1 bg-slate-200 dark:bg-slate-800 border-none outline-none"
                />
              </div>
            )
          })}
        </div>
        <div>
          <SettingsSection
            fields={PASSING}
            title="Scoring"
            subtitle="PASSING"
            values={values}
            handleScoringChange={handleScoringChange}
          />
          <SettingsSection
            fields={RUSHING}
            subtitle="RUSHING"
            values={values}
            handleScoringChange={handleScoringChange}
          />
          <SettingsSection
            fields={RECEIVING}
            subtitle="RECEIVING"
            values={values}
            handleScoringChange={handleScoringChange}
          />
          <SettingsSection
            fields={KICKING}
            subtitle="KICKING"
            values={values}
            handleScoringChange={handleScoringChange}
          />
          <SettingsSection
            fields={DEFENSE}
            subtitle="DEFENSE"
            values={values}
            handleScoringChange={handleScoringChange}
          />
          <SettingsSection
            fields={MISC}
            subtitle="MISC"
            values={values}
            handleScoringChange={handleScoringChange}
          />
        </div>
      </div>
      <div className="row-span-1 flex w-full justify-end items-center p-4">
        <input
          className="my-auto bg-blue-500 dark:bg-indigo-500 py-2 px-4 rounded cursor-pointer text-white"
          type="submit"
          value="Done"
        ></input>
      </div>
    </form>
  )
}

export default SettingsForm

function SettingsSection({
  fields,
  title = null,
  subtitle = null,
  values,
  handleScoringChange,
}) {
  return (
    <div>
      {title && <h3 className="font-semibold text-lg">{title}</h3>}
      <hr className="my-4" />
      {subtitle && <h4 className="font-bold mb-4 text-sm">{subtitle}</h4>}
      {fields.map((field) => {
        return (
          <div
            key={field.id}
            className="flex w-full mb-4 justify-between items-center gap-2"
          >
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              type="number"
              step={field.step || "0.1"}
              value={values.scoring[field.id]}
              onChange={handleScoringChange}
              className="w-20 rounded px-2 py-1 bg-slate-200 dark:bg-slate-800 border-none outline-none"
            />
          </div>
        )
      })}
    </div>
  )
}
