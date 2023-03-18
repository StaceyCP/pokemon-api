const db = require("../db/connection");

exports.fetchPokemon = () => {
  const getPokemonQueryStr = `SELECT pokemon.*, 
  ARRAY_AGG (DISTINCT pokemon_types.type) AS type,
  ARRAY_AGG (DISTINCT pokemon_abilities.ability) AS abilities
  FROM pokemon 
  JOIN pokemon_types ON pokemon.name = pokemon_types.name 
  JOIN pokemon_abilities ON pokemon.name = pokemon_abilities.name
  GROUP BY pokemon.id;`;
  return db.query(getPokemonQueryStr).then((response) => {
    return response.rows;
  });
};

exports.fetchSinglePokemon = (identifier) => {
  let getSinglePokemonStr;
  if (isNaN(identifier)) {
    getSinglePokemonStr = `SELECT pokemon.*, 
    ARRAY_AGG (DISTINCT pokemon_types.type) AS type,
    ARRAY_AGG (DISTINCT pokemon_abilities.ability) AS abilities
    FROM pokemon 
    JOIN pokemon_types ON pokemon.name = pokemon_types.name 
    JOIN pokemon_abilities ON pokemon.name = pokemon_abilities.name
    WHERE pokemon.name = $1
    GROUP BY pokemon.id;`;
  } else {
    getSinglePokemonStr = `SELECT pokemon.*, 
    ARRAY_AGG (DISTINCT pokemon_types.type) AS type, 
    ARRAY_AGG (DISTINCT pokemon_abilities.ability) AS abilities
    FROM pokemon 
    JOIN pokemon_types ON pokemon.name = pokemon_types.name 
    JOIN pokemon_abilities ON pokemon.name = pokemon_abilities.name
    WHERE pokemon.id = $1
    GROUP BY pokemon.id;`;
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
  const getTypesQueryStr = `SELECT types .*, 
  ARRAY_AGG(pokemon_types.name) AS pokemon 
  FROM types 
  LEFT JOIN pokemon_types on types.type = pokemon_types.type 
  GROUP BY types.type;`;
  return db.query(getTypesQueryStr).then((response) => {
    return response.rows;
  });
};

exports.fetchTypeByName = (typeName) => {
  const getTypeByNameQueryStr = `SELECT types .*, 
  ARRAY_AGG(pokemon_types.name) AS pokemon 
  FROM types 
  LEFT JOIN pokemon_types on types.type = pokemon_types.type 
  WHERE types.type = $1
  GROUP BY types.type;`;
  return db.query(getTypeByNameQueryStr, [typeName]).then((response) => {
    return response.rows[0];
  });
};
