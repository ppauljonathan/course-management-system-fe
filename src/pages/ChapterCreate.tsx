import { Link, useParams } from "react-router";
import ChapterForm from "../components/ChapterForm";

function ChapterCreate() {
  const { courseId } = useParams();
  return (
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">Courses</Link> /&nbsp;
        <Link to={`/courses/${courseId}/edit`} className="text-blue-600 hover:text-blue-400">{courseId}</Link> /&nbsp;
        <Link to={`/courses/${courseId}/edit`} className="text-blue-600 hover:text-blue-400">Chapters</Link> / New
      </h1>

      <ChapterForm type="create" courseId={courseId} />
    </>
  )
}

export default ChapterCreate;
