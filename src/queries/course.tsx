const course = `
  query FetchCourse($id: ID!) {
    course(id: $id) {
      id
      name
      description
      price
      created_at
      updated_at
      live
    }
  }
`;

export default course;
