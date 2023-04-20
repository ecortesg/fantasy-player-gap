import { useState, useEffect } from "react";

function RankingsPlayerFilter({ column, onChange, debounce = 500 }) {
  const columnFilterValue = column.getFilterValue() ?? "";
  const [value, setValue] = useState(columnFilterValue);

  useEffect(() => {
    setValue(columnFilterValue);
  }, [columnFilterValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      className="border md:w-1/3 rounded-lg px-2 my-auto shadow"
      type="text"
      placeholder="Find player"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default RankingsPlayerFilter;
