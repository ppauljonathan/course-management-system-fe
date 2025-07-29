const courses = `
  query Courses($page: Int, $per: Int, $searchTerm: String) {
    courses(page: $page, per: $per, searchTerm: $searchTerm) {
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

export default courses;
