const express = require("express");

const router = express.Router();

const { addCategory, getCategories, getCategoryById,updateCategory,deleteCategory } = require("../controllers/categoryController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

router.post(
    "/categories",
    protect,
    adminOnly,
    addCategory
);
router.get("/categories", getCategories);

router.get("/categories/:id", getCategoryById);

router.put(
    "/categories/:id",
    protect,
    adminOnly,
    updateCategory
);

router.delete(
    "/categories/:id",
    protect,
    adminOnly,
    deleteCategory
);
module.exports = router;