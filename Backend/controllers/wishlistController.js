const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

const toggleWishlist = async (req, res) => {

    try {

        const userId = req.user._id;
        const productId = req.params.productId;

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let wishlist = await Wishlist.findOne({
            user: userId
        });

        // Create wishlist if user doesn't have one
        if (!wishlist) {

            wishlist = await Wishlist.create({
                user: userId,
                products: [productId]
            });

            return res.status(201).json({
                success: true,
                message: "Product added to wishlist",
                wishlist
            });
        }

        // Check whether product already exists
        const productIndex = wishlist.products.findIndex(
            id => id.toString() === productId
        );

        if (productIndex !== -1) {

            // Remove product
            wishlist.products.splice(productIndex, 1);

            await wishlist.save();

            return res.status(200).json({
                success: true,
                message: "Product removed from wishlist",
                wishlist
            });
        }

        // Add product
        wishlist.products.push(productId);

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.findOne({
            user: req.user._id
        })
            .populate("products");

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                count: 0,
                products: []
            });
        }

        res.status(200).json({
            success: true,
            count: wishlist.products.length,
            products: wishlist.products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    toggleWishlist,getWishlist
};