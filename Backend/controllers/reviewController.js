const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");

const createReview = async (req, res) => {

    try {

        const userId = req.user._id;

        const {
            productId,
            rating,
            comment
        } = req.body;

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check whether user purchased the product
        const purchased = await Order.findOne({
            user: userId,
            "items.product": productId,
            orderStatus: "delivered"
        });

        if (!purchased) {
            return res.status(403).json({
                success: false,
                message: "You can review only products you have purchased"
            });
        }

        // Check if user already reviewed the product
        const existingReview = await Review.findOne({
            user: userId,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product"
            });
        }

        // Create review
        const review = await Review.create({
            user: userId,
            product: productId,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProductReviews = async (req, res) => {

    try {

        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const reviews = await Review.find({
            product: productId
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        const totalReviews = reviews.length;

        const averageRating =
            totalReviews > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                : 0;

        res.status(200).json({
            success: true,
            count: totalReviews,
            averageRating: Number(averageRating.toFixed(1)),
            reviews
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



module.exports = {
    createReview,getProductReviews
};