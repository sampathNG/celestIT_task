const mongoose = require("mongoose");
const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    entryFee: {
      type: Number,
      required: true,
      default: 4,
    },
    players: {
      type: Array,
      required: true,
      default: [],
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const League = mongoose.model("League", leagueSchema);
module.exports = League;
