const db = require("../connection")
const format = require('pg-format')

const seed = ({generations, types}) => {
    return db
        .query('DROP TABLE IF EXISTS abilities;')
        .then(() => {
            return db.query('DROP TABLE IF EXISTS pokemon;')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS types;')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS generations;')
        })
        .then(() => {
            return db.query(`CREATE TABLE generations (
                generation VARCHAR(10) PRIMARY KEY,
                newPokemon INT,
                totalPokemon INT
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE types (
                type VARCHAR(150) PRIMARY KEY,
                description TEXT,
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE pokemon (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200),
                spriteURL TEXT,
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE pokemon-types (
                name VARCHAR(200) REFERENCES pokemon(name),
                type VARCHAR(10) REFERENCES types(type)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE abilities (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200),
                description TEXT,
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            const generationsInsertStr = format(`INSERT INTO generations (generation, newPokemon, totalPokemon) 
            VALUES %L RETURNING *;`, generations.map(({generation, newPokemon, totalPokemon}) => {
                return [generation, newPokemon, totalPokemon]
            }))
            return db.query(generationsInsertStr);
        })
        .then(() => {
            const typesInsertStr = format(`INSERT INTO types (type, generation, description)
            VALUES %L RETURNING *;`, types.map(({type, generation, description}) => {
                return [type, generation, description]
            }))
            return db.query(typesInsertStr);
        })
}

module.exports = seed;