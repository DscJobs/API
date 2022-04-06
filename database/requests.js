const { Schema, model } = require('mongoose');

module.exports = model("requests", new Schema({
    userID: { type: String, default: '' },
    cv: { type: String, default: '' },
    content: { type: String, default: '' },
    tag: { type: String, default: '' }
}));