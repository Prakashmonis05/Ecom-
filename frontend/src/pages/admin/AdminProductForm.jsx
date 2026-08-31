import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const AdminProductForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        stock: "",
        images: ""
    });

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [error, setError] = useState("");

    // =========================
    // Fetch categories
    // =========================

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await api.get(
                    "/categories"
                );

                setCategories(
                    response.data.categories
                );

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to load categories"
                );

            }

        };

        fetchCategories();

    }, []);

    // =========================
    // Fetch product for edit
    // =========================

    useEffect(() => {

        if (!isEditMode) {
            return;
        }

        const fetchProduct = async () => {

            try {

                const response = await api.get(
                    `/products/${id}`
                );

                const product =
                    response.data.product;

                setFormData({
                    name: product.name || "",

                    description:
                        product.description || "",

                    price:
                        product.price ?? "",

                    brand:
                        product.brand || "",

                    category:
                        product.category?._id ||
                        product.category ||
                        "",

                    stock:
                        product.stock ?? "",

                    images:
                        product.images?.join(", ") || ""
                });

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {

                setFetching(false);

            }
        };

        fetchProduct();

    }, [id, isEditMode]);

    // =========================
    // Handle input
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        // Make sure category is selected
        if (!formData.category) {

            setError(
                "Please select a category"
            );

            setLoading(false);

            return;
        }

        const productData = {

            name: formData.name,

            description:
                formData.description,

            price:
                Number(formData.price),

            brand:
                formData.brand,

            category:
                formData.category,

            stock:
                Number(formData.stock),

            images:
                formData.images
                    .split(",")
                    .map((image) => image.trim())
                    .filter(Boolean)
        };

        try {

            if (isEditMode) {

                const response = await api.put(
                    `/products/${id}`,
                    productData
                );

                alert(
                    response.data.message ||
                    "Product updated successfully"
                );

            } else {

                const response = await api.post(
                    "/products",
                    productData
                );

                alert(
                    response.data.message ||
                    "Product created successfully"
                );

            }

            navigate("/admin/products");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to save product"
            );

        } finally {

            setLoading(false);

        }
    };

    // =========================
    // Loading
    // =========================

    if (fetching) {

        return (
            <p>
                Loading product...
            </p>
        );

    }

    // =========================
    // UI
    // =========================

    return (
        <div>

            <h1>
                {isEditMode
                    ? "Edit Product"
                    : "Create Product"}
            </h1>

            {error && (
                <p>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                {/* Product Name */}

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                {/* Description */}

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                {/* Price */}

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                />

                <br />
                <br />

                {/* Brand */}

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                {/* Category */}

                <label>
                    Category
                </label>

                <br />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Category
                    </option>

                    {categories.map((category) => (

                        <option
                            key={category._id}
                            value={category._id}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>

                <br />
                <br />

                {/* Stock */}

                <label>
                    Stock
                </label>

                <br />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                />

                <br />
                <br />

                {/* Images */}

                <input
                    type="text"
                    name="images"
                    placeholder="Image URLs separated by commas"
                    value={formData.images}
                    onChange={handleChange}
                />

                <br />
                <br />

                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Saving..."
                        : isEditMode
                            ? "Update Product"
                            : "Create Product"}

                </button>

            </form>

        </div>
    );
};

export default AdminProductForm;