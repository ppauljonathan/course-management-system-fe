import sendGraphqlRequest from "./graphqlHandler";
import me from "../queries/me";
import UserInterface from "../interfaces/graphql/users/userInterface";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";

async function isAuthenticated(): Promise<boolean> {
  const jwt = localStorage.getItem("accessToken");
  if (!jwt) return false;

  try {
    const { data, errors } = await new Promise<{ data?: { me?: UserInterface }; errors?: ErrorInterface[] }>(
      (resolve) => {
        sendGraphqlRequest(me, {}, resolve);
      }
    );

    if (errors?.length) return false;
    if (!data?.me) return false;

    return true;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
}

export default isAuthenticated;
