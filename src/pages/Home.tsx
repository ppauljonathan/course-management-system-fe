import CourseList from "../components/CourseList";
import TabBar from "../components/TabBar";
import useAuthUser from "../hooks/useAuthUser";

function Home() {
  const user = useAuthUser();

  return (
    <>
      <h1 className="text-3xl font-extrabold">Courses</h1>
      { user && <TabBar /> }
      <CourseList />
    </>
  );
}

export default Home;
