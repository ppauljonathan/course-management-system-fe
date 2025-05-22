const courses = `
  query Courses($page: Int, $per: Int) {
    courses(page: $page, per: $per) {
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
