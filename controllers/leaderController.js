// const leader = require("../models/leaderBoardModel");
const LeaderBoard = require("../models/leaderBoardModel");

const User = require("../models/userModel");
const wallet = require("../models/walletModel");
const deleteMany = async (req, res) => {
  try {
    const leaders = await LeaderBoard.deleteMany();
    res.status(200).json("deleted all leader boards");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const createleader = async (req, res) => {
  try {
    const newleader = await User.aggregate([
      {
        $lookup: {
          from: "wallets",
          localField: "wallet",
          foreignField: "_id",
          as: "wallet",
        },
      },
      {
        $unwind: "$wallet",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          score: "$wallet.balance",
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
        },
      },
      {
        $sort: { score: -1 },
      },
    ]);
    const leaderBoardEntry = new LeaderBoard({
      score: newleader,
      date: new Date(),
    });
    await leaderBoardEntry.save();
    res.status(201).json("success");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getleader = async (req, res) => {
  try {
    const leaders = await LeaderBoard.find().sort({ score: -1 });
    res.status(200).json(leaders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getleaderById = async (req, res) => {
  try {
    const leader = await LeaderBoard.findById(req.params.id);
    res.status(200).json(leader);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateleader = async (req, res) => {
  try {
    const id = req.params.id;
    const leader = await LeaderBoard.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(leader);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteleader = async (req, res) => {
  try {
    const id = req.params.id;
    const leader = await LeaderBoard.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports = {
  createleader,
  getleader,
  getleaderById,
  updateleader,
  deleteleader,
  deleteMany,
};
