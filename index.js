const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const userRoutes = require("./routes/userRoute");
app.use("/", userRoutes);
const walletRoutes = require("./routes/walletRoute");
app.use("/", walletRoutes);
const leaderRoutes = require("./routes/leaderRoute");
app.use("/", leaderRoutes);
const teamRoutes = require("./routes/teamRoute");
app.use("/", teamRoutes);
const leagueRoutes = require("./routes/leagueRoute");
app.use("/", leagueRoutes);
const subscriptionRoutes = require("./routes/subscriptionRoute");
app.use("/", subscriptionRoutes);
const tournamentRoutes = require("./routes/tournamentRoute");
app.use("/t", tournamentRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
