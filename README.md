# Chatroom

## Requirements

- Node v12.13.0
- npm 6.12.0
- Docker

## Commands

### Install all the packages

```sh
npm i
```

### Databases with docker-compose

```sh
npm run start-db
```

Postgres for the data storage and Redis for the event bus.

### RESTful api

```sh
npm run start-api
```

API containing the messages, users and group chats of the app.

Migrations will run if it's the first time you are running the project.

### Websocket

```sh
npm run start-websocket
```

This is the websocket the client uses to get the data from Redis event bus.
