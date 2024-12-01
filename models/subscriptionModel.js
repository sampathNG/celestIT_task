const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  users: {
    type: Array,
    default: [],
  },
  description: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 30,
  },
  subscriptionStartDate: {
    type: Date,
    default: Date.now,
  },
  subscriptionEndDate: {
    type: Date,
    default: Date.now,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
