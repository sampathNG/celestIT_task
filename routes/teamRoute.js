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
router.post("/create/:id", authAdmin, createTeam);
router.get("/get/all", authAdmin, getTeams);
router.get("/get/:id", auth, getTeamById);
router.put("/update/:id", authAdmin, updateTeam);
router.delete("/:idl/delete/:idr", authAdmin, deleteTeam);
router.delete("/delete/all", authAdmin, deleteMany);
router.get("/join/:id", auth, joinTeam);
router.get("/leave/:id", auth, leaveTeam);
module.exports = router;
