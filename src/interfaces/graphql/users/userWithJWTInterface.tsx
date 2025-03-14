import UserInterface from "./userInterface"
import ErrorInterface from "../common/errorInterface"

interface UserWithJWTInterface {
  user: UserInterface;
  jwt: string;
  errors: [ErrorInterface];
}

export default UserWithJWTInterface
