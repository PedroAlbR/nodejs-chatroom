'use strict';

const knexLib = require('knex'),
  { 
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_NAME_DEFAULT,
    POSTGRES_SCHEMA,
    USERS_TABLE_STRUCTURE,
    MESSAGES_TABLE_STRUCTURE, 
    CHATROOM_TABLE_STRUCTURE,
    USERS_TABLE_NAME,
    MESSAGES_TABLE_NAME,
    CHATROOM_TABLE_NAME
  } = require('../../services/constants');
let knex;

function createDBIfDoesNotExists() {
  const tmpClient = knexLib({
    client: 'pg',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME_DEFAULT,
      port: DB_PORT
    }
  });

  return tmpClient.raw('CREATE DATABASE ??', ['chat'])
    .then(() => tmpClient.destroy())
    .then(connect);
}

function createTableIfDoesntExist(name, structure) {
  return (exists) => {
    if (!exists) return createTable(name, structure);
    console.log(`Table ${name} already exists.`);
  }
}

function createTable(name, structure) {
  const tmpClient =
      knexLib({
        client: 'pg',
        connection: {
          host: DB_HOST,
          user: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
          port: DB_PORT
        }
      }),
    fields = Object.entries(structure)
      .map(([field, type]) => `${field} ${type}`)
      .join(', ');

  console.log(`Attempting to create table "${name}".`);

  return tmpClient.raw(`CREATE TABLE ??.?? ( ${fields} );`, [POSTGRES_SCHEMA, name])
  .then(() => tmpClient.destroy());
}

function connect() {
  console.log(`Connecting to Postgres at ${DB_HOST}:${DB_PORT}`);

  knex = knexLib({
    client: 'pg',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT
    }
  });

  return knex.table('information_schema.tables').first()
    .catch(createDBIfDoesNotExists)
    
    .then(() => knex.schema.hasTable(USERS_TABLE_NAME))
    .then(createTableIfDoesntExist(USERS_TABLE_NAME, USERS_TABLE_STRUCTURE))

    .then(() => knex.schema.hasTable(MESSAGES_TABLE_NAME))
    .then(createTableIfDoesntExist(MESSAGES_TABLE_NAME, MESSAGES_TABLE_STRUCTURE))

    .then(() => knex.schema.hasTable(CHATROOM_TABLE_NAME))
    .then(createTableIfDoesntExist(CHATROOM_TABLE_NAME, CHATROOM_TABLE_STRUCTURE));
}
