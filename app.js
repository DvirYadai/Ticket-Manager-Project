const express = require("express");
const cors = require("cors");
const ticketRoute = require("./routes/ticket");
const userRoute = require("./routes/userAuth");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const { checkUser } = require("./middleware/authMiddleware");

app.use(cors());
morgan.token("type", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :type :remote-addr [:date[clf]]"
  )
);

// app.use(express.static("client/build"));

app.use(express.json());
app.use(cookieParser());

app.use("/api/tickets", checkUser, ticketRoute);
app.use("/api/user", userRoute);

module.exports = app;
