const courseUpdate = `
  mutation CourseUpdate($course: CourseUpdateInput!) {
    courseUpdate(course: $course) {
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

export default courseUpdate;
