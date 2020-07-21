# Chatroom

## Requirements

- Node v12.13.0
- npm 6.12.0
- Docker

### Install all the packages

```sh
npm i
```

## Commands

Please run each command in this order and in different terminals.

### Databases with docker-compose

Postgres ([localhost:5432](http://localhost:5432)) for the data storage and Redis ([localhost:6379](http://localhost:6379)) for the event bus.

```sh
npm run start-db
```

### RESTful api

API running on [localhost:3000](http://localhost:3000) containing the messages, users and group chats of the app.

Migrations will run if it's the first time you are starting the project.

```sh
npm run start-api
```

### Websocket

Running on [ws://localhost:8080](http://ws://localhost:8080) is the websocket the client uses to get the data from the Redis event bus.

```sh
npm run start-websocket
```

### Stock_bot

This bot listens to each message and executes the `/stock` command. (e.g: `/stock=aapl.us`)

```sh
npm run start-bot
```

## Open the client

You have to open [`client/homepage.html`](client/homepage.html) on your web browser.

