const express = require("express");
const router = express.Router();
const {
  createwallet,
  getwallets,
  getwalletById,
  updatewallet,
  deletewallet,
  deleteMany,
} = require("../controllers/walletController");
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/create", auth, createwallet);
router.get("/get/all", authAdmin, getwallets);
router.get("/get", auth, getwalletById);
// update balance on basis of referals
router.put("/update", auth, updatewallet);
router.delete("/delete", auth, deletewallet);
router.delete("/delete/all", authAdmin, deleteMany);
module.exports = router;
