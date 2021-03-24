const express = require("express");
const cors = require("cors");
const ticketRoute = require("./routes/ticket");
const morgan = require("morgan");
const app = express();

app.use(cors());
morgan.token("type", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :type :remote-addr [:date[clf]]"
  )
);
app.use(express.json());
app.use("/api/tickets", ticketRoute);
app.use(express.static("client/build"));

module.exports = app;
