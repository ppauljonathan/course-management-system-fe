const createdCourses = `
  query CreatedCourses($page: Int, $per: Int) {
    createdCourses(page: $page, per: $per) {
      courses {
        id
        name
        description
        price
        created_at
        updated_at
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
