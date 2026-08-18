const Product = require("../models/Product");

const addProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            brand,
            stock,
            images
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            stock,
            images,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProducts = async (req, res) => {

    try {

        const { search, category, minPrice, maxPrice,sort,page=1,limit=10 } = req.query;

        const filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        let sortOption = {};

        if (sort) {
            if (sort === "price") {
                sortOption.price = 1;
            }

            if (sort === "-price") {
                sortOption.price = -1;
            }

            if (sort === "rating") {
                sortOption.rating = -1;
            }
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product
            .find(filter)
            .populate("category")
            .populate("createdBy","name email")
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        const totalPages = Math.ceil(
            totalProducts / limitNumber
        );

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            totalPages,
            currentPage: pageNumber,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};