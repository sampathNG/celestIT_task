const mongoose = require("mongoose");
const leaderBoardSchema = new mongoose.Schema(
  {
    score: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const LeaderBoard = mongoose.model("LeaderBoard", leaderBoardSchema);
module.exports = LeaderBoard;
