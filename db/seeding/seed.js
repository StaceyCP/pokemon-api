const db = require("../connection")

const seed = () => {
    return db
        .query('DROP TABLE IF EXISTS abilities;')
        .then(() => {
            return db.query('DROP TABLE IF EXISTS moves;')
        })
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
                strengths VARCHAR(100)[],
                weaknesses VARCHAR(100)[],
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE pokemon (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200),
                types VARCHAR(150)[],
                spriteURL TEXT,
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE moves (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200),
                type VARCHAR(150) REFERENCES types(type),
                learnedBy VARCHAR(200)[],
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE abilities (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200),
                description TEXT,
                pokemon VARCHAR(200)[],
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
}

module.exports = seed;