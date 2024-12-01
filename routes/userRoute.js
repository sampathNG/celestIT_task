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
router.post("/creates", loginUser);
router.get("/users/all", authAdmin, getUsers);
router.get("/users/:id", auth, getUserById);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);
router.delete("/users", authAdmin, deleteMany);
module.exports = router;
