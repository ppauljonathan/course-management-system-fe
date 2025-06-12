const chapterDelete = `
  mutation ChapterDelete($id: ID!, $courseId: ID!) {
    chapterDelete(id: $id, courseId: $courseId) {
      chapter {
        id
        title
        content
        created_at
        updated_at
      }
      errors {
        message
        location
        code
      }
    }
  }
`

export default chapterDelete;
