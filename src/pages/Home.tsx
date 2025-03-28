import CourseList from "../components/CourseList";
import TabBar from "../components/TabBar";

function Home() {
  return (
    <>
      <h1 className="text-2xl font-extrabold">Courses</h1>
      <TabBar />
      <CourseList />
    </>
  );
}

export default Home;
