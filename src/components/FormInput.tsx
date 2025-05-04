import { ChangeEvent } from "react";
import FormInputLabel from "./FormInputLabel";

interface FormInputProps {
  name: string;
  labelName: string;
  type?: 'text' |'number' | 'password';
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
        <FormInputLabel name={name} labelName={labelName} required={required} />

        <input
          type={type}
          name={name}
          id={name}
          className="border p-2 rounded w-full"
          value={value}
          onChange={onChange}
          {...(required ? { required: true } : {})}
          {...(min !== undefined ? { min: min} : {})}
          {...(max !== undefined ? { max: max } : {})}
          {...(step !== undefined ? { step: step} : {})}
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
