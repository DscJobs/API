const { Schema, model } = require('mongoose');

module.exports = model("reviews", new Schema({
    userID: { type: String, default: "" },
    cv: { type: String, default: "" },
    content: { type: String, default: "" },
    likes: { type: Array, default: [] },
    reports: { type: Array, default: [] },
    pending: { type: Boolean, default: false },
    flagged: { type: Boolean, default: false },
    allowed: { type: Boolean, default: false },
    rate: { type: Number, default: 0 },
    date: { type: Number, default: Date.now() },
}));