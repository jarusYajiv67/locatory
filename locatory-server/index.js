require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const {verifyUser} = require("./src/utils/jwt");

const googleAPIRouter = require("./src/routes/google-api");
const usersAPIRouter = require("./src/routes/users");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(verifyUser);
app.use(express.json());

app.use("/api/google-api", googleAPIRouter);
app.use("/api/users", usersAPIRouter);

app.get("/", (req, res) => {
  return res.json(200).json("Base route for API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.clear();
  console.log(`[SERVER] Listening to PORT ${PORT}`);
});