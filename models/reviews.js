const { Schema, model } = require("mongoose");

module.exports = model(
  "reviews",
  new Schema({
    // Strings
    userID: { type: String, default: "" },
    cv: { type: String, default: "" },
    content: { type: String, default: "" },
    // Arrays
    likes: { type: Array, default: [] },
    reports: { type: Array, default: [] },
    // Boolean
    pending: { type: Boolean, default: false },
    flagged: { type: Boolean, default: false },
    allowed: { type: Boolean, default: false },
    // Numbers
    rate: { type: Number, default: 0 },
    date: { type: Number, default: Date.now() },
  })
);