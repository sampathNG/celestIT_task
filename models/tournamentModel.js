const mongoose = require("mongoose");
const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    prizePool: {
      type: Number,
      required: true,
      default: 15,
    },
    prizes: {
      type: Array,
      required: true,
      default: [],
    },
    players: {
      type: Array,
      required: true,
      default: [],
    },
    currentNumberOfPlayers: {
      type: Number,
      required: true,
      default: 0,
    },
    maxPlayers: {
      type: Number,
      required: true,
      default: 512,
    },
    entryFee: {
      type: Number,
      required: true,
      default: 50,
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
