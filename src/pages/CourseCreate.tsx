import { Link } from "react-router"
import CourseForm from "../components/CourseForm"

function CourseCreate() {
  return(
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">Courses</Link> / New
      </h1>

      <CourseForm type="create" />
    </>
  )
}

export default CourseCreate
