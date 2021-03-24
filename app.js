const express = require("express");
const cors = require("cors");
const ticketRoute = require("./routes/ticket");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tickets", ticketRoute);
app.use(express.static("client/build"));

module.exports = app;
