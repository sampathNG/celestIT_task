const {
  createleader,
  getleader,
  getleaderById,
  updateleader,
  deleteleader,
} = require("../controllers/leaderController");
const express = require("express");
const router = express.Router();
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/leader", createleader);
router.post("/leaders", getleader);
router.get("/leader", auth, getleaderById);
router.put("/leader", authAdmin, updateleader);
router.delete("/leader", deleteleader);
module.exports = router;
