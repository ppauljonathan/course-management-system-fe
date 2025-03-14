import LoginImage from "../assets/login-img.svg";
import FormInput from "../components/FormInput";
import FormSubmit from "../components/FormSubmit";

function handleSubmit(formData: FormData) {
  const data = Object.fromEntries(formData);

  console.log(data)
}


function ForgotPassword() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="p-5 border-2 rounded-2xl w-4xl flex items-center">
          <div className="align-middle">
            <img src={LoginImage} alt="LoginLogo" className="size-96" />
          </div>
          <div className="ml-5 w-full">
            <h1 className="text-xl font-bold w-full text-center">Forgot Password</h1>
            <form className="mt-4 space-y-3" action={handleSubmit}>
              <FormInput name="email" labelName="Email"/>

              <FormSubmit name="Request Token"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
