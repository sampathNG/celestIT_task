const express = require("express");
const router = express.Router();
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  deleteMany,
  joinTeam,
  leaveTeam,
} = require("../controllers/teamController");
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/team", auth, authAdmin, createTeam);
router.get("/team/all", auth, getTeams);
router.get("/team/:id", auth, getTeamById);
router.put("/team/:id", auth, authAdmin, updateTeam);
router.delete("/:idl/team/:idr", auth, authAdmin, deleteTeam);
router.delete("/team/:id", authAdmin, deleteMany);
router.post("/join/:id", auth, joinTeam);
router.post("/leave/:id", auth, leaveTeam);
module.exports = router;
