import { getCourses } from "./controllers/courses.js";
import { getClassById } from "./controllers/class.js";

export const resolvers = {
  Query: {
    courses: () => getCourses(),
  },

  Course: {
    date: (root) => root.createdAt.slice(0, "yyyy-mm-dd".length),
    class: (root) => getClassById(root.classId)

  },
};
