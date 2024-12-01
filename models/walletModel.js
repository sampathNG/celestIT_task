const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      required: true,
    },
    token: {
      type: Number,
      required: true,
      default: 0,
    },
    referEarned: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const wallet = mongoose.model("Wallet", walletSchema);
module.exports = wallet;
