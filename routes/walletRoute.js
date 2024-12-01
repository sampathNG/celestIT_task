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
router.post("/wallets", auth, createwallet);
router.get("/wallets/all", authAdmin, getwallets);
router.get("/walletsd", auth, getwalletById);
// update balance on basis of referals
router.put("/walletsu", auth, updatewallet);
router.delete("/wallets", auth, deletewallet);
router.delete("/walletd", authAdmin, deleteMany);
module.exports = router;
