const apiRouter = require("express").Router();
const pokemonRouter = require("./pokemonRouter");

apiRouter.use("/pokemon", pokemonRouter);

module.exports = apiRouter;
