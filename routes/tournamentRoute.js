const {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  joinTournament,
  leaveTournament,
  deleteManyTournments,
} = require("../controllers/tournamentController.js");
const router = require("express").Router();
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/create", authAdmin, createTournament);
router.get("/get", auth, getTournaments);
router.get("/get/:id", auth, getTournamentById);
router.put("/update/:id", authAdmin, updateTournament);
router.delete("/delete/:id", authAdmin, deleteTournament);
router.delete("/delete/all", authAdmin, deleteManyTournments);
router.get("/join/:id", auth, joinTournament);
router.get("/leave/:id", auth, leaveTournament);
module.exports = router;
