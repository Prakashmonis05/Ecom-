import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { LoadingSpinner } from "../../components/LoadingAnimation";
import "./AdminLowStock.css";

const AdminLowStock = () => {

    const [products, setProducts] = useState([]);
    const [threshold, setThreshold] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLowStockProducts = async () => {

        setLoading(true);
        setError("");

        try {

            const response = await api.get(
                `/admin/products/low-stock?threshold=${threshold}`
            );

            setProducts(response.data.products);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load low-stock products"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchLowStockProducts();
    }, [threshold]);

    return (
    <div className="admin-page low-stock-page">

        {/* HEADER */}

        <header className="admin-page__header low-stock-header">

            <div>
                <span className="admin-page__eyebrow">
                    INVENTORY
                </span>

                <h1 className="admin-page__title">
                    Low Stock
                </h1>

                <p className="admin-page__description">
                    Monitor products that need restocking.
                </p>
            </div>

            <Link
                to="/admin/products"
                className="button button-secondary"
            >
                Manage Products
            </Link>

        </header>


        {/* FILTER */}

        <section className="stock-filter-card">

            <div className="stock-filter-info">

                <span className="stock-filter-label">
                    STOCK THRESHOLD
                </span>

                <h2>
                    Show products with low inventory
                </h2>

                <p>
                    Products with stock less than or equal to this
                    number will appear below.
                </p>

            </div>

            <div className="stock-threshold">

                <label htmlFor="threshold">
                    Threshold
                </label>

                <div className="threshold-input">

                    <input
                        id="threshold"
                        type="number"
                        min="0"
                        value={threshold}
                        onChange={(e) =>
                            setThreshold(
                                Math.max(
                                    0,
                                    Number(e.target.value)
                                )
                            )
                        }
                    />

                    <span>
                        units
                    </span>

                </div>

            </div>

        </section>


        {/* STATES */}

        {loading && (
            <div className="admin-state low-stock-state">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">
                    Loading inventory...
                </p>
            </div>
        )}


        {error && (

            <div className="admin-alert admin-alert--error">
                {error}
            </div>

        )}


        {!loading && !error && (

            <>

                {/* SUMMARY */}

                <div className="stock-summary">

                    <div className="stock-summary__left">

                        <span className="stock-summary__label">
                            INVENTORY ALERTS
                        </span>

                        <h2>
                            {products.length}{" "}
                            {products.length === 1
                                ? "Product"
                                : "Products"}
                        </h2>

                    </div>

                    <div className="stock-summary__legend">

                        <span className="stock-legend">
                            <span className="stock-dot stock-dot--low"></span>
                            Low Stock
                        </span>

                        <span className="stock-legend">
                            <span className="stock-dot stock-dot--out"></span>
                            Out of Stock
                        </span>

                    </div>

                </div>


                {/* EMPTY */}

                {products.length === 0 && (

                    <div className="stock-empty">

                        <div className="stock-empty__icon">
                            ✓
                        </div>

                        <h2>
                            Inventory looks good
                        </h2>

                        <p>
                            No products are currently below the
                            selected stock threshold.
                        </p>

                    </div>

                )}


                {/* PRODUCTS */}

                {products.length > 0 && (

                    <div className="low-stock-grid">

                        {products.map((product) => (

                            <article
                                className={`low-stock-card ${
                                    product.stock === 0
                                        ? "low-stock-card--out"
                                        : ""
                                }`}
                                key={product._id}
                            >

                                {/* IMAGE */}

                                <div className="low-stock-card__image">

                                    {product.images?.length > 0 ? (

                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                        />

                                    ) : (

                                        <div className="low-stock-card__placeholder">
                                            No Image
                                        </div>

                                    )}

                                    <span
                                        className={`stock-status ${
                                            product.stock === 0
                                                ? "stock-status--out"
                                                : "stock-status--low"
                                        }`}
                                    >
                                        {product.stock === 0
                                            ? "Out of Stock"
                                            : "Low Stock"}
                                    </span>

                                </div>


                                {/* CONTENT */}

                                <div className="low-stock-card__content">

                                    <div className="low-stock-card__top">

                                        <div>

                                            <h3>
                                                {product.name}
                                            </h3>

                                            <p className="low-stock-brand">
                                                {product.brand ||
                                                    "No brand"}
                                            </p>

                                        </div>

                                        <span className="low-stock-price">
                                            ₹{product.price}
                                        </span>

                                    </div>


                                    {/* STOCK */}

                                    <div className="stock-meter">

                                        <div className="stock-meter__header">

                                            <span>
                                                Current Stock
                                            </span>

                                            <strong>
                                                {product.stock} units
                                            </strong>

                                        </div>

                                        <div className="stock-meter__track">

                                            <div
                                                className={`stock-meter__fill ${
                                                    product.stock === 0
                                                        ? "stock-meter__fill--out"
                                                        : ""
                                                }`}
                                                style={{
                                                    width: `${Math.min(
                                                        (product.stock /
                                                            Math.max(
                                                                threshold,
                                                                1
                                                            )) *
                                                            100,
                                                        100
                                                    )}%`
                                                }}
                                            />

                                        </div>

                                    </div>


                                    {/* ACTION */}

                                    <Link
                                        to={`/admin/products/${product._id}/edit`}
                                        className="low-stock-update"
                                    >
                                        Update Stock
                                        <span>→</span>
                                    </Link>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </>

        )}


        {/* FOOTER NAV */}

        <div className="low-stock-footer">

            <Link to="/admin/dashboard">
                ← Back to Dashboard
            </Link>

        </div>

    </div>
);
};

export default AdminLowStock;