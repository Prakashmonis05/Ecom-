const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (file) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "veyro/products"
            },
            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        stream.end(file.buffer);

    });

};

const addProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            brand,
            stock
        } = req.body;

        let imageUrls = [];

        if (req.files && req.files.length > 0) {

            const uploadResults = await Promise.all(
                req.files.map((file) =>
                    uploadToCloudinary(file)
                )
            );

            imageUrls = uploadResults.map(
                (result) => result.secure_url
            );
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            stock,
            images: imageUrls,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const getProducts = async (req, res) => {

    try {

        const {
            search,
            category,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 12
        } = req.query;

        const filter = {};

        // Search
        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    brand: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        // Category
        if (category) {
            filter.category = category;
        }

        // Price range
        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        // Sorting
        let sortOption = {
            createdAt: -1
        };

        if (sort === "price_asc") {
            sortOption = {
                price: 1
            };
        }

        if (sort === "price_desc") {
            sortOption = {
                price: -1
            };
        }

        if (sort === "name_asc") {
            sortOption = {
                name: 1
            };
        }

        if (sort === "name_desc") {
            sortOption = {
                name: -1
            };
        }

        const products = await Product.find(filter)
            .populate("category", "name")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            page: Number(page),
            totalPages: Math.ceil(
                totalProducts / Number(limit)
            ),
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

        const product = await Product.findById(req.params.id)
            .populate("category", "name");

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

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        const {
            name,
            description,
            price,
            category,
            brand,
            stock
        } = req.body;

        const updateData = {
            name,
            description,
            price,
            category,
            brand,
            stock
        };

        if (req.files && req.files.length > 0) {

            const uploadResults = await Promise.all(
                req.files.map((file) =>
                    uploadToCloudinary(file)
                )
            );

            updateData.images = uploadResults.map(
                (result) => result.secure_url
            );
        }

        const updatedProduct =
            await Product.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {

        console.error(error);

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
    deleteProduct,
    uploadToCloudinary
};