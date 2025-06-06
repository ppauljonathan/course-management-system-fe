const chapterCreate = `
mutation ChapterCreate($chapter: ChapterCreateInput!) {
  chapterCreate(chapter: $chapter) {
    chapter {
      id
      title
      content
      created_at
      updated_at
    }
    errors {
      code
      message
      location
    }
  }
}
`;
export default chapterCreate;
