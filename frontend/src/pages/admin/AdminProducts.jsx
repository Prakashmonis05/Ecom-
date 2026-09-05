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

    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page admin-products">

            <header className="admin-page__header">
                <div>
                    <h1 className="admin-page__title">Manage Products</h1>
                    <p className="admin-page__subtitle">
                        Catalog of {products.length} products
                    </p>
                </div>

                <div className="admin-products-header-actions">
                    <div className="admin-search-box">
                        <input
                            type="text"
                            placeholder="Filter products by name, brand..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="search-clear-btn"
                                onClick={() => setSearchTerm("")}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <Link
                        className="admin-button admin-button--primary"
                        to="/admin/products/create"
                    >
                        + Add New Product
                    </Link>
                </div>
            </header>

            {filteredProducts.length === 0 ? (

                <div className="admin-empty-state">
                    <p>{searchTerm ? "No products match your filter." : "No products found."}</p>
                    {searchTerm && (
                        <button
                            type="button"
                            className="admin-button admin-button--secondary"
                            onClick={() => setSearchTerm("")}
                        >
                            Clear Filter
                        </button>
                    )}
                </div>

            ) : (

                <div className="admin-list admin-product-list">

                    {filteredProducts.map((product) => (

                        <article
                            className="admin-card admin-product-card"
                            key={product._id}
                        >

                            <div className="admin-product-card__media">
                                {product.images?.length > 0 ? (
                                    <img
                                        className="admin-product-card__image"
                                        src={product.images[0]}
                                        alt={product.name}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="admin-no-image">No image</div>
                                )}
                                <span className={`admin-stock-tag ${product.stock <= 0 ? "out" : product.stock <= 5 ? "low" : "ok"}`}>
                                    {product.stock <= 0 ? "Out of Stock" : product.stock <= 5 ? `Low: ${product.stock}` : `${product.stock} in stock`}
                                </span>
                            </div>

                            <div className="admin-product-card__content">
                                <div className="admin-product-card__category">
                                    {product.category?.name || "Uncategorized"}
                                </div>

                                <h2 className="admin-card__title" title={product.name}>
                                    {product.name}
                                </h2>

                                <div className="admin-product-card__meta">
                                    <span className="admin-product-card__price">
                                        ₹{product.price}
                                    </span>
                                    {product.brand && (
                                        <span className="admin-product-card__brand">
                                            {product.brand}
                                        </span>
                                    )}
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
