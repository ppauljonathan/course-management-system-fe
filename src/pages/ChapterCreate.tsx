import { Link } from "react-router";
import ChapterForm from "../components/ChapterForm";

function ChapterCreate() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">Courses</Link> /&nbsp;
        <Link to="/courses/1/edit" className="text-blue-600 hover:text-blue-400">1</Link> /&nbsp;
        <Link to="/courses/1/edit" className="text-blue-600 hover:text-blue-400">Chapters</Link> / New
      </h1>

      <ChapterForm type="create" />
    </>
  )
}

export default ChapterCreate;
