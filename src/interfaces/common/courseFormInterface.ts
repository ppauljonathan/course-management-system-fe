interface CourseFormInterface {
  name: string;
  description: string;
  live: boolean;
  id?: number;
  chapter_order?: [number]
}

export default CourseFormInterface
