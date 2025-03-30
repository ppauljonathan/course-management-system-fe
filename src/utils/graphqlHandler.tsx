import axios from "axios";

import { ToastType } from "../utils/types";

function sendGraphqlRequest<T>(
  query: string,
  variables: object,
  callback: (data: T) => void,
  showToast: (message: string, type?: ToastType, duration?: number) => void
) {
  const jwt = localStorage.getItem("accessToken");
  const headers:Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if(jwt) { headers['Authorization'] = `Bearer ${jwt}` }

  axios
    .post(
      `${import.meta.env.VITE_APP_BASE_URL}/graphql`,
      { query, variables },
      { headers }
    )
    .then(({ data, status }) => {
      if (status !== 200) {
        showToast(
          `an errror occurred on the server, CODE: ${status}`,
          'error'
        );
        console.log("error occurred on server", status);
        return;
      }

      callback(data);
    })
    .catch((err) => {
      showToast(
        `an errror occurred on the server, ${err.message}`,
        'error'
      );
      console.log("error occurred on server", err);
    });
}

export default sendGraphqlRequest
