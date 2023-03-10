const apiRouter = require("express").Router();
const pokemonRouter = require("./pokemonRouter");
const abilitiesRouter = require("./abilitiesRouter");
const generationsRouter = require("./generationsRouter");
const typesRouter = require("./typesRouter");

apiRouter.use("/pokemon", pokemonRouter);
apiRouter.use("/abilities", abilitiesRouter);
apiRouter.use("/generations", generationsRouter);
apiRouter.use("/types", typesRouter);

module.exports = apiRouter;
