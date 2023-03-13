const express = require("express");
const { handleServerErrors, handleCustomErrors } = require("./errors");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());
app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = { app };
