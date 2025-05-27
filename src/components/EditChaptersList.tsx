import { Link } from "react-router";

import MovableChapterCard from "./MovableChapterCard";


interface EditChaptersListProps {
  courseId: string;
}

function EditChaptersList({ courseId }: EditChaptersListProps) {
  return (
    <>
      <h2 className="text-xl font-bold mt-5">Chapters</h2>
      <div className="mt-5">
        <Link
          to={`/courses/${courseId}/chapters/new`}
          className="p-5 rounded-2xl bg-blue-600 text-white hover:bg-blue-400 block w-fit"
        >
          Add a Chapter
        </Link>
      </div>

      <MovableChapterCard></MovableChapterCard>
      <MovableChapterCard></MovableChapterCard>
      <MovableChapterCard></MovableChapterCard>
      <MovableChapterCard></MovableChapterCard>
      <MovableChapterCard></MovableChapterCard>

    </>
  );
};

export default EditChaptersList;
