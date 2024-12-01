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
router.post("/create", authAdmin, createTeam);
router.get("/team/all", getTeams);
router.get("/team/:id", auth, getTeamById);
router.put("/update/:id", authAdmin, updateTeam);
router.delete("/:idl/delete/:idr", authAdmin, deleteTeam);
router.delete("/deleted", authAdmin, deleteMany);
router.post("/join/:id", auth, joinTeam);
router.post("/leave/:id", auth, leaveTeam);
module.exports = router;
