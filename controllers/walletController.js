const wallet = require("../models/walletModel");
const user = require("../models/userModel");
const createwallet = async (req, res) => {
  try {
    const { balance, referEarned } = req.body;
    const newwallet = new wallet({
      balance,
      referEarned,
    });
    const walletr = await newwallet.save();
    const id = req.user.id;
    await user.findByIdAndUpdate(
      { _id: id },
      { wallet: walletr._id },
      { new: true }
    );
    res.status(201).json(walletr);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getwallets = async (req, res) => {
  try {
    const wallets = await wallet.find();
    res.status(200).json(wallets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getwalletById = async (req, res) => {
  try {
    const id = req.user.id;
    const userDoc = await user.findById(id);
    if (!userDoc) {
      return res.status(404).json({ message: "User  not found" });
    }
    const walletId = userDoc.wallet;
    if (!walletId) {
      return res
        .status(404)
        .json({ message: "Wallet not found for this user" });
    }
    const walletDoc = await wallet.findById(walletId);
    if (!walletDoc) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json(walletDoc);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updatewallet = async (req, res) => {
  const _id = req.user.id;
  const userDoc = await user.findById(_id);
  if (!userDoc) {
    return res.status(404).json({ message: "User  not found" });
  }
  const id = userDoc.wallet;
  if (!id) {
    return res.status(404).json({ message: "Wallet not found for this user" });
  }
  var { balance, referEarned } = req.body;
  balance = referEarned + balance;
  const updatedwallet = {
    balance,
    referEarned,
  };
  try {
    const walletrs = await wallet.findByIdAndUpdate(id, updatedwallet, {
      new: true,
    });
    res.status(200).json(walletrs);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deletewallet = async (req, res) => {
  try {
    const _id = req.user.id;
    const userDoc = await user.findById(_id);
    if (!userDoc) {
      return res.status(404).json({ message: "User  not found" });
    }
    const id = userDoc.wallet;
    if (!id) {
      return res
        .status(404)
        .json({ message: "Wallet not found for this user" });
    }
    const walletds = await wallet.findByIdAndDelete(id);
    const userDocs = await user.findOneAndUpdate(
      { email: email },
      { $unset: { wallet: "" } },
      { new: true }
    );
    // const walletds = await wallet.deleteMany();
    res.status(200).json(walletds);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteMany = async (req, res) => {
  try {
    const walletds = await wallet.deleteMany();
    res.status(200).json(walletds);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports = {
  createwallet,
  getwallets,
  getwalletById,
  updatewallet,
  deletewallet,
  deleteMany,
};
