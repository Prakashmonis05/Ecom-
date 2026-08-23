const express = require("express");

const router = express.Router();

const { registerUser, loginUser} = require("../controllers/authController");

const { protect, adminOnly} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login",loginUser)

module.exports = router;