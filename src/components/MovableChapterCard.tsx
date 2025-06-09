import { Bars2Icon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router'

import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";
import useModal from "../hooks/useModal";

interface MovableChapterCardProps {
  chapter: ChapterInterface;
  courseId: string
}


function MovableChapterCard({ chapter, courseId }: MovableChapterCardProps) {
  const [DeleteConfirmModal, setShowDeleteConfirmModal] = useModal()

  function deleteChapter() {

  }

  return (
    <>
      <div className="w-full p-5 rounded-2xl border mt-5 font-bold flex hover:bg-gray-300 dark:hover:bg-gray-800">
        <p>{ chapter.title }</p>
        <div className="flex ml-auto">
          <Link to={`/courses/${courseId}/chapters/${chapter.id}/edit`}>
            <PencilSquareIcon className="size-6 ml-2" />
          </Link>
          <TrashIcon className="size-6 ml-2 cursor-pointer" onClick={() => setShowDeleteConfirmModal(true)} />
          <Bars2Icon className="size-6 ml-2" />
        </div>
      </div>

      <DeleteConfirmModal title="Delete Chapter">
        Are you Sure?
        <div className="flex mt-5 justify-around">
          <div
            onClick={() => deleteChapter()}
            className="p-2 w-2/5 text-center rounded-2xl bg-green-500 hover:bg-green-600"
          >Yes</div>
          <div
            onClick={() => setShowDeleteConfirmModal(false)}
            className="p-2 w-2/5 text-center rounded-2xl bg-red-500 hover:bg-red-600"
          >No</div>
        </div>
      </DeleteConfirmModal>
    </>
  );
};

export default MovableChapterCard;
