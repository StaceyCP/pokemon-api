const pokemonRouter = require("express").Router();
const { getPokemon } = require("../controllers/appController");

pokemonRouter.route("/").get(getPokemon);

module.exports = pokemonRouter;
