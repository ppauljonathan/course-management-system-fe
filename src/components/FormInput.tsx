import { ChangeEvent } from "react";

interface FormInputProps {
  name: string;
  labelName: string;
  type?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (e:ChangeEvent) => void;
  errorMessage?: string;
  min?: number;
  max?: number;
  step?: number;
}

function FormInput({
  name,
  labelName,
  required = false,
  type = "text",
  value = '',
  onChange,
  errorMessage,
  min,
  max,
  step
}: FormInputProps) {
  return (
    <>
      <div>
        <label htmlFor={name} className="flex">
          <p>{labelName}</p>
          <p className="ml-1 text-red-800 text-xl dark:text-red-400">{ required ? '*' : null }</p>
        </label>
        {
          type === 'textarea' &&
          <textarea
            name={name}
            className="border p-2 rounded w-full min-h-40"
            value={value}
            onChange={onChange}
            {...(required ? { required: true } : {})}
          ></textarea>
        }
        {
          type !== 'textarea' &&
          <input
            type={type}
            name={name}
            className="border p-2 rounded w-full"
            value={value}
            onChange={onChange}
            {...(required ? { required: true } : {})}
            {...(min !== undefined ? { min: min} : {})}
            {...(max !== undefined ? { max: max } : {})}
            {...(step !== undefined ? { step: step} : {})}
          />
        }
        {
          errorMessage &&
          <span className="text-red-800 dark:text-red-400">{errorMessage}</span>
        }
      </div>
    </>
  );
}

export default FormInput;
