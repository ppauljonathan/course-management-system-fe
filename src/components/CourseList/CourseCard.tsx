import CourseInterface from "../../interfaces/graphql/courses/courseInterface";
import VideoPlaceHolder from "../../assets/video-placeholder.svg";

interface CourseCardPropsInterface {
  course: CourseInterface
}

function CourseCard({ course }: CourseCardPropsInterface) {
  return (
    <div className="p-5 border rounded-2xl m-5 flex">
      <div>
        <img
          src={VideoPlaceHolder}
          alt={course.name}
          className="size-36"
        />
      </div>
      <div className="ml-5">
        <div className="text-lg font-bold">{course.name}</div>
          <div>{course.description}</div>
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
