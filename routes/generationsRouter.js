const { getGenerations } = require("../controllers/appController");
const generationsRouter = require("express").Router();

generationsRouter.route("/").get(getGenerations);

module.exports = generationsRouter;
