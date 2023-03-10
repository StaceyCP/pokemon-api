const { getTypes } = require("../controllers/appController");
const typesRouter = require("express").Router();

typesRouter.route("/").get(getTypes);

module.exports = typesRouter;
