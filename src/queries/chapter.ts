const chapter = `
  query fetchChapter($id: ID!){
    chapter(id: $id) {
      id
      title
      content
      created_at
      updated_at
    }
  }
`;

export default chapter;
