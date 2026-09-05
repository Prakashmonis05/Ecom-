const express = require("express");
const router = express.Router();

const { addProduct, getProducts, getProductById, updateProduct,deleteProduct } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/products", protect, adminOnly,upload.array("images", 5), addProduct);
router.get("/products",getProducts);
router.get("/products/:id",getProductById);
router.put("/products/:id",protect,adminOnly,upload.array("images", 5),updateProduct);
router.delete("/products/:id",protect,adminOnly,deleteProduct);

module.exports = router;