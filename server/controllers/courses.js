import knex from "../lib/db.js";


export async function getCoursesByClassId(classId){
  return await knex.table("course").where({ classId });
}

export async function getCourses() {
  return await knex.table("course").select();
}


export async function getCourseById(id) {
    return await knex.table("course").first().where({ id });
}