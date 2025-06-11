const chapters = `
  query fetchChapters($courseId: ID!, $page: Int, $per: Int) {
    chapters(courseId: $courseId, page: $page, per: $per) {
      chapters {
        id
        title
        content
        created_at
        updated_at
      }

      pageInfo {
        page
        per
        totalRecords
        totalPages
      }
    }
  }
`

export default chapters;
