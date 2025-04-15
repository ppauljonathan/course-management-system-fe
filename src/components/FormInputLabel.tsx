interface FormInputLabelProps {
  name: string;
  labelName: string;
  required?: boolean;
}

function FormInputLabel({ name, labelName, required }: FormInputLabelProps) {
  return (
    <label htmlFor={name} className="flex">
      <p>{labelName}</p>
      <p className="ml-1 text-red-800 text-xl dark:text-red-400">{ required ? '*' : null }</p>
    </label>
);
}

export default FormInputLabel
