const express = require("express");
const router = express.Router();

const { addProduct, getProducts, getProductById, updateProduct,deleteProduct } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/products", protect, adminOnly, addProduct);
router.get("/products",getProducts);
router.get("/products/:id",getProductById);
router.put("/products/:id",protect,adminOnly,updateProduct);
router.delete("/products/:id",protect,adminOnly,deleteProduct);

module.exports = router;