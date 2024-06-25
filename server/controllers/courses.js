import knex from "../lib/db.js";

export async function getCourses() {
  return await knex.table("course").select();
}
