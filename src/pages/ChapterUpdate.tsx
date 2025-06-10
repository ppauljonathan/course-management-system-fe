import { Link, useParams } from "react-router"
import { useEffect, useState } from "react";

import ChapterForm from "../components/ChapterForm";
import sendGraphqlRequest from "../utils/graphqlHandler";
import chapter from "../queries/chapter";
import useToast from "../hooks/useToast";
import ChapterFormInterface from "../interfaces/common/chapterFormInterface";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";

interface FetchChapterInterface {
  data: { chapter: ChapterInterface }
}

function ChapterUpdate() {
  const { courseId, id: chapterId } = useParams();
  const { showToast } = useToast();
  const [chapterData, setChapterData] = useState<ChapterFormInterface>({
    title: '',
    content: ''
  })

  useEffect(() => {
    function fetchChapter() {
      sendGraphqlRequest<FetchChapterInterface>(
        chapter,
        { id: chapterId },
        assignChapterData,
        showToast
      )
    }

    fetchChapter();
  }, [chapterId, showToast]);

  function assignChapterData({ data: { chapter } }: FetchChapterInterface) {
    if (!chapter) { return; }

    setChapterData({
      id: chapter.id,
      title: chapter.title,
      content: chapter.content
    })
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
    </>
  )
}

export default ChapterUpdate
