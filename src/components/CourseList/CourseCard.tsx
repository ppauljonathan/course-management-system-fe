import CourseInterface from "../../interfaces/graphql/courses/courseInterface";
import VideoPlaceHolder from "../../assets/video-placeholder.svg";
import TruncateText from "../../utils/TruncateText";
import { Link } from "react-router";

interface CourseCardPropsInterface {
  course: CourseInterface
  showAdminData: boolean;
}

function CourseCard({ course, showAdminData }: CourseCardPropsInterface) {
  return (
    <div
      className="p-5 border rounded-2xl m-5 flex-col min-w-sm max-w-sm hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      {
        showAdminData &&
        <div className="flex justify-around">
          <Link
            to={`/courses/${course.id}/edit`}
            className="p-2 bg-blue-600 rounded-2xl text-center text-white hover:bg-blue-400 w-2/5 block"
          >
            Edit
          </Link>

          {
            course.live ?
              <div className="p-2 bg-green-400 rounded-2xl text-center w-2/5">Live</div>:
              <div className="p-2 bg-gray-400 rounded-2xl text-center w-2/5">Draft</div>
          }

        </div>
      }

      <div>
        <img
          src={VideoPlaceHolder}
          alt={course.name}
          className="size-36 m-auto"
        />
      </div>
      <div className="ml-5">
        <div className="text-lg font-bold">
          <TruncateText
            str={course.name}
            maxLength={30}
          />
        </div>
          {
            course.price == 0 ?
              <div>Free</div> :
              <div>Price: ${course.price.toFixed(2)}</div>
          }
       </div>

      </div>
  )
};

export default CourseCard;
