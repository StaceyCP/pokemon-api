const { fetchPokemon, fetchAbilities } = require("../models/appModel");

exports.getPokemon = (req, res, next) => {
  fetchPokemon()
    .then((pokemon) => {
      res.status(200).send({ pokemon });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllAbilities = (req, res, next) => {
  fetchAbilities().then((abilities) => {
    res.status(200).send({ abilities });
  });
};
