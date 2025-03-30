import { FormEvent, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router";

import LoginImage from "../assets/login-img.svg";
import FormInput from "../components/FormInput";
import FormSubmit from "../components/FormSubmit";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import sendGraphqlRequest from "../utils/graphqlHandler";
import resetPassword from "../queries/resetPassword";
import UserWithJWTInterface from "../interfaces/graphql/users/userWithJWTInterface";
import useToast from "../hooks/useToast";

interface ResetPasswordResponse {
  data: { resetPassword: UserWithJWTInterface };
  errors: [ErrorInterface];
}

function ResetPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formState, setFormState] = useState({
    token: '',
    password: '',
    password_confirmation: ''
  });
  const [errorMessages, setErrorMessages] = useState({
    token: '',
    password: '',
    password_confirmation: ''
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
      token: "",
      password: "",
      password_confirmation: "",
    });
  }

  function handleGraphqlResponse({ data, errors }: ResetPasswordResponse) {
     if(errors && errors.length > 0) {
      showToast(errors.join(', '), 'error');
      return;
    }

    const { jwt, errors: userErrors } = data.resetPassword;

    if (userErrors.length > 0) {
      assignErrorMessages(userErrors);
      return;
    }

    localStorage.setItem("accessToken", jwt);
    showToast('Password Reset Successfully', 'success');
    navigate('/');

  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetErrorMessages();
    sendGraphqlRequest(resetPassword, { input: formState }, handleGraphqlResponse, showToast);
  }

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="p-5 border-2 rounded-2xl w-4xl flex items-center">
          <div className="align-middle">
            <img src={LoginImage} alt="LoginLogo" className="size-96" />
          </div>
          <div className="ml-5 w-full">
            <h1 className="text-xl font-bold w-full text-center">Reset Password</h1>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <FormInput
                name="token"
                labelName="Token"
                required={true}
                value={formState.token}
                onChange={updateFormState}
                errorMessage={errorMessages.token}
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

              <FormSubmit name="Reset Password"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
