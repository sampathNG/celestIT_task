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
router.get("/get/:id", auth, getleaderById);
router.put("/update/:id", authAdmin, updateleader);
router.delete("/delete/:id", authAdmin, deleteleader);
router.delete("/delete/all", authAdmin, deleteleader);
module.exports = router;
