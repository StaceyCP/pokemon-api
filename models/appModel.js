const db = require("../db/connection");

exports.fetchPokemon = () => {
  const getPokemonQueryStr = `SELECT pokemon.*, 
  ARRAY_AGG (pokemon_types.type) AS type 
  FROM pokemon 
  JOIN pokemon_types ON pokemon.name = pokemon_types.name 
  GROUP BY pokemon.id 
  ORDER BY pokemon.id ASC;`;
  return db.query(getPokemonQueryStr).then((response) => {
    return response.rows;
  });
};

exports.fetchSinglePokemon = (identifier) => {
  let getSinglePokemonStr;
  if (isNaN(identifier)) {
    getSinglePokemonStr = `SELECT pokemon.*, 
    ARRAY_AGG (pokemon_types.type) AS type 
    FROM pokemon 
    JOIN pokemon_types ON pokemon.name = pokemon_types.name 
    WHERE pokemon.name = $1
    GROUP BY pokemon.id 
    ORDER BY pokemon.id ASC;`;
  } else {
    getSinglePokemonStr = `SELECT pokemon.*, 
    ARRAY_AGG (pokemon_types.type) AS type 
    FROM pokemon 
    JOIN pokemon_types ON pokemon.name = pokemon_types.name 
    WHERE pokemon.id = $1
    GROUP BY pokemon.id 
    ORDER BY pokemon.id ASC;`;
  }
  return db.query(getSinglePokemonStr, [identifier]).then((response) => {
    if (response.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Pokemon not found :(" });
    }
    return response.rows[0];
  });
};

exports.fetchAbilities = () => {
  const getAbilitiesQueryStr = `SELECT * FROM abilities;`;
  return db.query(getAbilitiesQueryStr).then((response) => {
    return response.rows;
  });
};

exports.fetchGenerations = () => {
  const getGenerationsQueryStr = `SELECT * FROM generations;`;
  return db.query(getGenerationsQueryStr).then((response) => {
    return response.rows;
  });
};

exports.fetchTypes = () => {
  const getTypesQueryStr = `SELECT * FROM types;`;
  return db.query(getTypesQueryStr).then((response) => {
    return response.rows;
  });
};
