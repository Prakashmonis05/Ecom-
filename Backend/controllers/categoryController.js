const Category = require("../models/Category");
const Product = require("../models/Product");

const addCategory = async (req, res) => {

    try {

        const { name, description, image } = req.body;

        const category = await Category.create({
            name,
            description,
            image
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getCategories = async (req, res) => {
    try {

        const categories = await Category.find({
            isActive: true
        });

        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const getCategoryById = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const updateCategory = async (req, res) => {
    try {

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteCategory = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const productsUsingCategory = await Product.countDocuments({
            category: req.params.id
        });

        if (productsUsingCategory > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete category because products are using it"
            });
        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    addCategory,
    getCategoryById,
    getCategories,
    updateCategory,
    deleteCategory
};