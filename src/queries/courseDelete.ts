const courseDelete = `
  mutation CourseDelete($id: ID!) {
    courseDelete(id: $id) {
      course {
        id
        name
        description
        price
        created_at
        updated_at
        live
      }
      errors {
        code
        message
        location
      }
    }
  }
`

export default courseDelete;
