import UserInterface from "../users/userInterface";

interface CourseWithUserInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  live: boolean;
  user: UserInterface;
}

export default CourseWithUserInterface;
