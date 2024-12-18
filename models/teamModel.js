const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    prizepool: {
      type: Number,
      required: true,
      default: 3375,
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
    },
  },
  {
    timestamps: true,
  }
);
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
