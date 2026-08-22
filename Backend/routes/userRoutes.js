const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,changePassword
} = require("../controllers/userController");

const {
    protect
} = require("../middleware/authMiddleware");

router.get(
    "/users/profile",
    protect,
    getProfile
);

router.put(
    "/users/profile",
    protect,
    updateProfile
);

router.put(
    "/users/change-password",
    protect,
    changePassword
);

module.exports = router;