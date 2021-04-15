const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require("../modules/ticket-schema");

const checkLocals = (req, res) => {
  if (res.locals.user === null) {
    return res.status(401).json({ massage: "Unauthorized user" });
  }
};

router.get("/", (req, res) => {
  checkLocals(req, res);
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

router.post("/post", (req, res) => {
  checkLocals(req, res);
  const { body } = req;

  const newTicket = new Ticket({
    title: body.title,
    content: body.content,
    userEmail: body.userEmail,
    done: false,
    creationTime: body.creationTime,
    labels: body.labels,
  });
  newTicket
    .save()
    .then(() => {
      Ticket.find().then((arr) => {
        return res.status(200).json(arr);
      });
    })
    .catch((err) => res.status(500).send(err.message));
});

router.delete("/:ticketId", (req, res) => {
  checkLocals(req, res);
  const { ticketId } = req.params;

  Ticket.findOneAndDelete({ _id: ticketId })
    .then(() => {
      Ticket.find().then((arr) => {
        return res.status(200).json(arr);
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.patch("/:ticketId/done", (req, res) => {
  checkLocals(req, res);
  const { ticketId } = req.params;
  Ticket.findByIdAndUpdate(ticketId, { done: true }, { new: true })
    .then((ticket) => {
      return res.status(200).json({ updated: true });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.patch("/:ticketId/undone", (req, res) => {
  checkLocals(req, res);
  const { ticketId } = req.params;
  Ticket.findByIdAndUpdate(ticketId, { done: false }, { new: true })
    .then((ticket) => {
      return res.status(200).json({ updated: true });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;
