import CourseWithUserInterface from "../courses/courseWithUserInterface";

interface ChapterInterface {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  course?: CourseWithUserInterface
}

export default ChapterInterface;
