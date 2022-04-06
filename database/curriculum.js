const { Schema, model } = require('mongoose');

module.exports = model('users', new Schema({
    userID: { type: String, default: "" },
    overview: { type: String, default: "" },
    hire: { type: String, default: "" },
    birthday: { type: String, default: "" },
    link: { type: String, default: "" },
    email: { type: String, default: "" },
    job: { type: String, default: "" },
    vanity: { type: String, default: "" },
    private: { type: Boolean, default: false },
    developer: { type: Boolean, default: false },
    current: { type: Boolean, default: false },
    exp_toggle: { type: Boolean, default: false },
    nitro: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    date: { type: Number, default: 0 },
    details: {
      type: Array,
      default: [
        {
          exp_servers: { type: Number, default: 0 },
          exp: { type: Number, default: 0 },
          active: { type: Number, default: 0 },
          salary: { type: Number, default: 0 },
        },
      ],
    },
    servers: { type: Map, default: {} },
}));