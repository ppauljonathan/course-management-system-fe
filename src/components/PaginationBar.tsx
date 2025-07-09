import { Link } from "react-router";

import PageInfoInterface from "../interfaces/graphql/common/pageInfoInterface";

interface PaginationBarProps {
  pageInfo: PageInfoInterface;
  pageName?: string
}

function PaginationBar({ pageInfo, pageName = 'page' }: PaginationBarProps) {
  const baseLink = location.pathname;
  return (
    <>
      <div className="mt-15 w-9/12 border m-auto"></div>
      <div className="flex justify-center mt-5">
        <div className="p-5">Pages: </div>
        {
          pageInfo.page > 1 &&
          <>
            <Link to={`${baseLink}?${pageName}=1`} className="p-5">&lt;&lt;First</Link>
            <Link to={`${baseLink}?${pageName}=${pageInfo.page - 1}`} className="p-5">&lt;Prev</Link>
          </>
        }
        <div className="p-5">{pageInfo.page} / {pageInfo.totalPages}</div>
        {
          pageInfo.page < pageInfo.totalPages &&
          <>
            <Link to={`${baseLink}?${pageName}=${pageInfo.page + 1}`} className="p-5">Next &gt;</Link>
            <Link to={`${baseLink}?${pageName}=${pageInfo.totalPages}`} className="p-5">Last &gt;&gt;</Link>
          </>
        }
      </div>
    </>
  )
}

export default PaginationBar;
