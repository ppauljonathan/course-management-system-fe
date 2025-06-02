import ErrorInterface from "../common/errorInterface";
import ChapterInterface from "./chapterInterface";

interface ChapterMutationResponseInterface {
  chapter: ChapterInterface;
  errors: [ErrorInterface];
}

export default ChapterMutationResponseInterface;
