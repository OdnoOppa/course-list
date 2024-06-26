import { GraphQLError } from 'graphql';
import {
    getCourseById,
    getCourses,
    getCoursesByClassId,
    createCourse,
} from "./controllers/courses.js";
import { getClassById } from "./controllers/class.js";
import { getVideosByCourseId } from "./controllers/videos.js";

export const resolvers = {

    Mutation: {
        createCourse: (root, { input: { title, description } }) => {
            const classId = "FjcJCHJALA4i";
            return createCourse(classId, title, description);
        },
    },

/*
    Mutation: {
        createCourse: (root, { input: { title, description }}) => {
            const classId = "FjcJCHJALA4i";
            return createCourse(classId, title, description);
        },
    },

        Mutation: {
        createCourse: (root, { title, description }) => {
            const classId = "FjcJCHJALA4i";
            return createCourse(classId, title, description);
        },
    },
*/

    Query: {
        courses: () => getCourses(),
        course: (root, { id }) => getCourseById(id),
        class: async (root, { id }) => {
            const classData = await getClassById(id);
            if (!classData) {
                throw new GraphQLError(`${id} id-тай анги олдсонгүй.`, {
                    extensions: { code: 'CLASS_NOT_FOUND' },
                });
            }
            return classData;
        },
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



/*
import { GraphQLError } from 'graphql';
import { getCourses, getCourseById, getCoursesByClassId } from "./controllers/courses.js";
import { getClassById } from "./controllers/class.js";
import { getVideosByCourseId } from "./controllers/videos.js";


export const resolvers = {
  Query: {
    courses: () => getCourses(),
    course: async (root, {id}) => {
        const course = await getCourseById(id)
        if(!course){
            throwNotFoundError(`${id} хичээл олдсонгүй`);
        }
    },


    class: async (root, {id}) => {
            const classData = await getClassById(id)
            if(!classData) {
                    throwNotFoundError(`${id} анги олдсонгүй`);
                    }
            return classData;
    },
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


function throwNotFoundError(message){
    throw new GraphQLError(message, {
        extensions: { code: 'BAD_USER_INPUT'},
    });
}


*/