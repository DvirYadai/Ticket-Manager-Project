const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require("../modules/ticket-schema");

router.get("/", (req, res) => {
  const { searchText } = req.query;
  if (searchText !== undefined) {
    Ticket.find({ title: { $regex: `${searchText}`, $options: "i" } })
      .then((arr) => {
        return res.status(200).json(arr);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    Ticket.find()
      .then((arr) => {
        return res.status(200).json(arr);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
});

router.patch("/:ticketId/done", (req, res) => {
  const { ticketId } = req.params;
  Ticket.findByIdAndUpdate(ticketId, { done: true }, { new: true })
    .then((ticket) => {
      return res.status(200).json({ updated: true });
    })
    .catch((err) => {
      return res.status(404).send("There is no such id");
    });
});

router.patch("/:ticketId/undone", (req, res) => {
  const { ticketId } = req.params;
  Ticket.findByIdAndUpdate(ticketId, { done: false }, { new: true })
    .then((ticket) => {
      return res.status(200).json({ updated: true });
    })
    .catch((err) => {
      return res.status(404).send("There is no such id");
    });
});

module.exports = router;
