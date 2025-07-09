import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Link, useNavigate } from 'react-router'

import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";
import useModal from "../hooks/useModal";
import sendGraphqlRequest from "../utils/graphqlHandler";
import chapterDelete from "../queries/chapterDelete";
import useToast from "../hooks/useToast";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import ChapterMutationResponseInterface from "../interfaces/graphql/chapters/chapterMutationResponseInterface";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

interface MovableChapterCardProps {
  chapter: ChapterInterface;
  courseId?: string
}

interface DeleteChapterInterface {
  data: {
    chapterDelete: ChapterMutationResponseInterface;
    errors: [ErrorInterface];
  }
  errors: [ErrorInterface];
}

function MovableChapterCard({ chapter, courseId }: MovableChapterCardProps) {
  const [DeleteConfirmModal, setShowDeleteConfirmModal] = useModal();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleDeleteResponse({ data: { chapterDelete: { chapter, errors: userErrors } }, errors }: DeleteChapterInterface) {
    setShowDeleteConfirmModal(false);
    if (errors && errors.length > 0) {
      showToast(errors.map(e => e.message).join(', '), 'error');
      return;
    }

    if (userErrors.length > 0) {
      showToast(userErrors.map(e => e.message).join(', '), 'error');
      return;
    }

    navigate(`/courses/${courseId}/edit`);
    showToast(`Chapter ${chapter.title} deleted successfully`, 'success')
  }

  function deleteChapter() {
    sendGraphqlRequest<DeleteChapterInterface>(
      chapterDelete,
      { id: chapter.id, courseId: courseId },
      handleDeleteResponse,
      showToast
    )
  }

  return (
    <>
      <div className="w-full p-5 rounded-2xl border mt-5 font-bold flex">
        <p>{chapter.title}</p>
        <div className="flex ml-auto">
          <Link to={`/courses/${courseId}/chapters/${chapter.id}/edit`} title="Edit Chapter">
            <PencilSquareIcon className="size-6 ml-2" />
          </Link>
          <TrashIcon className="size-6 ml-2 cursor-pointer" onClick={() => setShowDeleteConfirmModal(true)} title="Delete Chapter" />
          <ArrowUpIcon className="size-6 ml-2" title="Move Chapter Up" />
          <ArrowDownIcon className="size-6 ml-2" title="Move Chapter Down" />
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
