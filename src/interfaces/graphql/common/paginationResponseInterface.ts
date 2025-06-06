import ChapterInterface from "../chapters/chapterInterface";
import CourseInterface from "../courses/courseInterface";
import PageInfoInterface from "./pageInfoInterface";

interface PaginationResponseInterface {
  courses?: [CourseInterface];
  chapters?: [ChapterInterface]
  pageInfo: PageInfoInterface;
}

export default PaginationResponseInterface;
