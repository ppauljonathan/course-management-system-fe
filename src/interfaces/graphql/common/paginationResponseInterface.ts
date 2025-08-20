import ChapterInterface from "../chapters/chapterInterface";
import CourseInterface from "../courses/courseInterface";
import UserInterface from "../users/userInterface";
import PageInfoInterface from "./pageInfoInterface";

interface PaginationResponseInterface {
  courses?: [CourseInterface];
  chapters?: [ChapterInterface];
  users?: [UserInterface];
  pageInfo: PageInfoInterface;
}

export default PaginationResponseInterface;
