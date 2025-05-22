import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import CourseForm from "../components/CourseForm";
import sendGraphqlRequest from "../utils/graphqlHandler";
import course from "../queries/course";
import useToast from "../hooks/useToast";
import CourseInterface from "../interfaces/graphql/courses/courseInterface";
import CourseFormInterface from "../interfaces/common/courseFormInterface";
import useModal from '../hooks/useModal';
import courseDelete from "../queries/courseDelete";

interface FetchCourseInterface {
  data: { course: CourseInterface }
}

interface DeleteCourseInterface {
  data: { courseDelete: CourseInterface }
}

function CourseUpdate() {
  const { id: courseId } = useParams();
  const { showToast } = useToast();
  const [courseData, setCourseData] = useState<CourseFormInterface>({
    live: false,
    description: '',
    name: '',
  });
  const [DeleteConfirmModal, setShowDeleteConfirmationModal] = useModal();
  const navigate = useNavigate();

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
    if(!course) { return; }

    setCourseData({
      live: course.live,
      description: course.description,
      name: course.name,
      id: course.id
    });
  }

  function deleteCourse() {
    sendGraphqlRequest<DeleteCourseInterface>(
      courseDelete,
      { id: courseId },
      handleCourseDeletion,
      showToast
    )
  }

  function handleCourseDeletion() {
    navigate('/courses-list/created');
    showToast("Course deleted successfully", 'success')
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
      <h2 className="text-xl font-bold mt-5">Modules</h2>
      <h2 className="text-xl font-bold mt-5">Danger Zone</h2>
      <button
        className="text-lg font-medium mt-5 ml-5 p-5 rounded-2xl bg-red-500 hover:bg-red-600"
        onClick={() => setShowDeleteConfirmationModal(true)}
      >Delete Course</button>

      <DeleteConfirmModal title="Delete Course">
        Are you Sure?
        <div className="flex mt-5 justify-around">
          <div
            onClick={() => deleteCourse()}
            className="p-2 w-2/5 text-center rounded-2xl bg-green-500 hover:bg-green-600"
          >Yes</div>
          <div
            onClick={() => setShowDeleteConfirmationModal(false)}
            className="p-2 w-2/5 text-center rounded-2xl bg-red-500 hover:bg-red-600"
          >No</div>
        </div>
      </DeleteConfirmModal>
    </>
  );
}

export default CourseUpdate
