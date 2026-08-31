const User = require("../models/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)
            .select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            email,
            phone
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            user.email = email;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const changePassword = async (req, res) => {

    try {

        console.log("\n===== CHANGE PASSWORD DEBUG =====");

        const { currentPassword, newPassword } = req.body;

        console.log("1. REQUEST BODY RECEIVED");
        console.log("Current password provided:", !!currentPassword);
        console.log("New password provided:", !!newPassword);

        console.log("2. USER ID:", req.user._id);

        const user = await User.findById(req.user._id);

        console.log("3. USER FOUND:", !!user);

        if (!user) {

            console.log("❌ USER NOT FOUND");

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("4. USER EMAIL:", user.email);

        console.log(
            "5. STORED PASSWORD:",
            user.password.substring(0, 10) + "..."
        );

        console.log(
            "6. PASSWORD LENGTH:",
            user.password.length
        );

        console.log(
            "7. IS BCRYPT HASH:",
            user.password.startsWith("$2b$")
        );

        console.log("8. CHECKING CURRENT PASSWORD...");

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        console.log(
            "9. PASSWORD MATCH:",
            isMatch
        );

        if (!isMatch) {

            console.log(
                "❌ CURRENT PASSWORD DOES NOT MATCH"
            );

            console.log(
                "================================\n"
            );

            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        console.log(
            "✅ CURRENT PASSWORD MATCHED"
        );

        console.log(
            "10. SETTING NEW PASSWORD"
        );

        user.password = newPassword;

        console.log(
            "11. PASSWORD MODIFIED:",
            user.isModified("password")
        );

        console.log(
            "12. SAVING USER..."
        );

        await user.save();

        console.log(
            "13. USER SAVED SUCCESSFULLY"
        );

        console.log(
            "14. NEW PASSWORD IS BCRYPT HASH:",
            user.password.startsWith("$2b$")
        );

        console.log(
            "15. NEW HASH LENGTH:",
            user.password.length
        );

        console.log(
            "✅ PASSWORD CHANGED SUCCESSFULLY"
        );

        console.log(
            "================================\n"
        );

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {

        console.error(
            "❌ CHANGE PASSWORD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    getProfile,
    updateProfile,
    changePassword
};