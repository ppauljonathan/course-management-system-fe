const updateChapterOrder = `
  mutation UpdateChapterOrder($id: ID!, $chapterOrder: [Int!]!) {
    updateChapterOrder(id: $id, chapterOrder: $chapterOrder) {
      course {
        id
        name
        description
        created_at
        updated_at
        live
        chapter_order
      }
      errors {
        code
        message
        location
      }
    }
  }
`;

export default updateChapterOrder;
