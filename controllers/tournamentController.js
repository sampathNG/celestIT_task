const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const Tournament = require("../models/tournamentModel");
const createTournament = async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ message: "Tournament deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const joinTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    const ids = req.params.id;
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (tournament.players.includes(user._id)) {
      return res.status(400).json({ error: "User already joined" });
    }
    if (tournament.currentNumberOfPlayers.length >= tournament.maxPlayers) {
      return res.status(400).json({ error: "Tournament is full" });
    }
    tournament.players.push(user._id);
    tournament.currentNumberOfPlayers += 1;
    // update wallet
    const wallet = await Wallet.findById({ _id: user.wallet });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const balance = wallet.balance;
    const price = tournament.entryFee;
    const newBalance = balance - price;
    const updatedWallet = await Wallet.findByIdAndUpdate(
      user.wallet,
      { balance: newBalance },
      { new: true }
    );
    if (!updatedWallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { tournaments: ids } },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await tournament.save();
    res.status(200).json({ message: "User joined successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const leaveTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    const ids = req.params.id;
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!tournament.players.includes(user._id)) {
      return res.status(400).json({ error: "User not joined" });
    }
    const initialPlayerCount = tournament.players.length;
    tournament.players.pull(user._id);
    if (tournament.players.length < initialPlayerCount) {
      tournament.currentNumberOfPlayers -= 1;
    }
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { tournaments: ids } },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await tournament.save();
    res.status(200).json({ message: "User left successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayers = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentWinner = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const winner = await User.findById(tournament.winner);
    if (!winner) {
      return res.status(404).json({ error: "Winner not found" });
    }
    res.status(200).json(winner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPrize = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ prize: tournament.prize });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const getTournamentEntryFee = async (req, req){
//     const getTournamentPlayersWalletsAmountAverage = async (req, res) => {
//       try {
//         const tournament = await Tournament.findById(req.params.id);
//         if (!tournament) {
//           return res.status(404).json({ error: "Tournament not found" });
//         }
//         const players = await User.find({ _id: { $in: tournament.players } });
//         res.status(200).json(
//           players
//             .map((player) => player.wallet.amount)
//             .reduce((a, b) => a + b, 0) / players.length
//         );
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     };
//     const getTournamentPlayersWalletsAmountMax = async (req, res) => {
//       try {
//         const tournament = await Tournament.findById(req.params.id);
//         if (!tournament) {
//           return res.status(404).json({ error: "Tournament not found" });
//         }
//         const players = await User.find({ _id: { $in: tournament.players } });
//         res.status(200).json(Math.max(...players.map((player) => player.wallet.amount)));
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     };
//     const getTournamentPlayersWalletsAmountMin = async (req, res) => {
//       try {
//         const tournament = await Tournament.findById(req.params.id);
//         if (!tournament) {
//           return res.status(404).json({ error: "Tournament not found" });
//         }
//         const players = await User.find({ _id: { $in: tournament.players } });
//         res.status(200).json(Math.min(...players.map((player) => player.wallet.amount)));
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     };
//     const getTournamentPlayersWalletsAmountMedian = async (req, res) => {
//       try {
//         const tournament = await Tournament.findById(req.params.id);
//         if (!tournament) {
//           return res.status(404).json({ error: "Tournament not found" });
//         }
//         const players = await User.find({ _id: { $in: tournament.players } });
//         res.status(200).json(
//           players
//             .map((player) => player.wallet.amount)
//             .sort((a, b) => a - b)[Math.floor(players.length / 2)]
//         );
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     };es) => {
//   try {
//     const tournament = await Tournament.findById(req.params.id);
//     if (!tournament) {
//       return res.status(404).json({ error: "Tournament not found" });
//     }
//     res.status(200).json({ entryFee: tournament.entryFee });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const getTournamentMaxPlayers = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ maxPlayers: tournament.maxPlayers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentMinPlayers = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ minPlayers: tournament.minPlayers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentStartDate = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ startDate: tournament.startDate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentEndDate = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ endDate: tournament.endDate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentStatus = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ status: tournament.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//
const getTournamentPlayersWalletsAmountAverage = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res
      .status(200)
      .json(
        players
          .map((player) => player.wallet.amount)
          .reduce((a, b) => a + b, 0) / players.length
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersWalletsAmountMax = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res
      .status(200)
      .json(Math.max(...players.map((player) => player.wallet.amount)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersWalletsAmountMin = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res
      .status(200)
      .json(Math.min(...players.map((player) => player.wallet.amount)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersWalletsAmountMedian = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res
      .status(200)
      .json(
        players.map((player) => player.wallet.amount).sort((a, b) => a - b)[
          Math.floor(players.length / 2)
        ]
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentWinnerId = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ winner: tournament.winner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersCount = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ playersCount: tournament.players.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersIds = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.status(200).json({ players: tournament.players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersNames = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res.status(200).json(players.map((player) => player.name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersWallets = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res.status(200).json(players.map((player) => player.wallet));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersWalletsAmount = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res.status(200).json(players.map((player) => player.wallet.amount));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTournamentPlayersWalletsAmountTotal = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    const players = await User.find({ _id: { $in: tournament.players } });
    res
      .status(200)
      .json(
        players.map((player) => player.wallet.amount).reduce((a, b) => a + b, 0)
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteManyTournments = async (req, res) => {
  try {
    const tournments = await Tournament.deleteMany();
    res.status(200).json(tournments);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports = {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  joinTournament,
  leaveTournament,
  getTournamentStatus,
  deleteManyTournments,
};
