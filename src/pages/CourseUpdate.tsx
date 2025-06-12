import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import CourseForm from "../components/CourseForm";
import sendGraphqlRequest from "../utils/graphqlHandler";
import useToast from "../hooks/useToast";
import CourseFormInterface from "../interfaces/common/courseFormInterface";
import useModal from '../hooks/useModal';
import courseDelete from "../queries/courseDelete";
import EditChaptersList from "../components/EditChaptersList";
import CourseMutationResponseInterface from "../interfaces/graphql/courses/courseMutationResponseInterface";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import courseWithUser from "../queries/courseWithUser";
import CourseWithUserInterface from "../interfaces/graphql/courses/courseWithUserInterface";
import UserInterface from "../interfaces/graphql/users/userInterface";
import getCurrentUser from "../utils/getCurrentUser";

interface FetchCourseInterface {
  data: { course: CourseWithUserInterface }
}

interface DeleteCourseInterface {
  data: { courseDelete: CourseMutationResponseInterface }
  errors?: [ErrorInterface]
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
        courseWithUser,
        { id: courseId },
        assignCourseData,
        showToast
      );
    }

    fetchCourse();
  }, [courseId, showToast, assignCourseData]);

  async function currentUserIsOwner(owner: UserInterface):Promise<boolean> {
    const currentUser = await getCurrentUser(showToast);

    if(currentUser?.id == owner.id) { return true; }

    return false;
  }

  async function assignCourseData({ data: { course } }: FetchCourseInterface) {
    if (!course) { return; }
    if (!(await currentUserIsOwner(course.user))) {
      showToast('You are not authorized to edit this course', 'error');
      navigate('/courses-list/created');
      return;
    }

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

  function handleCourseDeletion({ data: { courseDelete: { course, errors: userErrors } }, errors }:DeleteCourseInterface) {
    setShowDeleteConfirmationModal(false)

    if(errors && errors.length > 0) {
      showToast(errors.map(e => e.message).join(', '), 'error');
      return;
    }

    if(userErrors.length > 0) {
      showToast(userErrors.map(e => e.message).join(', '), 'error');
      return;
    }

    navigate('/courses-list/created');
    showToast(`Course ${course.name} deleted successfully`, 'success')
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
      <EditChaptersList courseId={courseId} />
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
