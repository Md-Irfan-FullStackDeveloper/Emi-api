const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection  = require("./config/db");
const { userRouter } = require("./Routes/user.route");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to api home page");
});

app.use("/user", userRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db successfull");
  } catch (error) {
    console.log(error);
    console.log("error connecting to db");
  }
});
