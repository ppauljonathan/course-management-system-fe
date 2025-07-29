const createdCourses = `
  query CreatedCourses($page: Int, $per: Int, $searchTerm: String) {
    createdCourses(page: $page, per: $per, searchTerm: $searchTerm) {
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
