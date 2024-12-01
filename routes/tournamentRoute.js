const {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  joinTournament,
  leaveTournament,
  getTournamentStatus,
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
router.delete("/delete", authAdmin, deleteManyTournments);
router.post("/join/:id", auth, joinTournament);
router.post("/leave/:id", auth, leaveTournament);
router.get("/status/:id", auth, getTournamentStatus);
module.exports = router;
