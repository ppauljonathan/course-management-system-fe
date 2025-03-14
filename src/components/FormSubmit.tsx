interface FormSubmitProps {
  name: string;
}

function FormSubmit({ name }: FormSubmitProps) {
  return (
    <>
      <div className="flex justify-center">
        <button
          className="bg-blue-800 text-white px-4 py-2 rounded m-a hover:bg-blue-950 cursor-pointer"
        >
          {name}
        </button>
      </div>
    </>
  );
}

export default FormSubmit;
