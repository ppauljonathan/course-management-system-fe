import { Link, useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";

import ChapterForm from "../components/ChapterForm";
import sendGraphqlRequest from "../utils/graphqlHandler";
import useToast from "../hooks/useToast";
import ChapterFormInterface from "../interfaces/common/chapterFormInterface";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";
import useModal from "../hooks/useModal";
import chapterDelete from "../queries/chapterDelete";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import ChapterMutationResponseInterface from "../interfaces/graphql/chapters/chapterMutationResponseInterface";
import UserInterface from "../interfaces/graphql/users/userInterface";
import getCurrentUser from "../utils/getCurrentUser";
import chapterWithCourse from "../queries/chapterWithCourse";

interface FetchChapterInterface {
  data: { chapter: ChapterInterface }
}

interface DeleteChapterInterface {
  data: {
    chapterDelete: ChapterMutationResponseInterface;
    errors: [ErrorInterface];
  }
  errors: [ErrorInterface];
}

function ChapterUpdate() {
  const { courseId, id: chapterId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [chapterData, setChapterData] = useState<ChapterFormInterface>({
    title: '',
    content: ''
  });
  const [DeleteConfirmModal, setShowDeleteConfirmationModal] = useModal();

  useEffect(() => {
    function fetchChapter() {
      sendGraphqlRequest<FetchChapterInterface>(
        chapterWithCourse,
        { id: chapterId },
        assignChapterData,
        showToast
      )
    }

    fetchChapter();
  }, [chapterId, showToast]);

  async function currentUserIsOwner(owner?: UserInterface):Promise<boolean> {
    if(owner === undefined) { return false; }

    console.log(owner)
    const currentUser = await getCurrentUser(showToast);
    if(currentUser?.id == owner.id) { return true; }

    return false;
  }

  async function assignChapterData({ data: { chapter } }: FetchChapterInterface) {
    if (!chapter) { return; }
    if (!(await currentUserIsOwner(chapter.course?.user))) {
      showToast('You are not authorized to edit this chapter', 'error');
      navigate('/courses-list/created');
      return;
    }

    setChapterData({
      id: chapter.id,
      title: chapter.title,
      content: chapter.content
    })
  }

  function handleDeleteResponse({ data: { chapterDelete: { chapter, errors: userErrors } }, errors }: DeleteChapterInterface) {
    setShowDeleteConfirmationModal(false)

    if(errors && errors.length > 0) {
      showToast(errors.map(e => e.message).join(', '), 'error');
      return;
    }

    if(userErrors.length > 0) {
      showToast(userErrors.map(e => e.message).join(', '), 'error');
      return;
    }

    navigate(`/courses/${courseId}/edit`);
    showToast(`Chapter ${chapter.title} deleted successfully`, 'success')
  }

  function deleteChapter() {
    sendGraphqlRequest<DeleteChapterInterface>(
      chapterDelete,
      { id: chapterId, courseId: courseId },
      handleDeleteResponse,
      showToast
    )
  }

  return (
    <>
     <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">Courses</Link> /&nbsp;
        <Link to={`/courses/${courseId}/edit`} className="text-blue-600 hover:text-blue-400">{courseId}</Link> /&nbsp;
        <Link to={`/courses/${courseId}/edit`} className="text-blue-600 hover:text-blue-400">Chapters</Link> /&nbsp;
        <Link to={`/courses/${courseId}/chapters/${chapterId}/edit`} className="text-blue-600 hover:text-blue-400">{chapterId}</Link> / Edit
      </h1>

      <ChapterForm type="update" chapter={chapterData} courseId={courseId} />
      <h2 className="text-xl font-bold mt-5">Danger Zone</h2>
      <button
        className="text-lg font-medium mt-5 ml-5 p-5 rounded-2xl bg-red-500 hover:bg-red-600"
        onClick={() => setShowDeleteConfirmationModal(true)}
      >Delete Chapter</button>

      <DeleteConfirmModal title="Delete Chapter">
        Are you Sure?
        <div className="flex mt-5 justify-around">
          <div
            onClick={() => deleteChapter()}
            className="p-2 w-2/5 text-center rounded-2xl bg-green-500 hover:bg-green-600"
          >Yes</div>
          <div
            onClick={() => setShowDeleteConfirmationModal(false)}
            className="p-2 w-2/5 text-center rounded-2xl bg-red-500 hover:bg-red-600"
          >No</div>
        </div>
      </DeleteConfirmModal>
    </>
  )
}

export default ChapterUpdate
