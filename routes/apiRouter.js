const apiRouter = require("express").Router();
const pokemonRouter = require("./pokemonRouter");
const abilitiesRouter = require("./abilitiesRouter");

apiRouter.use("/pokemon", pokemonRouter);
apiRouter.use("/abilities", abilitiesRouter);

module.exports = apiRouter;
