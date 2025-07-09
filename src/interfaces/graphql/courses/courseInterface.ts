interface CourseInterface {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  live: boolean;
  chapter_order: [number]
}

export default CourseInterface;
