import { Link, useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";

import sendGraphqlRequest from "../utils/graphqlHandler";
import courseWithUser from "../queries/courseWithUser";
import useToast from "../hooks/useToast";
import CourseWithUserInterface from "../interfaces/graphql/courses/courseWithUserInterface";

interface FetchCourseInterface {
  data: { course: CourseWithUserInterface };
}

const defaultCourse: CourseWithUserInterface = {
  id: 0,
  name: '',
  description: '',
  price: 0.0,
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
  const [showAbout, setShowAbout] = useState(true);

  const assignCourseData = useCallback(({ data: { course: fetchedCourse } }: FetchCourseInterface) => {
    setCourse(fetchedCourse);
  }, []);

  useEffect(() => {
    if (!courseId) return;
    sendGraphqlRequest<FetchCourseInterface>(
      courseWithUser,
      { id: courseId },
      assignCourseData,
      showToast
    );
  }, [courseId, assignCourseData, showToast]);

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
        className="text-2xl font-bold cursor-pointer mt-4"
        onClick={() => setShowAbout(prev => !prev)}
      >
        About this Course
      </div>

      {showAbout && (
        <div className="prose dark:prose-invert mt-5 m-auto border rounded-2xl p-5 w-11/12 max-w-11/12">
          <ReactMarkdown>{course.description}</ReactMarkdown>
        </div>
      )}
    </>
  );
}

export default CourseShow;
