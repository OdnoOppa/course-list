import knex from "../lib/db.js";
import { customAlphabet } from "nanoid";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


export async function updateCourse({id, title, description}){
  const course = await knex.table("course").first().where ({ id });
  if(!course){
    throw Error(`no Course with ID ${id}`);
  }
  const updateFields = { title, description };
  await knex.table("course").update(updateFields).where({ id });
  return { ...course, ...updateFields };
}


export async function deleteCourse(id){
  const course = await knex.table("course").first().where ({ id });
  if(!course){
    throw Error(`no Course with ID ${id}`);
  }
  await knex.table("course").delete().where({id});
  return course;
}

export async function createCourse(classId, title, description) {
  const newCourse = {
    id: customAlphabet(chars, 12)(),
    classId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  console.log(newCourse);
  await knex.table("course").insert(newCourse);
  return newCourse;
}



export async function getCoursesByClassId(classId) {
  return await knex.table("course").select().where({ classId });
}

export async function getCourses() {
  return await knex.table("course").select();
}

export async function getCourseById(id) {
  return await knex.table("course").first().where({ id });
}
