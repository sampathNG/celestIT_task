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
router.post("/sub", createSubscription);
router.post("/subs", getSubscriptions);
router.get("/subs/:id", auth, getSubscriptionById);
router.put("/subs/:id", auth, updateSubscription);
router.delete("/subs", auth, deleteSubscription);
router.delete("/subscriptionsd", authAdmin, deleteMany);
router.get("/take/:id", auth, takeSubscription);
router.get("/cancel", auth, cancelSubscription);
router.get("/check", auth, checkSubscription);
router.get("/usersub", auth, getSubscriptionByUser);
