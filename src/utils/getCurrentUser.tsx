import me from "../queries/me";
import sendGraphqlRequest from "./graphqlHandler";
import UserInterface from "../interfaces/graphql/users/userInterface";

interface MeResponse {
  data: { me: UserInterface }
}

async function getCurrentUser() {
  const response = await new Promise((res: (data: MeResponse) => void) => {
    sendGraphqlRequest<MeResponse>(me, {}, (data) => res(data))
  })

  const currentUser = response.data.me
  if(currentUser) { return currentUser; }

  localStorage.removeItem('accessToken');
}

export default getCurrentUser
