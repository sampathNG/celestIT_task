const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const createSubscription = async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    const savedSubscription = await newSubscription.save();
    res.status(201).json(savedSubscription);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.log("Error fetching subscriptions:", error);
    res.status(404).json({ message: error.message });
  }
};
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateSubscription = async (req, res) => {
  const id = req.params.id;
  const { name, price, duration } = req.body;
  const updatedSubscription = {
    name,
    price,
    duration,
  };
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      updatedSubscription,
      { new: true }
    );
    res.status(200).json(subscription);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteSubscription = async (req, res) => {
  try {
    const id = req.params.id;
    const subscription = await Subscription.findByIdAndDelete(id);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteMany = async (req, res) => {
  try {
    const subscription = await Subscription.deleteMany();
    res.status(200).json(subscription);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const takeSubscription = async (req, res) => {
  try {
    const id = req.params.id;
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const wallet = await Wallet.findById(user.wallet);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    const balance = wallet.balance;
    const price = subscription.price;
    if (balance < price) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    const newBalance = balance - price;
    const updatedWallet = await Wallet.findByIdAndUpdate(
      user.wallet,
      { balance: newBalance },
      { new: true }
    );
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        subscription: id,
        subscriptionEndDate,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const cancelSubscription = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const wallet = await Wallet.findById(user.wallet);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    const balance = wallet.balance;
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    const price = subscription.price;
    const newBalance = balance + price;
    const updatedWallet = await Wallet.findByIdAndUpdate(
      user.wallet,
      { balance: newBalance },
      { new: true }
    );
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        subscription: null,
        subscriptionEndDate: null,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const checkSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const subscription = await Subscription.findById(user.subscription);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    const subscriptionEndDate = user.subscriptionEndDate;
    const currentDate = new Date();
    if (subscriptionEndDate < currentDate) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          subscription: null,
          subscriptionEndDate: null,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getSubscriptionByUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const subscription = await Subscription.findById(user.subscription);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription.name);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports = {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  deleteMany,
  takeSubscription,
  cancelSubscription,
  checkSubscription,
  getSubscriptionByUser,
};
