import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

import MovableChapterCard from "./MovableChapterCard";
import sendGraphqlRequest from "../utils/graphqlHandler";
import chapters from "../queries/chapters";
import useToast from "../hooks/useToast";
import PaginationResponseInterface from "../interfaces/graphql/common/paginationResponseInterface";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";
import PageInfoInterface from "../interfaces/graphql/common/pageInfoInterface";
import PaginationBar from "./PaginationBar";

interface EditChaptersListProps {
  courseId?: string;
}

interface ChaptersResponse {
  data: { chapters: PaginationResponseInterface }
}

function EditChaptersList({ courseId }: EditChaptersListProps) {
  const [chaptersData, setChaptersData] = useState<[ChapterInterface]>()
  const [pageInfo, setPageInfo] = useState<PageInfoInterface>();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1)
  const PER_PAGE = 10;

  useEffect(() => {
    function fetchChapters() {
      sendGraphqlRequest<ChaptersResponse>(
        chapters,
        {
          courseId: courseId,
          page: currentPage,
          per: PER_PAGE
        },
        assignChapters,
        showToast
      )
    }

    fetchChapters();
  }, [courseId, showToast, currentPage])

  function assignChapters({ data: { chapters } }: ChaptersResponse) {
    setChaptersData(chapters.chapters);
    setPageInfo(chapters.pageInfo);
  }

  function moveChapterUpInOrder() {}

  function moveChapterDownInOrder() {}

  return (
    <>
      <div className="mt-5">
        <Link
          to={`/courses/${courseId}/chapters/new`}
          className="p-5 rounded-2xl bg-blue-600 text-white hover:bg-blue-400 block w-fit"
        >
          Add a Chapter
        </Link>
      </div>
      {
        chaptersData &&(
          chaptersData.length > 0 ? (
            chaptersData.map((chapter) => (
              <MovableChapterCard key={chapter.id} chapter={chapter} courseId={courseId} />
            ))
          ) : (
            <div className="text-lg font-bold mt-5">
                No Chapters Yet, <Link to={`/courses/${courseId}/chapters/new`}  className="text-blue-600 hover:text-blue-400">Add a chapter</Link>
            </div>
          )
        )
      }
      {
        (chaptersData && chaptersData.length > 0) &&
        pageInfo &&
        <PaginationBar pageInfo={pageInfo} pageName="page" />
      }
    </>
  );
};

export default EditChaptersList;
