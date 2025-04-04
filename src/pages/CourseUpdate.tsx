import { Link } from "react-router";

import CourseForm from "../components/CourseForm";

function CourseUpdate() {

  return(
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">Courses</Link> / Edit
      </h1>

      <CourseForm type="update" />
    </>
  )
}

export default CourseUpdate
