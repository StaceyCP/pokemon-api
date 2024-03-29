const express = require("express");
const {
  handleServerErrors,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./errors");
const app = express();
const apiRouter = require("./routes/apiRouter");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = { app };
