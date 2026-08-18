const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createOrder = async (req, res) => {

    try {

        const userId = req.user._id;

        const {
            name,
            phone,
            address,
            city,
            state,
            pincode
        } = req.body;

        // Find user's cart
        const cart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        // Validate stock and calculate total
        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {

            const product = item.product;

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "Product no longer exists"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} does not have enough stock`
                });
            }

            totalAmount += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        // Create order
        const order = await Order.create({
            user: userId,

            items: orderItems,

            totalAmount,

            shippingAddress: {
                name,
                phone,
                address,
                city,
                state,
                pincode
            }
        });

        // Reduce stock
        for (const item of cart.items) {

            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );

        }

        // Clear cart
        cart.items = [];

        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getMyOrders = async (req, res) => {

    try {

        const userId = req.user._id;

        const orders = await Order.find({
            user: userId
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createOrder,getMyOrders
};