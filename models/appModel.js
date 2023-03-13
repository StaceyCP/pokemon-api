const db = require("../db/connection");

exports.fetchPokemon = () => {
  const getPokemonQueryStr = `SELECT * FROM pokemon;`;
  return db.query(getPokemonQueryStr).then((response) => {
    return response.rows;
  });
};

exports.fetchSinglePokemon = (identifier) => {
  let getSinglePokemonStr;
  if (isNaN(identifier)) {
    getSinglePokemonStr = `SELECT * FROM pokemon 
    WHERE name = $1`;
  } else {
    getSinglePokemonStr = `SELECT * FROM pokemon 
    WHERE id = $1`;
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
