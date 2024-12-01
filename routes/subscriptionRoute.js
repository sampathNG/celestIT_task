const {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  deleteMany,
  takeSubscription,
  cancelSubscription,
  checkSubscription,
  getSubscriptionByUser,
} = require("../controllers/subscriptionController");
const router = require("express").Router();
module.exports = router;
const authAdmin = require("../utils/authorization");
const auth = require("../utils/authentication");
router.post("/create", createSubscription);
router.get("/get/all", authAdmin, getSubscriptions);
router.get("/get/:id", auth, getSubscriptionById);
router.put("/update/:id", auth, updateSubscription);
router.delete("/delete", auth, deleteSubscription);
router.delete("/deleted", authAdmin, deleteMany);
router.get("/take/:id", auth, takeSubscription);
router.get("/cancel", auth, cancelSubscription);
router.get("/check", auth, checkSubscription);
router.get("/usersub", auth, getSubscriptionByUser);
