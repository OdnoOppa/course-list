// controllers/videos.js

import knex from '../lib/db.js';

export const getVideosByCourseId = async (courseId) => {
  return await knex('video').where({ courseId });
};
