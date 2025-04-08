import { Link, useNavigate } from "react-router";
import { FormEvent, useState, ChangeEvent } from "react";

import LoginImage from "../assets/login-img.svg";
import FormInput from "../components/FormInput";
import FormSubmit from "../components/FormSubmit";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import sendGraphqlRequest from "../utils/graphqlHandler";
import login from "../queries/login";
import UserWithJWTInterface from "../interfaces/graphql/users/userWithJWTInterface";
import useToast from "../hooks/useToast";

interface LoginResponse {
  data: { login: UserWithJWTInterface };
  errors: [ErrorInterface];
}

function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  function updateFormState(e: ChangeEvent) {
    setFormState((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  }

  function assignErrorMessages(errors: [ErrorInterface]) {
    errors.forEach((error) => {
      setErrorMessages((prev) => ({
        ...prev,
        [error.location]: error.message,
      }));
    });
  }

  function resetErrorMessages() {
    setErrorMessages({
      email: "",
      password: "",
    });
  }

  function handleGraphqlResponse({ data, errors }: LoginResponse) {
    if (errors && errors.length > 0) {
      showToast(errors.map(e => e.message).join(', '), 'error');
      return;
    }

    const { jwt, errors: userErrors } = data.login;

    if (userErrors.length > 0) {
      assignErrorMessages(userErrors);
      return;
    }

    localStorage.setItem("accessToken", jwt);
    showToast('Login Successful', 'success');
    navigate("/");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetErrorMessages();
    sendGraphqlRequest(login, { input: formState }, handleGraphqlResponse, showToast);
  }

  return (
    <>
      <div className="flex items-center justify-center h-full self-center">
        <div className="p-5 border-2 rounded-2xl w-4xl flex items-center">
          <div className="align-middle">
            <img src={LoginImage} alt="LoginLogo" className="size-96" />
          </div>
          <div className="ml-5 w-full">
            <h1 className="text-xl font-bold w-full text-center">Login</h1>
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
                name="password"
                labelName="Password"
                type="password"
                required={true}
                value={formState.password}
                onChange={updateFormState}
                errorMessage={errorMessages.password}
              />

              <FormSubmit name="Log In" />

              <div className="w-full items-center">
                <p className="align-middle mt-4 w-full text-center">
                  Don't have an Account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 underline hover:text-blue-800"
                  >
                    Sign Up.
                  </Link>
                </p>
                <p className="align-middle mt-4 w-full text-center">
                  <Link
                    to="/forgot-password"
                    className="text-blue-500 underline hover:text-blue-800"
                  >
                    Forgot Password?
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

export default Login;
