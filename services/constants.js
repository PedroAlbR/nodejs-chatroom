'use strict';


module.exports.DB_HOST = 'localhost';
module.exports.DB_USER = 'admin';
module.exports.DB_PASSWORD = 'admin';
module.exports.DB_NAME = 'chat';
module.exports.DB_NAME_DEFAULT = 'postgres';
module.exports.DB_PORT = 5432;
module.exports.POSTGRES_SCHEMA = 'public';

module.exports.USERS_TABLE_NAME = 'users';
module.exports.MESSAGES_TABLE_NAME = 'messages';
module.exports.CHATROOM_TABLE_NAME = 'chatroom';

module.exports.USERS_TABLE_STRUCTURE = {
  id: 'TEXT PRIMARY KEY NOT NULL',
  name: 'TEXT',
  password: 'TEXT NOT NULL',
  chatrooms: 'JSONB'
};

module.exports.MESSAGES_TABLE_STRUCTURE = {
  id: 'SERIAL PRIMARY KEY',
  date: 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
  username_id: 'TEXT NOT NULL',
  message: 'TEXT NOT NULL',
  chatroom_id: 'TEXT NOT NULL'
};

module.exports.CHATROOM_TABLE_STRUCTURE = {
  id: 'SERIAL PRIMARY KEY',
  name: 'TEXT NOT NULL'
};
