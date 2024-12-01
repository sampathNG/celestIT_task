const Team = require("../models/teamModel");
const User = require("../models/userModel");
const League = require("../models/leagueModel");
const createTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const newTeam = new Team(req.body);
    const teamr = await newTeam.save();
    if (!teamr) {
      return res.status(400).json({ error: "team not saved" });
    }
    const ids = teamr._id;
    const league = await League.findById(id);
    league.team.push(ids);
    if (!league) {
      return res.status(404).json({ error: "League not found" });
    }
    res.status(201).json(teamr);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const teamr = await Team.findById(id);
    res.status(200).json(teamr);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const teamr = await Team.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(teamr);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteTeam = async (req, res) => {
  try {
    const id = req.params.idl;
    const ids = req.params.idr;
    const teamr = await Team.findByIdAndDelete(id);
    if (!teamr) {
      return res.status(404).json({ error: "team not found" });
    }
    const league = await League.findById(ids);
    if (!league) {
      return res.status(404).json({ error: "League not found" });
    }
    league.team.pull(teamr._id);
    res.status(200).json(teamr);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const joinTeam = async (req, res) => {
  try {
    const teams = await Team.findById(req.params.id);
    if (!teams) {
      return res.status(404).json({ error: "teams not found" });
    }
    const users = await user.findById(req.user.id);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    if (teams.players.includes(users._id)) {
      return res.status(400).json({ error: "User already joined" });
    }
    if (teams.currentNumberOfPlayers.length >= teams.maxPlayers) {
      return res.status(400).json({ error: "teams is full" });
    }
    teams.players.push(users._id);
    teams.currentNumberOfPlayers += 1;
    const ids = req.user.id;
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { team: ids } },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await teams.save();
    res.status(200).json({ message: "User joined successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const leaveTeam = async (req, res) => {
  try {
    const teams = await team.findById(req.params.id);
    if (!teams) {
      return res.status(404).json({ error: "teams not found" });
    }
    const users = await user.findById(req.user.id);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    const ids = req.user.id;
    if (!teams.players.includes(user._id)) {
      return res.status(400).json({ error: "User not joined" });
    }
    const initialPlayerCount = teams.players.length;
    teams.players.pull(user._id);
    if (teams.players.length < initialPlayerCount) {
      teams.currentNumberOfPlayers -= 1;
    }
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { team: ids } },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await teams.save();
    res.status(200).json({ message: "User left successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMany = async (req, res) => {
  try {
    // const leagueId = req.params.id;
    // const league = await League.findById(leagueId);
    // if (!league) {
    //   return res.status(404).json({ error: "League not found" });
    // }
    // const deletedTeams = await Team.deleteMany({ _id: { $in: league.team } });
    // league.team = [];
    // await league.save();
    await Team.deleteMany();
    res.status(200).json("all teams deleted");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  deleteMany,
  joinTeam,
  leaveTeam,
};
