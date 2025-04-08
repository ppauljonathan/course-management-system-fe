import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import CourseForm from "../components/CourseForm";
import sendGraphqlRequest from "../utils/graphqlHandler";
import course from "../queries/course";
import useToast from "../hooks/useToast";
import CourseInterface from "../interfaces/graphql/courses/courseInterface";
import CourseFormInterface from "../interfaces/common/courseFormInterface";

interface FetchCourseInterface {
  data: { course: CourseInterface }
}

function CourseUpdate() {
  const { id: courseId } = useParams();
  const { showToast } = useToast();
  const [courseData, setCourseData] = useState<CourseFormInterface>({
    live: false,
    description: '',
    name: '',
    price: 0.0,
  });

  useEffect(() => {
    function fetchCourse() {
      sendGraphqlRequest<FetchCourseInterface>(
        course,
        { id: courseId },
        assignCourseData,
        showToast
      );
    }

    fetchCourse();
  }, [courseId, showToast]);


  function assignCourseData({ data: { course } }: FetchCourseInterface) {
    setCourseData({
      live: course.live,
      description: course.description,
      name: course.name,
      price: course.price,
      id: course.id
    });
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold">
        <Link to="/courses-list/created" className="text-blue-600 hover:text-blue-400">
          Courses
        </Link>{" "}
        / {courseId} / Edit
      </h1>
      <CourseForm type="update" course={courseData} />
    </>
  );
}

export default CourseUpdate
