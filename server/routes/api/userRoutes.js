const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../../controllers/userController");

const validateToken = require("../../utils/validateToken");

const router = express.Router();

router.post("/register", function (req, res) {
  registerUser(req, res)
    .then((r) => console.log("User registered"))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.post("/login", function (req, res) {
  loginUser(req, res)
    .then((r) => console.log("User logged in"))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.post("/logout", validateToken, function (req, res) {
  logoutUser(req, res)
    .then((r) => console.log("User logged out"))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.get("/getUser", validateToken, function (req, res) {
  getUser(req, res)
    .then((r) => console.log("User fetched"))
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
