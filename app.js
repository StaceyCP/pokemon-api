const express = require("express");
const { handleServerErrors } = require("./errors");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use("/api", apiRouter);

app.use(handleServerErrors);

module.exports = { app };
