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

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!isEditMode) {
            return;
        }

        const fetchProduct = async () => {

            try {

                const response = await api.get(
                    `/products/${id}`
                );

                const product = response.data.product;

                setFormData({
                    name: product.name || "",
                    description: product.description || "",
                    price: product.price || "",
                    brand: product.brand || "",
                    category: product.category || "",
                    stock: product.stock || "",
                    images: product.images?.join(", ") || ""
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

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        const productData = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            brand: formData.brand,
            category: formData.category,
            stock: Number(formData.stock),
            images: formData.images
                .split(",")
                .map((image) => image.trim())
                .filter(Boolean)
        };

        try {

            if (isEditMode) {

                await api.put(
                    `/products/${id}`,
                    productData
                );

                alert("Product updated successfully");

            } else {

                await api.post(
                    "/products",
                    productData
                );

                alert("Product created successfully");
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

    if (fetching) {
        return <p>Loading product...</p>;
    }

    return (
        <div>

            <h1>
                {isEditMode
                    ? "Edit Product"
                    : "Create Product"}
            </h1>

            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <br />

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

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                />

                <br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

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

                <input
                    type="text"
                    name="images"
                    placeholder="Image URLs separated by commas"
                    value={formData.images}
                    onChange={handleChange}
                />

                <br />

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