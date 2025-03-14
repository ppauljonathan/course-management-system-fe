import LoginImage from "../assets/login-img.svg";
import FormInput from "../components/FormInput";
import FormSubmit from "../components/FormSubmit";

function handleSubmit(formData: FormData) {
  const data = Object.fromEntries(formData);

  console.log(data)
}


function ResetPassword() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="p-5 border-2 rounded-2xl w-4xl flex items-center">
          <div className="align-middle">
            <img src={LoginImage} alt="LoginLogo" className="size-96" />
          </div>
          <div className="ml-5 w-full">
            <h1 className="text-xl font-bold w-full text-center">Reset Password</h1>
            <form className="mt-4 space-y-3" action={handleSubmit}>
              <FormInput name="token" labelName="Token" required={true} />
              <FormInput name="password" labelName="Password" type="password" required={true} />
              <FormInput name="password_confirmation" labelName="Password Confirmation" type="password" required={true} />

              <FormSubmit name="Reset Password"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
