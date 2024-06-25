import knex from "../lib/db.js";

export async function getClassById(id) {
    return await knex.table("class").first().where({id});
}