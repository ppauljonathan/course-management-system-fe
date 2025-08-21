import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'

import useToast from "../hooks/useToast";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";
import sendGraphqlRequest from "../utils/graphqlHandler";
import chapterWithCourse from "../queries/chapterWithCourse";

interface FetchChapterInterface {
  data: { chapter: ChapterInterface }
}

function ChapterShow() {
  const { courseId, id: chapterId } = useParams();
  const { showToast } = useToast();
  const [chapterData, setChapterData] = useState<ChapterInterface>();
  const [prevChapterId, setPrevChapterId] = useState<number>(-1);
  const [nextChapterId, setNextChapterId] = useState<number>(-1);
  const navigate = useNavigate()

  useEffect(() => {
    function fetchChapter() {
      sendGraphqlRequest<FetchChapterInterface>(
        chapterWithCourse,
        { id: chapterId },
        assignChapterData,
        showToast
      )
    }

    function setNextAndPrevChapterLinks(chapterId?: number, chapterOrder?: number[]) {
      if (chapterId === undefined || chapterOrder === undefined) { return; }

      const currentIndex = chapterOrder.findIndex((val) => val == chapterId);

      if (currentIndex !== 0) {
        setPrevChapterId(chapterOrder[currentIndex - 1]);
      }

      if (currentIndex !== chapterOrder.length - 1) {
        setNextChapterId(chapterOrder[currentIndex + 1]);
      }
    }

    function assignChapterData({ data: { chapter } }: FetchChapterInterface) {
      if (!chapter) { return; }
      if (!chapter.course?.live) {
        navigate('/courses-list/all');
        showToast('Course does not exist', 'error')
      }
      setNextAndPrevChapterLinks(chapter.id, chapter.course?.chapter_order)
      setChapterData({ ...chapter })
    }

    fetchChapter();
  }, [chapterId, showToast, navigate])

  return (
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list" className="text-blue-600 hover:text-blue-400">Courses</Link> /&nbsp;
        <Link to={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-400">{chapterData?.course?.name}</Link> /&nbsp;
        <Link to={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-400">Chapters</Link> /&nbsp;{chapterData?.title}
      </h1>

      <div className="prose dark:prose-invert mt-5 m-auto border rounded-2xl p-5 w-11/12 max-w-11/12">
        <ReactMarkdown>{chapterData?.content}</ReactMarkdown>
      </div>

      <div className="flex mt-5">
        {
          (prevChapterId !== chapterData?.id) &&
          <Link to={`/courses/${chapterData?.course?.id}/chapters/${prevChapterId}`} className="mr-auto ml-10 text-2xl">&lt;&lt; Previous</Link>
        }
        {
          (nextChapterId !== chapterData?.id) &&
          <Link to={`/courses/${chapterData?.course?.id}/chapters/${nextChapterId}`} className="ml-auto mr-10 text-2xl">Next&nbsp;&gt;&gt;</Link>
        }
      </div>
    </>
  )
}

export default ChapterShow;
