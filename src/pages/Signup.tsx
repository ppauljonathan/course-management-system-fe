import { Link, useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";

import LoginImage from "../assets/login-img.svg";
import FormInput from "../components/FormInput";
import FormSubmit from "../components/FormSubmit";
import signup from "../queries/signup";
import sendGraphqlRequest from "../utils/graphqlHandler";
import UserWithJWTInterface from "../interfaces/graphql/users/userWithJWTInterface";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";

interface SignupResponse {
  data: { signup: UserWithJWTInterface };
  errors?: [ErrorInterface];
}

function Signup() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });

  function updateFormState(e: ChangeEvent) {
    setFormState((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    }));
  }

  function assignErrorMessages(errors: [ErrorInterface]) {
    errors.forEach((error) => {
      setErrorMessages((prev) => ({
        ...prev,
        [error.location]: error.message
      }))
    })
  }

  function resetErrorMessages() {
    setErrorMessages({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
    });
  }

  function handleGraphqlResponse ({ data, errors }: SignupResponse) {
    if(errors && errors.length > 0) {
      console.log(errors);
      return;
    }

    const { jwt, errors: userErrors } = data.signup;

    if (userErrors.length > 0) {
      assignErrorMessages(userErrors);
      return;
    }

    localStorage.setItem("accessToken", jwt);
    navigate('/');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetErrorMessages();
    sendGraphqlRequest(signup, { input: formState }, handleGraphqlResponse);
  }

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="p-5 border-2 rounded-2xl w-4xl flex items-center">
          <div className="align-middle">
            <img src={LoginImage} alt="LoginLogo" className="size-96" />
          </div>
          <div className="ml-5 w-full">
            <h1 className="text-xl font-bold w-full text-center">Signup</h1>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <FormInput
                name="email"
                labelName="Email"
                required={true}
                value={formState.email}
                onChange={updateFormState}
                errorMessage={errorMessages.email}
              />
              <FormInput
                name="first_name"
                labelName="First Name"
                required={true}
                value={formState.first_name}
                onChange={updateFormState}
                errorMessage={errorMessages.first_name}
              />
              <FormInput
                name="last_name"
                labelName="Last Name"
                value={formState.last_name}
                onChange={updateFormState}
                errorMessage={errorMessages.last_name}
              />
              <FormInput
                name="password"
                labelName="Password"
                type="password"
                required={true}
                value={formState.password}
                onChange={updateFormState}
                errorMessage={errorMessages.password}
              />
              <FormInput
                name="password_confirmation"
                labelName="Password Confirmation"
                type="password"
                required={true}
                value={formState.password_confirmation}
                onChange={updateFormState}
                errorMessage={errorMessages.password_confirmation}
              />

              <FormSubmit name="Sign Up" />

              <div className="w-full items-center">
                <p className="align-middle mt-4 w-full text-center">
                  Already have an Account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 underline hover:text-blue-800"
                  >
                    Log In.
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
