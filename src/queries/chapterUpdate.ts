const chapterUpdate = `
mutation ChapterUpdate($chapter: ChapterUpdateInput!) {
  chapterUpdate(chapter: $chapter) {
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
export default chapterUpdate;
