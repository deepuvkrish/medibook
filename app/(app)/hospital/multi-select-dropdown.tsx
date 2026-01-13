"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  label: string;
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
  width?: string;
};

export function MultiSelectDropdown({
  label,
  options,
  values,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (item: string) => {
    onChange(
      values.includes(item)
        ? values.filter((v) => v !== item)
        : [...values, item]
    );
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items- justify-between rounded-md px-3 py-2 text-left bg-[#40404a] text-white cursor-pointer hover:bg-blue-400 hover:text-white w-fit md:w-35 mx-2 text-sm group"
        onClick={() => setOpen((o) => !o)}
      >
        {values.length === 0
          ? label
          : values.length === 1
          ? values[0]
          : `${values.length} selected`}
        <IoIosArrowDown className="text-gray-400 ml-1 text-sm group-hover:text-gray-200" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto bg-gray-500 border rounded-md shadow">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 hover:text-blue-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={values.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
