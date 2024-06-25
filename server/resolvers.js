import { getCourses, getCourseById, getCoursesByClassId } from "./controllers/courses.js";
import { getClassById } from "./controllers/class.js";
import { getVideosByCourseId } from "./controllers/videos.js";


export const resolvers = {
  Query: {
    courses: () => getCourses(),
    course: (root, {id}) => getCourseById(id),
    class: (root, {id}) => getClassById(id),
    
  },

 Class: {
    courses: (root) => getCoursesByClassId(root.id),
  },


  Course: {
    date: (root) => root.createdAt.slice(0, "yyyy-mm-dd".length),
    class: (root) => getClassById(root.classId),
    videos: (root) => getVideosByCourseId(root.id),
  },
};
