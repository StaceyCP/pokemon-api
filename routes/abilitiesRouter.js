const abilitiesRouter = require("express").Router();
const { getAllAbilities } = require("../controllers/appController");

abilitiesRouter.route("/").get(getAllAbilities);

module.exports = abilitiesRouter;
