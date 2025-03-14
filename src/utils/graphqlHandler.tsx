import axios from "axios";

function sendGraphqlRequest<T>(
  query: string,
  variables: object,
  callback: (data: T) => void
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
        console.log("error occurred on server", status);
        return;
      }

      callback(data);
    })
    .catch((err) => {
      console.log("error occurred on server", err);
    });
}

export default sendGraphqlRequest
