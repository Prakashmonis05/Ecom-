import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./AdminProducts.css";

const AdminProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {

        try {

            const response = await api.get("/products");

            setProducts(response.data.products);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (productId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await api.delete(
                `/products/${productId}`
            );

            alert(response.data.message);

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product._id !== productId
                )
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );

        }
    };

    if (loading) {
        return (
            <div className="admin-page admin-state">
                <p className="admin-state__message">
                    Loading products...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page admin-state">
                <p className="admin-state__message admin-state__message--error">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="admin-page admin-products">

            <header className="admin-page__header">
                <h1 className="admin-page__title">Manage Products</h1>

                <Link
                    className="admin-button admin-button--primary"
                    to="/admin/products/create"
                >
                    Add New Product
                </Link>
            </header>

            {products.length === 0 ? (

                <div className="admin-empty-state">
                    <p>No products found.</p>
                </div>

            ) : (

                <div className="admin-list admin-product-list">

                    {products.map((product) => (

                        <article
                            className="admin-card admin-product-card"
                            key={product._id}
                        >

                            {product.images?.length > 0 && (
                                <div className="admin-product-card__media">
                                    <img
                                        className="admin-product-card__image"
                                        src={product.images[0]}
                                        alt={product.name}
                                        width="150"
                                    />
                                </div>
                            )}

                            <div className="admin-product-card__content">
                                <h2 className="admin-card__title">
                                    {product.name}
                                </h2>

                                <div className="admin-product-card__meta">
                                    <p>
                                        Brand: {product.brand}
                                    </p>

                                    <p>
                                        Category: {product.category?.name || "Uncategorized"}
                                    </p>

                                    <p>
                                        Price: ₹{product.price}
                                    </p>

                                    <p>
                                        Stock: {product.stock}
                                    </p>

                                    <p>
                                        Status:{" "}
                                        {product.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </p>
                                </div>

                                <div className="admin-card__actions">
                                    <Link
                                        className="admin-button admin-button--secondary"
                                        to={`/admin/products/${product._id}/edit`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="admin-button admin-button--danger"
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </article>

                    ))}

                </div>

            )}

        </div>
    );
};

export default AdminProducts;
