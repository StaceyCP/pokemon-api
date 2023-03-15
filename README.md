# Pokemon API

## Introduction

This is a personal project creating a database containing pokemon and an API to interact with the database, types, generations and abilities.

Currently the Pokemon API is written using, JavaScript and Node.js with the Express framework.

## URL's

- The deployed version of [Pokemon API](https://pokemon-api-eb4q.onrender.com/api/) is hosted via Render.

- The deployed fullstack [Pokedex](https://lustrous-quokka-db794f.netlify.app/) is hosted using Netlify.

## Requests

- **GET** _/pokemon_ Returns a complete list of pokemon
- **GET** _/pokemon/:identifier_ Returns the matching pokemon identifier can be either id or name
- **GET** _/abilities_ Returns a complete list of abilities
- **GET** _/types_ Returns a complete list of types
- **GET** _/generations_ Returns a complete list of generations

## Installation Guide

1. Clone this repository to your local machine via your terminal using command _'git clone https://github.com/StaceyCP/pokedex.git'_ in your chosen directory location.

2. Run _'npm install'_ to install all dependencies. You will need:

   > - **cors** _v2.8.5_
   > - **dotenv** _v16.0.3_
   > - **express** _v4.18.2_
   > - **husky** _v8.0.3_
   > - **nodemon** _v2.0.20_
   > - **socket.io** _v4.6.1_
   > - **jest** _v29.4.3_
   > - **supertest** _v6.3.3_
   > - **jest-sorted** _v1.0.14_
   > - **jest-extended** _v3.2.4_
   > - **pg** _v8.8.0_
   > - **pg-format** _v1.0.4_

3. Create the following environment variables to allow for the API to access the development and test databases:

> - **.env.development** - Add command _'PGDATABASE=pokemon'_ to set access to a developer database.
>
> - **.env.test** - Add command _'PGDATABASE=pokemon_test'_ to set access to the test database when Jest is running.

4. Use command _'npm run seed'_ to seed your local development database.

5. Test features using jest via command _'npm test'_.

6. Use command _'npm run start'_ to start the app on local port 9090.
