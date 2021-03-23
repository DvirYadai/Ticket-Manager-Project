const express = require("express");
const ticketRoute = require("./routes/ticket");
const app = express();

app.use("/api/tickets", ticketRoute);
app.use(express.static("client/build"));

module.exports = app;
