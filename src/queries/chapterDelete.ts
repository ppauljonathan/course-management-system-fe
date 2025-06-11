const chapterDelete = `
  mutation ChapterDelete($id: ID!) {
    chapterDelete(id: $id) {
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
