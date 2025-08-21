import UserInterface from "../users/userInterface";

interface CourseWithUserInterface {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  live: boolean;
  user: UserInterface;
  chapter_order: number[];
}

export default CourseWithUserInterface;
