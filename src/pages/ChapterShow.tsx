import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'

import useToast from "../hooks/useToast";
import ChapterFormInterface from "../interfaces/common/chapterFormInterface";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";
import sendGraphqlRequest from "../utils/graphqlHandler";
import chapter from "../queries/chapter";

interface FetchChapterInterface {
  data: { chapter: ChapterInterface }
}

function ChapterShow() {
  const { courseId, id: chapterId } = useParams();
  const { showToast } = useToast();
  const [chapterData, setChapterData] = useState<ChapterFormInterface>({
    title: '',
    content: ''
  })

  function assignChapterData({ data: { chapter } }: FetchChapterInterface) {
    if(!chapter) { return; }
    setChapterData({...chapter})
  }

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
  }, [chapterId, showToast])

  return (
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list" className="text-blue-600 hover:text-blue-400">Courses</Link> /&nbsp;
        <Link to={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-400">{courseId}</Link> /&nbsp;
        <Link to={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-400">Chapters</Link> /&nbsp;{chapterData.title}
      </h1>

      <div className="prose dark:prose-invert mt-5 m-auto border rounded-2xl p-5 w-11/12 max-w-11/12">
        <ReactMarkdown>{chapterData.content}</ReactMarkdown>
      </div>
    </>
  )
}

export default ChapterShow;
