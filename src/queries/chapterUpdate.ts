const chapterUpdate = `
mutation ChapterUpdate($chapter: ChapterUpdateInpt!) {
  chapterUpdate(chapter: $chapter) {
    chapter {
      id
      title
      content
      created_at
      updated_at
    }
  }
}
`;
export default chapterUpdate;
