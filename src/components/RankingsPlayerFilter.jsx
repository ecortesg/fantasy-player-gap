import { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";

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
    <div className="relative">
      <input
        className="border rounded pl-2 pr-8 py-1 bg-slate-200 border-none outline-none"
        type="text"
        placeholder="Find player"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== "" && (
        <VscClose
          className="absolute right-1 top-[3px] h-7 w-7 rounded-full cursor-pointer"
          onClick={() => setValue("")}
        />
      )}
    </div>
  );
}

export default RankingsPlayerFilter;
