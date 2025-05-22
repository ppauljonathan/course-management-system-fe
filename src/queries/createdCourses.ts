const createdCourses = `
  query CreatedCourses($page: Int, $per: Int) {
    createdCourses(page: $page, per: $per) {
      courses {
        id
        name
        description
        created_at
        updated_at
        live
      }
      pageInfo {
        page
        per
        totalPages
        totalRecords
      }
    }
  }
`

export default createdCourses;
