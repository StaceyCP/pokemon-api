const abilitiesRouter = require("express").Router();
const {
  getAllAbilities,
  getAbilityById,
} = require("../controllers/appController");

abilitiesRouter.route("/").get(getAllAbilities);
abilitiesRouter.route("/:id").get(getAbilityById);

module.exports = abilitiesRouter;
