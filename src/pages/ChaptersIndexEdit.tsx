import { Link, useParams } from 'react-router';
import EditChaptersList from '../components/EditChaptersList';

function ChaptersIndexEdit() {
 const { id: courseId } = useParams();

  return (
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">Courses</Link> /&nbsp;
        <Link to={`/courses/${courseId}/edit`} className="text-blue-600 hover:text-blue-400">{courseId}</Link> / Chapters
      </h1>

      <EditChaptersList courseId={courseId} />
    </>
  )
}

export default ChaptersIndexEdit
