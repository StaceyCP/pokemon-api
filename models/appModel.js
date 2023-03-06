const db = require("../db/connection");

exports.fetchPokemon = () => {
  const getPokemonQueryStr = `SELECT * FROM pokemon;`;
  return db.query(getPokemonQueryStr).then((response) => {
    return response.rows;
  });
};
