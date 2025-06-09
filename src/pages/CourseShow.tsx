import { Link, useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import sendGraphqlRequest from "../utils/graphqlHandler";
import courseWithUser from "../queries/courseWithUser";
import useToast from "../hooks/useToast";
import CourseWithUserInterface from "../interfaces/graphql/courses/courseWithUserInterface";
import ChapterInterface from "../interfaces/graphql/chapters/chapterInterface";
import chapters from "../queries/chapters";
import ChapterCard from "../components/ChapterCard";
import PaginationResponseInterface from "../interfaces/graphql/common/paginationResponseInterface";

interface FetchCourseInterface {
  data: { course: CourseWithUserInterface };
}

interface FetchChaptersInterface {
  data: { chapters: PaginationResponseInterface }
}

const defaultCourse: CourseWithUserInterface = {
  id: 0,
  name: '',
  description: '',
  created_at: '',
  updated_at: '',
  live: false,
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    created_at: '',
    updated_at: '',
  }
};

function CourseShow() {
  const { id: courseId } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const [course, setCourse] = useState(defaultCourse);
  const [showAbout, setShowAbout] = useState(false);
  const [showChapters, setShowChapters] = useState(true);
  const [chaptersData, setChaptersData] = useState<[ChapterInterface]>()

  const assignCourseData = useCallback(({ data: { course: fetchedCourse } }: FetchCourseInterface) => {
    setCourse(fetchedCourse);
  }, []);

  const assignChaptersData = useCallback(({ data: { chapters: chaptersData } }: FetchChaptersInterface) => {
    setChaptersData(chaptersData.chapters)
  }, [])

  useEffect(() => {
    if (!courseId) return;

    sendGraphqlRequest<FetchCourseInterface>(
      courseWithUser,
      { id: courseId },
      assignCourseData,
      showToast
    );

    sendGraphqlRequest(
      chapters,
      { courseId: courseId },
      assignChaptersData,
      showToast
    )
  }, [courseId, assignCourseData, showToast, assignChaptersData]);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-center">
        <Link to="/courses-list/all" className="text-blue-600 hover:text-blue-400">Courses</Link> / {course.name}
      </h1>
      <p className="text-center">
        By:&nbsp;
        <Link to="/" className="text-blue-500 underline hover:text-blue-800">
          {[course.user.first_name, course.user.last_name].filter(Boolean).join(" ")}
        </Link>
      </p>

      <div
        className="text-2xl font-bold cursor-pointer mt-4 flex"
        onClick={() => setShowAbout(prev => !prev)}
      >
        About this Course

        {
          showAbout ?
            <ChevronUpIcon className="ml-5 size-6" /> :
            <ChevronDownIcon className="ml-5 size-6" />
        }
      </div>

      {
        showAbout && (
          <div className="prose dark:prose-invert mt-5 m-auto border rounded-2xl p-5 w-11/12 max-w-11/12">
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </div>
        )
      }

      <div
        className="text-2xl font-bold cursor-pointer mt-4 flex"
        onClick={() => setShowChapters(prev => !prev)}
      >
        Chapters
        {
          showChapters ?
            <ChevronUpIcon className="ml-5 size-6" /> :
            <ChevronDownIcon className="ml-5 size-6" />
        }
      </div>

      {
        showChapters && (
          chaptersData?.map((chapter) => (
            <ChapterCard chapter={chapter} courseId={courseId} key={chapter.id} />
          ))
        )
      }
    </>
  );
}

export default CourseShow;
