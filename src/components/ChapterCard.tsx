import { Link } from "react-router";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";

interface ChapterCardProps {
  chapter: ChapterInterface;
  courseId?: string;
}

function ChapterCard({chapter, courseId}: ChapterCardProps) {
  return(
    <>
      <Link to={`/courses/${courseId}/chapters/${chapter.id}`} >
        <div className="w-full p-5 rounded-2xl border mt-5 font-bold flex hover:bg-gray-300 dark:hover:bg-gray-800">
          <p>{ chapter.title }</p>
        </div>
      </Link>
    </>

  )
}

export default ChapterCard;
