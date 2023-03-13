const {
  fetchPokemon,
  fetchSinglePokemon,
  fetchAbilities,
  fetchGenerations,
  fetchTypes,
} = require("../models/appModel");

exports.getPokemon = (req, res, next) => {
  fetchPokemon()
    .then((pokemon) => {
      res.status(200).send({ pokemon });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSinglePokemon = (req, res, next) => {
  const { identifier } = req.params;
  fetchSinglePokemon(identifier)
    .then((pokemon) => {
      res.status(200).send({ pokemon });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllAbilities = (req, res, next) => {
  fetchAbilities()
    .then((abilities) => {
      res.status(200).send({ abilities });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getGenerations = (req, res, next) => {
  fetchGenerations()
    .then((generations) => {
      res.status(200).send({ generations });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getTypes = (req, res, next) => {
  fetchTypes()
    .then((types) => {
      res.status(200).send({ types });
    })
    .catch((err) => {
      next(err);
    });
};
