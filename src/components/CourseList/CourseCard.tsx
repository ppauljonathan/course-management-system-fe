import CourseInterface from "../../interfaces/graphql/courses/courseInterface";
import VideoPlaceHolder from "../../assets/video-placeholder.svg";
import TruncateText from "../../utils/TruncateText";

interface CourseCardPropsInterface {
  course: CourseInterface
}

function CourseCard({ course }: CourseCardPropsInterface) {
  return (
    <div
      className="p-5 border rounded-2xl m-5 flex-col min-w-sm max-w-sm min-h-64 max-h-64 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
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
            maxLength={20}
          />
        </div>
        <div className="text-lg">
          <TruncateText
            str={course.description}
            maxLength={25}
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
