const pokemonRouter = require("express").Router();
const {
  getPokemon,
  getSinglePokemon,
} = require("../controllers/appController");

pokemonRouter.route("/").get(getPokemon);
pokemonRouter.route("/:identifier").get(getSinglePokemon);

module.exports = pokemonRouter;
