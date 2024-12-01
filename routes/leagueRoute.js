const express = require("express");
const router = express.Router();
const {
  createleague,
  getleague,
  getleagueById,
  updateleague,
  deleteleague,
  deleteMany,
  joinLeague,
  leaveLeague,
} = require("../controllers/leagueController");
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/create", auth, authAdmin, createleague);
router.get("/all", auth, getleague);
router.get("/get/:id", auth, getleagueById);
router.put("/update/:id", auth, authAdmin, updateleague);
router.delete("/delete/:id", auth, authAdmin, deleteleague);
router.delete("/deletes", auth, authAdmin, deleteMany);
router.get("/join", auth, joinLeague);
router.get("/leave", auth, leaveLeague);
module.exports = router;
