const { getTypes, getTypeByName } = require("../controllers/appController");
const typesRouter = require("express").Router();

typesRouter.route("/").get(getTypes);
typesRouter.route("/:typeName").get(getTypeByName);

module.exports = typesRouter;
