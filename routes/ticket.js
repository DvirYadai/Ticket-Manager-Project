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

router.patch("/:ticketId/done", (req, res) => {
  const { ticketId } = req.params;
  Ticket.findByIdAndUpdate(ticketId, { done: true }, { new: true })
    .then((ticket) => {
      console.log(ticket);
      return res.status(200).json({ updated: true });
    })
    .catch((err) => {
      return res.status(404).send("There is no such id");
    });
});

module.exports = router;
