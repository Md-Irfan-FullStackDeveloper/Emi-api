const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db");
const { userRouter } = require("./Routes/user.route");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to api home page");
});

app.post("/calculateEMI", (req, res) => {
  const { loanAmount, intrestRate, tenureMonth } = req.body;
  const calculatedEMI =
    (loanAmount * intrestRate * (1 + intrestRate) * tenureMonth) /
    ((1 + intrestRate) * tenureMonth - 1);

  res.send({ EMI: calculatedEMI });
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
