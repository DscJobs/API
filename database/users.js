const { Schema, model } = require("mongoose");

module.exports = model(
  "members",
  new Schema({
    userID: { type: String, default: "" },
    votes: { type: Array, default: [] },
    rates: { type: Array, default: [] },
    notifications: { type: Map, default: {} },
    banned: { type: Boolean, default: false },
    staff: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    lifetime: { type: Boolean, default: false },
    duration: { type: Number, default: Date.now() },
  })
);
