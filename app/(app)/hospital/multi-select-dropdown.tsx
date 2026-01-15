"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

type Props = {
  label: string;
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
};

export function MultiSelectDropdown({
  label,
  options,
  values,
  onChange,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* ---------------- Close on outside click ---------------- */
  useEffect(() => {
    if (disabled) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [disabled]);

  /* ---------------- Toggle item ---------------- */
  const toggle = (item: string) => {
    if (disabled) return;
    onChange(
      values.includes(item)
        ? values.filter((v) => v !== item)
        : [...values, item]
    );
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* ================= Trigger ================= */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={clsx(
          "flex w-full items-center justify-between px-3 py-2 text-sm transition",
          "focus:outline-none",
          disabled
            ? "cursor-not-allowed opacity-30"
            : "cursor-pointer hover:border-blue-400 hover:text-blue-500"
        )}
      >
        <span className="truncate">
          {values.length === 0
            ? label
            : values.length === 1
            ? values[0]
            : `${values.length} selected`}
        </span>

        <IoIosArrowDown
          className={clsx("ml-2 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* ================= Dropdown ================= */}

      {!disabled && (
        <div
          className={clsx(
            "absolute z-50 mt-2 min-w-50 overflow-hidden rounded-md border bg-background shadow",
            "transition-all duration-200 ease-out",
            open ? "max-h-100 min-w-50 opacity-100 mx-3" : "max-h-0 opacity-0"
          )}
        >
          <ul className="max-h-100 min-w-50 overflow-auto">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => toggle(opt)}
                className="flex text-gray-500 cursor-pointer items-center gap-2 px-3 py-2 text-sm
                                 transition hover:bg-blue-500 hover:text-white min-w-35"
              >
                <input
                  type="checkbox"
                  checked={values.includes(opt)}
                  readOnly
                />
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
