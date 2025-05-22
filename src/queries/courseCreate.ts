const courseCreate = `
  mutation CourseCreate($course: CourseCreateInput!) {
    courseCreate(course: $course) {
      course {
        id
        name
        description
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

export default courseCreate
