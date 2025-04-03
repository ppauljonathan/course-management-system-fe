import ErrorInterface from "../common/errorInterface";
import CourseInterface from "./courseInterface";

interface CourseMutationResponseInterface {
  course: CourseInterface;
  errors: [ErrorInterface];
}

export default CourseMutationResponseInterface;
