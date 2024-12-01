const {
  createleader,
  getleader,
  getleaderById,
  updateleader,
  deleteleader,
  deleteMany,
} = require("../controllers/leaderController");
const express = require("express");
const router = express.Router();
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/create", authAdmin, createleader);
router.get("/get/all", authAdmin, getleader);
router.get("/get", auth, getleaderById);
router.put("/update", authAdmin, updateleader);
router.delete("/delete/:id", authAdmin, deleteleader);
router.delete("/deleted", authAdmin, deleteleader);
module.exports = router;
