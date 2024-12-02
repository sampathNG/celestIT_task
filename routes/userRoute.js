const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteMany,
} = require("../controllers/userController");
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/get/all", authAdmin, getUsers);
router.get("/get/:id", auth, getUserById);
router.put("/update/:id", auth, updateUser);
router.delete("/delete/:id", auth, deleteUser);
router.delete("/delete/all", authAdmin, deleteMany);
module.exports = router;
