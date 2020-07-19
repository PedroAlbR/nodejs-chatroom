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
  } = require('./constants');
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

function baseQuery(table) {
  return knex.withSchema(POSTGRES_SCHEMA).table(table);
}

function get(table, key) {
  return getByField(table, 'id', key);
}

function put(table, key, value, upsert) {
  if (!knex) return Promise.reject(new Error('PG is not initialized'));

  const putObj = key ? Object.assign({}, value, { id: key }) : value,
    insert = baseQuery(table).insert(putObj),
    update = knex.update(putObj).where({ [`${table}.id`]: putObj.id }),
    query = upsert
      ? knex.raw(`? ON CONFLICT ON CONSTRAINT ${table}_pkey DO ?`, [insert, update])
      : insert;

  return query.then(() => value);
}

function del(table, key) {
  return baseQuery(table)
    .where('id', key)
    .del();
}

function getByField(table, field, value) {
  if (!knex) return Promise.reject(new Error('PG is not initialized'));

  return baseQuery(table)
    .select('*')
    .where(field, value)
    .then(getResponse(value));
}

function getResponse(key) {
  if (!knex) return Promise.reject(new Error('PG is not initialized'));

  return resp => {
    if (!resp.length) return Promise.reject(new Error(`Specified key "${key}" not found.`));

    return resp[0];
  };
}

function getBy(table, conditions) {
  let query = baseQuery(table).select('*');

  conditions.forEach(condition => {
    if (condition.length > 1) return query.where(...condition);
    log('trace', 'Need at least two elements', { where: condition });
  });

  return query;
}

module.exports.connect = connect;
module.exports.get = get;
module.exports.put = put;
module.exports.del = del;
module.exports.getBy = getBy;
module.exports.getByField = getByField;
