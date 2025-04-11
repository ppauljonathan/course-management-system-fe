import { ChangeEvent } from "react";

interface ToggleProps {
  name: string;
  labelName: string;
  required?: boolean;
  value: boolean;
  errorMessage?: string;
  onChange: (e:ChangeEvent) => void;
}


function Toggle({ name, labelName, required, value, onChange }: ToggleProps) {
  return (
    <>
      <div className="flex">
        <label htmlFor={name} className="flex">
          <p>{labelName}</p>
          <p className="ml-1 text-red-800 text-xl dark:text-red-400">{ required ? '*' : null }</p>
        </label>
        <label className="inline-flex items-center cursor-pointer ml-10">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={value}
            onChange={onChange}
            name={name}
          />
          <div
            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
          />
        </label>
      </div>
    </>
  );
}

export default Toggle;
