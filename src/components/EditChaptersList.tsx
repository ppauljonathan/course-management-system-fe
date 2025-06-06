import { Link } from "react-router";
import { useEffect, useState } from "react";

import MovableChapterCard from "./MovableChapterCard";
import sendGraphqlRequest from "../utils/graphqlHandler";
import chapters from "../queries/chapters";
import useToast from "../hooks/useToast";
import PaginationResponseInterface from "../interfaces/graphql/common/paginationResponseInterface";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";

interface EditChaptersListProps {
  courseId?: string;
}

interface ChaptersResponse {
  data: { chapters: PaginationResponseInterface }
}

function EditChaptersList({ courseId }: EditChaptersListProps) {
  const [chaptersData, setChaptersData] = useState<[ChapterInterface]>()
  const { showToast } = useToast();

  useEffect(() => {
    function fetchChapters() {
      sendGraphqlRequest<ChaptersResponse>(
        chapters,
        {
          courseId: courseId,
          page: 1,
          per: 5
        },
        assignChapters,
        showToast
      )
    }

    fetchChapters();
  }, [courseId, showToast])

  function assignChapters({ data: { chapters: { chapters, pageInfo }} }: ChaptersResponse) {
    setChaptersData(chapters);
  }

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
      {
        chaptersData?.map((chapter) => (
          <MovableChapterCard key={chapter.id} chapter={chapter} courseId={courseId} />
        ))
      }
    </>
  );
};

export default EditChaptersList;
