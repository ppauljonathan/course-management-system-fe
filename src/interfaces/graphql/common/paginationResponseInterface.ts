import CourseInterface from "../courses/courseInterface";
import PageInfoInterface from "./pageInfoInterface";

interface PaginationResponseInterface {
  courses?: [CourseInterface];
  pageInfo: PageInfoInterface;
}

export default PaginationResponseInterface;
