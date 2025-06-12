const chapterWithCourse = `
  query fetchChapterWithCourse($id: ID!) {
    chapter(id: $id) {
      id
      title
      content
      created_at
      updated_at
      course {
        id
        name
        description
        live
        created_at
        updated_at
        user {
          id
          first_name
          last_name
          email
          created_at
          updated_at
        }
      }
    }
  }
`
export default chapterWithCourse;
