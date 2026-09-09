import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./AdminProductForm.css";

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
        images: []
    });

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [error, setError] = useState("");

    const [existingImages, setExistingImages] = useState([]);

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
                    description: product.description || "",
                    price: product.price ?? "",
                    brand: product.brand || "",
                    category: product.category?._id || product.category || "",
                    stock: product.stock ?? "",
                    images: []
                });

                setExistingImages(product.images || []);

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

        try {

            const productData = new FormData();

            productData.append(
                "name",
                formData.name
            );

            productData.append(
                "description",
                formData.description
            );

            productData.append(
                "price",
                formData.price
            );

            productData.append(
                "category",
                formData.category
            );

            productData.append(
                "brand",
                formData.brand
            );

            productData.append(
                "stock",
                formData.stock
            );

            if (Array.isArray(formData.images)) {
                formData.images.forEach((image) => {
                    if (image instanceof File) {
                        productData.append(
                            "images",
                            image
                        );
                    }
                });
            }

            if (isEditMode) {

                await api.put(
                    `/products/${id}`,
                    productData
                );

            } else {

                await api.post(
                    "/products",
                    productData
                );

            }

            navigate("/admin/products");

        } catch (error) {

            console.error("Save product error:", error);

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
            <div className="admin-page admin-state">
                <p className="admin-state__message">
                    Loading product...
                </p>
            </div>
        );

    }

    // =========================
    // UI
    // =========================

    return (
        <div className="admin-page admin-product-form-page">

            <header className="admin-page__header">
                <h1 className="admin-page__title">
                    {isEditMode
                        ? "Edit Product"
                        : "Create Product"}
                </h1>
            </header>

            {error && (
                <p className="admin-form__message admin-form__message--error">
                    {error}
                </p>
            )}

            <form className="admin-form admin-card" onSubmit={handleSubmit}>

                {/* Product Name */}

                <div className="admin-form__field">
                    <input
                        className="admin-form__control"
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                     </div>

                {/* Description */}

                <div className="admin-form__field">
                    <textarea
                        className="admin-form__control admin-form__control--textarea"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Price */}

                <div className="admin-form__field">
                    <input
                        className="admin-form__control"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                {/* Brand */}

                <div className="admin-form__field">
                    <input
                        className="admin-form__control"
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Category */}

                <div className="admin-form__field">
                    <label className="admin-form__label">
                        Category
                    </label>

                    <select
                        className="admin-form__control"
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
                </div>

                {/* Stock */}

                <div className="admin-form__field">
                    <label className="admin-form__label">
                        Stock
                    </label>

                    <input
                        className="admin-form__control"
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                {/* Images */}

                <div className="admin-form__field">
                    <label className="admin-form__label">Product Images</label>
                    {isEditMode && existingImages.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                            {existingImages.map((imgUrl, idx) => (
                                <img
                                    key={idx}
                                    src={imgUrl}
                                    alt={`Product preview ${idx + 1}`}
                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ccc' }}
                                />
                            ))}
                        </div>
                    )}
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            setFormData((previous) => ({
                                ...previous,
                                images: Array.from(e.target.files)
                            }));
                        }}
                    />
                </div>

               

                {/* Submit */}

                <div className="admin-form__actions">
                    <button
                        className="admin-button admin-button--primary"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : isEditMode
                                ? "Update Product"
                                : "Create Product"}

                    </button>
                </div>

            </form>

        </div>
    );
};

export default AdminProductForm;
