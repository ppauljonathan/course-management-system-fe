import { Link } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";

import LoginImage from "../assets/login-img.svg";
import FormInput from "../components/FormInput";
import FormSubmit from "../components/FormSubmit";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import UserWithResetTokenInterface from "../interfaces/graphql/users/userWithResetTokenInterface";
import sendGraphqlRequest from "../utils/graphqlHandler";
import requestPasswordReset from "../queries/requestPasswordReset";

interface ForgotPasswordResponse {
  data: { requestPasswordReset: UserWithResetTokenInterface };
  errors: [ErrorInterface];
}

function ForgotPassword() {
  const [formState, setFormState] = useState({
    email: ''
  });
  const [errorMessages, setErrorMessages] = useState({
    email: ''
  });
  const [resetToken, setResetToken] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

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
      email: ''
    });
  }

  function handleGraphqlResponse({ data, errors }: ForgotPasswordResponse) {
    if(errors && errors.length > 0) {
      console.log(errors);
      return;
    }

    const { token, expires_at, errors: userErrors } = data.requestPasswordReset;

    if (userErrors.length > 0) {
      assignErrorMessages(userErrors);
      return;
    }

    if(!(token && expires_at)) {
      assignErrorMessages([{
        location: 'email',
        message: 'Token or Expiry date not set',
        code: '500'
      }]);
      return;
    }

    const formattedExpiryDate = new Date(Number(expires_at)).toLocaleString();

    setResetToken(token);
    setExpiryDate(formattedExpiryDate);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetErrorMessages();
    sendGraphqlRequest(requestPasswordReset, { input: formState }, handleGraphqlResponse);
  }


  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="p-5 border-2 rounded-2xl w-4xl flex items-center">
          <div className="align-middle">
            <img src={LoginImage} alt="LoginLogo" className="size-96" />
          </div>
          <div className="ml-5 w-full">
            {
              resetToken &&
              expiryDate &&
              <div className="text-center bg-red-200 rounded-2xl p-5 text-lg mb-5">
                Your Reset Token is:<br/>
                <b>{resetToken}</b>
                <br/>
                Please go to the
                <Link to="/reset-password" className="text-blue-800 underline-offset-1 underline" > Reset Password Page </Link>
                and paste the token there
                <br />
                <i>Your token will expire at: {expiryDate} </i>
              </div>
            }
            <h1 className="text-xl font-bold w-full text-center">Forgot Password</h1>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <FormInput
                name="email"
                labelName="Email"
                required={true}
                value={formState.email}
                onChange={updateFormState}
                errorMessage={errorMessages.email}
              />

              <FormSubmit name="Request Token"/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
