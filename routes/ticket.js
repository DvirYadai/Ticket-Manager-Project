const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require("../modules/ticket-schema");

router.get("/", (req, res) => {
  Ticket.find()
    .then((arr) => {
      return res.status(200).json(arr);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
