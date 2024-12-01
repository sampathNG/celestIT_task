const League = require("../models/leagueModel");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const createleague = async (req, res) => {
  try {
    const newleague = new League(req.body);
    await newleague.save();
    res.status(201).json(newleague);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getleague = async (req, res) => {
  try {
    const leagues = await League.find();
    res.status(200).json(leagues);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getleagueById = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    res.status(200).json(league);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateleague = async (req, res) => {
  try {
    const id = req.params.id;
    const league = await League.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(league);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteleague = async (req, res) => {
  try {
    const id = req.params.id;
    const league = await League.findByIdAndDelete(id);
    res.status(200).json(league);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteMany = async (req, res) => {
  try {
    await League.deleteMany();
    res.status(200).json(league);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const joinLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ error: "League not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (league.players.includes(user._id)) {
      return res.status(400).json({ error: "User already joined" });
    }
    league.players.push(user._id);
    const wallet = await Wallet.findById({ _id: user.wallet });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const balance = wallet.balance;
    const price = league.entryFee;
    const newBalance = balance - price;
    const updatedWallet = await Wallet.findByIdAndUpdate(
      user.wallet,
      { balance: newBalance },
      { new: true }
    );
    if (!updatedWallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const ids = req.user.id;
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { league: ids } },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await league.save();
    res.status(200).json({ message: "User joined successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const leaveLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ error: "League not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!league.players.includes(user._id)) {
      return res.status(400).json({ error: "User not joined" });
    }
    league.players.pull(user._id);
    const ids = req.user.id;
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { league: ids } },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await league.save();
    res.status(200).json({ message: "User left successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createleague,
  getleague,
  getleagueById,
  updateleague,
  deleteleague,
  deleteMany,
  joinLeague,
  leaveLeague,
};
