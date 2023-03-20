const {
  fetchPokemon,
  fetchSinglePokemon,
  fetchAbilities,
  fetchAbilityById,
  fetchGenerations,
  fetchTypes,
  fetchTypeByName,
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

exports.getAbilityById = (req, res, next) => {
  const { id } = req.params;
  fetchAbilityById(id)
    .then((ability) => {
      res.status(200).send({ ability });
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

exports.getTypeByName = (req, res, next) => {
  const { typeName } = req.params;
  fetchTypeByName(typeName)
    .then((type) => {
      res.status(200).send({ type });
    })
    .catch((err) => {
      next(err);
    });
};
