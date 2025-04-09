import UserInterface from "./userInterface"
import ErrorInterface from "../common/errorInterface"

interface UserWithResetTokenInterface{
  user: UserInterface;
  token: string;
  expires_at: string;
  errors: [ErrorInterface];
}

export default UserWithResetTokenInterface
