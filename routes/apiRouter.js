const apiRouter = require("express").Router();
const pokemonRouter = require("./pokemonRouter");
const abilitiesRouter = require("./abilitiesRouter");
const generationsRouter = require("./generationsRouter");

apiRouter.use("/pokemon", pokemonRouter);
apiRouter.use("/abilities", abilitiesRouter);
apiRouter.use("/generations", generationsRouter);

module.exports = apiRouter;
