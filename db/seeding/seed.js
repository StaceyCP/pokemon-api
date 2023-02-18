const db = require("../connection")
const format = require('pg-format')

const seed = ({generations, types, pokemon, pokemonTypes, abilities, pokemonAbilities}) => {
    return db
        .query('DROP TABLE IF EXISTS pokemon_abilities;')
        .then(() => {
            return db.query('DROP TABLE IF EXISTS abilities;')
        })
        .then(() => {
            return db.query('DROP TABLE IF EXISTS pokemon_types;')
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
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE pokemon (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) UNIQUE,
                spriteURL TEXT,
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE pokemon_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) REFERENCES pokemon(name),
                type VARCHAR(10) REFERENCES types(type)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE abilities (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) UNIQUE,
                description TEXT,
                generation VARCHAR(10) REFERENCES generations(generation)
            );`)
        })
        .then(() => {
            return db.query(`CREATE TABLE pokemon_abilities (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) REFERENCES pokemon(name),
                ability varchar(200) REFERENCES abilities(name),
                hidden BOOLEAN
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
        .then(() => {
            const pokemonInsertStr = format(`INSERT INTO pokemon (name, spriteURL, generation)
            VALUES %L RETURNING *;`, pokemon.map(({name, spriteURL, generation}) => {
                return [name, spriteURL, generation]
            }))
            return db.query(pokemonInsertStr);
        })
        .then(() => {
            const pokemon_typesInsertStr = format(`INSERT INTO pokemon_types (name, type)
            VALUES %L RETURNING *;`, pokemonTypes.map(({name, type}) => {
                return [name, type]
            }))
            return db.query(pokemon_typesInsertStr);
        })
        .then(() => {
            const abilitiesInsertstr = format(`INSERT INTO abilities (name, description, generation)
            VALUES %L RETURNING *;`, abilities.map(({name, description, generation}) => {
                return [name, description, generation]
            }))
            return db.query(abilitiesInsertstr);
        })
        .then(() => {
            const pokemon_abilitiesInsertStr = format(`INSERT INTO pokemon_abilities (name, ability, hidden)
            VALUES %L RETURNING *;`, pokemonAbilities.map(({name, ability, hidden}) => {
                return [name, ability, hidden]
            }))
            return db.query(pokemon_abilitiesInsertStr)
        })
}

module.exports = seed;