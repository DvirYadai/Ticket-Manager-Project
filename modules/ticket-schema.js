const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  content: String,
  userEmail: String,
  done: Boolean,
  creationTime: Date,
  labels: [String],
});

module.exports = mongoose.model("Ticket", ticketSchema);
