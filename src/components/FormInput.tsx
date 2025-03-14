import { ChangeEvent } from "react";

interface FormInputProps {
  name: string;
  labelName: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (e:ChangeEvent) => void;
  errorMessage?: string
}

function FormInput({
  name,
  labelName,
  required = false,
  type = "text",
  value = '',
  onChange,
  errorMessage
}: FormInputProps) {
  return (
    <>
      <div>
        <label htmlFor={name} className="flex">
          <p>{labelName}</p>
          <p className="ml-1 text-red-800 text-xl dark:text-red-400">{ required ? '*' : null }</p>
        </label>
        <input
          type={type}
          name={name}
          className="border p-2 rounded w-full"
          value={value}
          onChange={onChange}
          {...(required ? { required: true } : {})}
        />
        {
          errorMessage &&
          <span className="text-red-800 dark:text-red-400">{errorMessage}</span>
        }
      </div>
    </>
  );
}

export default FormInput;
