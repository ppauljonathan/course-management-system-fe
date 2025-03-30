import me from "../queries/me";
import sendGraphqlRequest from "./graphqlHandler";
import UserInterface from "../interfaces/graphql/users/userInterface";
import { ToastType } from "./types";

interface MeResponse {
  data: { me: UserInterface }
}

async function getCurrentUser(showToast: (message: string, type?: ToastType, duration?: number) => void) {
  const response = await new Promise((res: (data: MeResponse) => void) => {
    sendGraphqlRequest<MeResponse>(me, {}, (data) => res(data), showToast)
  })

  const currentUser = response.data.me
  if(currentUser) { return currentUser; }

  localStorage.removeItem('accessToken');
}

export default getCurrentUser
