import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import PaginationResponseInterface from "../../interfaces/graphql/common/paginationResponseInterface";
import sendGraphqlRequest from "../../utils/graphqlHandler";
import courseQuery from "../../queries/courses";
import { PER_PAGE } from "../../utils/constants";
import CourseInterface from "../../interfaces/graphql/courses/courseInterface";
import CourseCard from "./CourseCard";
import PageInfoInterface from "../../interfaces/graphql/common/pageInfoInterface";
import PaginationBar from '../PaginationBar';
import purchasedCourses from "../../queries/purchasedCourses";
import createdCourses from "../../queries/createdCourses";
import useToast from "../../hooks/useToast";

interface coursesResponse {
  data: { courses: PaginationResponseInterface }
}

function CourseList() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);
  const [courses, setCourses] = useState<CourseInterface[] | undefined>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoInterface>();

  const { showToast } = useToast();

  useEffect(() => {
    function fetchCourses() {
      const query = setCourseQuery();

      sendGraphqlRequest<coursesResponse>(
        query,
        {
          page: currentPage,
          per: PER_PAGE
        },
        displayCourses,
        showToast
      )
    }

    fetchCourses();
  }, [currentPage]);

  function setCourseQuery() {
    switch(location.pathname) {
      case('/courses-list/purchased'):
        return purchasedCourses;
      case('/courses-list/created'):
        return createdCourses;
      default:
        return courseQuery;
    }
  }

  function displayCourses({ data: { courses: courseList } }: coursesResponse) {
    setCourses(courseList.courses);
    setPageInfo(courseList.pageInfo);
  }

  return (
    <>
      {
        (!courses || courses?.length == 0) &&
        <p className="text-xl mt-5 w-full text-center">
          No Courses Found
        </p>
      }
      {
        (courses && courses.length > 0) &&
        <div className="mt-5 flex flex-wrap">
          {
            courses.map((course, index) => <CourseCard key={index} course={course} />)
          }
        </div>
      }
      {
        pageInfo &&
        <PaginationBar pageInfo={pageInfo} />
      }
    </>
  )
}

export default CourseList;
