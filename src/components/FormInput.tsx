interface FormInputProps {
  name: string;
  labelName: string;
  type?: string;
}

function FormInput({ name, labelName, type = "text" }: FormInputProps) {
  return (
    <>
      <div>
        <label htmlFor={name} className="block">
          {labelName}
        </label>
        <input type={type} name={name} className="border p-2 rounded w-full" />
      </div>
    </>
  );
}

export default FormInput;
