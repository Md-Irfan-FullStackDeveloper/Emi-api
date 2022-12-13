const { UserModel } = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  let user;

  try {
    user = await UserModel.findOne({ _id: id });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "User not found" });
  }

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  return res.status(200).json({ user });
};

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  let userExits;

  try {
    userExits = await UserModel.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (userExits) {
    return res.status(500).json({ msg: "User already exists" });
  }

  const hashed_password = bcrypt.hashSync(password, 5);

  const newUser = new UserModel({
    name,
    email,
    password: hashed_password,
  });

  try {
    await newUser.save();
    return res.status(200).json({ newUser });
  } catch (error) {
    return console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let userExits;

  try {
    userExits = await UserModel.findOne({ email });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!userExits) {
    return res.status(404).json({ msg: "User not found" });
  }

  const checkPassword = bcrypt.compareSync(password, userExits.password);

  if (!checkPassword) {
    return res.status(404).json({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
  return res.status(200).json({ msg: "Login successfull", token, id: userExits._id });
};

module.exports = {
  getUserProfile,
  addUser,
  loginUser,
};
