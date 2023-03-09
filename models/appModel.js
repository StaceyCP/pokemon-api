const db = require("../db/connection");

exports.fetchPokemon = () => {
  const getPokemonQueryStr = `SELECT * FROM pokemon;`;
  return db.query(getPokemonQueryStr).then((response) => {
    return response.rows;
  });
};

exports.fetchAbilities = () => {
  const getAbilitiesQueryStr = `SELECT * FROM abilities;`;
  return db.query(getAbilitiesQueryStr).then((response) => {
    return response.rows;
  });
};
