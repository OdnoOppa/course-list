// script-create-db.js
import knex from './db.js';

const { schema } = knex;

await schema.dropTableIfExists('user');
await schema.dropTableIfExists('course');
await schema.dropTableIfExists('class');
await schema.dropTableIfExists('video');

await schema.createTable('class', (table) => {
  table.text('id').notNullable().primary();
  table.text('name').notNullable();
  table.text('description');
});

await schema.createTable('course', (table) => {
  table.text('id').notNullable().primary();
  table.text('classId').notNullable().references('id').inTable('class');
  table.text('title').notNullable();
  table.text('description');
  table.text('createdAt').notNullable();
});

await schema.createTable('user', (table) => {
  table.text('id').notNullable().primary();
  table.text('classId').notNullable().references('id').inTable('class');
  table.text('email').notNullable().unique();
  table.text('password').notNullable();
});

await schema.createTable('video', (table) => {
  table.text('id').notNullable().primary();
  table.text('courseId').notNullable().references('id').inTable('course');
  table.text('title').notNullable();
  table.text('description');
  table.text('youtubeLink').notNullable();
});

await knex.table('class').insert([
  {
    id: 'FjcJCHJALA4i',
    name: 'Анхан шат',
    description: 'Анхан шатны ангийн тайлбар',
  },
  {
    id: 'Gu7QW9LcnF5d1',
    name: 'Дунд шат',
    description: 'Дунд шатны ангийн тайлбар',
  },
  {
    id: 'Gu7QW9LcnF5d2',
    name: 'Ахисан шат',
    description: 'Ахисан шатны ангийн тайлбар',
  },
]);

await knex.table('course').insert([
  {
    id: 'f3YzmnBZpK0o',
    classId: 'FjcJCHJALA4i',
    title: 'Хичээл - 1',
    description: 'Хичээлийн тайлбар',
    createdAt: '2023-07-11T11:18:00.000Z',
  },
  {
    id: 'XYZNJMXFax6n',
    classId: 'FjcJCHJALA4i',
    title: 'Хичээл - 2',
    description: 'Хичээлийн тайлбар',
    createdAt: '2023-07-12T10:25:00.000Z',
  },
  {
    id: '6mA05AZxvS1R',
    classId: 'Gu7QW9LcnF5d1',
    title: 'Хичээл - 3',
    description: 'Хичээлийн тайлбар',
    createdAt: '2023-07-14T11:30:00.000Z',
  },
]);

await knex.table('user').insert([
  {
    id: 'AcMJpL7b413Z',
    classId: 'FjcJCHJALA4i',
    email: 'mask@tesla.com',
    password: '123',
  },
  {
    id: 'BvBNW636Z89L',
    classId: 'Gu7QW9LcnF5d1',
    email: 'bezos@amazon.com',
    password: '123',
  },
]);

await knex.table('video').insert([
  {
    id: '1',
    courseId: 'f3YzmnBZpK0o',
    title: 'Видео - 1',
    description: 'Видео тайлбар 1',
    youtubeLink: 'https://www.youtube.com/watch?v=example1',
  },
  {
    id: '2',
    courseId: 'XYZNJMXFax6n',
    title: 'Видео - 2',
    description: 'Видео тайлбар 2',
    youtubeLink: 'https://www.youtube.com/watch?v=example2',
  },
  {
    id: '3',
    courseId: '6mA05AZxvS1R',
    title: 'Видео - 3',
    description: 'Видео тайлбар 3',
    youtubeLink: 'https://www.youtube.com/watch?v=example3',
  },
]);

process.exit();
