const { fetchPokemon } = require("../models/appModel");

exports.getPokemon = (req, res, next) => {
  fetchPokemon().then((pokemon) => {
    res.status(200).send({ pokemon });
  });
};
