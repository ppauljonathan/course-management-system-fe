import { Link, useParams } from "react-router";

function CourseShow() {
  const { id: courseId } = useParams();

  function fetchCourse() {

  }
  return(
    <h1 className="text-3xl font-extrabold">
      <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">Courses</Link> / {courseId}
    </h1>
  )
}

export default CourseShow;
