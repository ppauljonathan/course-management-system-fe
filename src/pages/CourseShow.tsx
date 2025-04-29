import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import sendGraphqlRequest from "../utils/graphqlHandler";
import courseWithUser from "../queries/courseWithUser";
import useToast from "../hooks/useToast";
import CourseWithUserInterface from "../interfaces/graphql/courses/courseWithUserInterface";

interface FetchCourseInterface {
  data: { course: CourseWithUserInterface };
}

function CourseShow() {
  const { id: courseId } = useParams();
  const { showToast } = useToast();
  const [course, setCourse] = useState<CourseWithUserInterface>({
    id: 0,
    name:'',
    description:'',
    price: 0.0,
    created_at:'',
    updated_at:'',
    live: false,
    user: {
      id: 0,
      first_name:'',
      last_name:'',
      email:'',
      created_at:'',
      updated_at:'',
    }
  });

  useEffect(() => {
    function fetchCourse() {
      sendGraphqlRequest<FetchCourseInterface>(
        courseWithUser,
        { id: courseId },
        assignCourseData,
        showToast
      );
    }
    fetchCourse();
  }, [courseId, showToast]);

  function assignCourseData({ data: { course: fetchedCourse } }: FetchCourseInterface) {
    setCourse(fetchedCourse);
  }

  return(
    <>
      <h1 className="text-3xl font-extrabold text-center">
        <Link to="/courses-list/all" className="text-blue-600 hover:text-blue-400">Courses</Link> {" "}
        / {course.name}
      </h1>
      <p className="text-center">
      By :&nbsp;
        <Link to="/" className="text-blue-500 underline hover:text-blue-800">
          {[course.user.first_name, course.user.last_name].filter(Boolean).join(' ')}
        </Link>
      </p>

      <div className="text-2xl font-bold">About this Course</div>
      <div className="prose dark:prose-invert m-5 border rounded-2xl p-5">
        <ReactMarkdown>{course.description}</ReactMarkdown>
      </div>
    </>
  )
}

export default CourseShow;
