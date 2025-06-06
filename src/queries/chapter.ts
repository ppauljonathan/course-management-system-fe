const chapter = `
  query fetchChapter($id: ID!){
    chapter(id: $id) {
      id
      title
      content
    }
  }
`;

export default chapter;
