const { Router } = require("express");
const {
  getUserProfile,
  addUser,
  loginUser,
} = require("../Controller/userController");

const userRouter = Router();

userRouter.get("/:id", getUserProfile);
userRouter.post("/signup", addUser);
userRouter.post("/login", loginUser);

module.exports = {
  userRouter,
};
