import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { LoadingSpinner } from "../components/LoadingAnimation";
import "./Wishlist.css";

const Wishlist = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchWishlist = async () => {

        try {

            setLoading(true);

            const response = await api.get("/wishlist");

            setProducts(response.data.products);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load wishlist"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {

        try {

            const response = await api.post(
                `/wishlist/${productId}`
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
                "Failed to remove from wishlist"
            );

        }
    };

    const addToCart = async (productId, stock) => {

        if (stock <= 0) {
            alert("Product is out of stock");
            return;
        }

        try {

            const response = await api.post(
                "/cart",
                {
                    productId,
                    quantity: 1
                }
            );

            alert(response.data.message);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        }
    };

    if (loading) {
        return (
            <div className="page-loading-wrapper">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">Loading wishlist...</p>
            </div>
        );
    }

    if (error) {
        return <p className="wishlist-status wishlist-error">{error}</p>;
    }

    return (
        <div className="wishlist-page">

            <h1 className="wishlist-title">My Wishlist</h1>

            {products.length === 0 ? (

                <div className="wishlist-empty">

                    <p>
                        Your wishlist is empty.
                    </p>

                    <Link
                        to="/products"
                        className="wishlist-empty-link"
                    >
                        Browse Products
                    </Link>

                </div>

            ) : (

                <div className="wishlist-grid">

                    {products.map((product) => (

                        <div
                            key={product._id}
                            className="wishlist-card"
                        >

                            <div className="wishlist-card-image">

                                {product.images?.length > 0 ? (

                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                    />

                                ) : (

                                    <div className="wishlist-no-image">
                                        No Image
                                    </div>

                                )}

                            </div>

                            <div className="wishlist-card-body">

                                <h2 className="wishlist-card-name">
                                    {product.name}
                                </h2>

                                <p className="wishlist-card-meta">
                                    {product.brand}
                                    {product.category?.name &&
                                        ` · ${product.category.name}`}
                                </p>

                                <div className="wishlist-card-price-row">

                                    <h3 className="wishlist-card-price">
                                        ₹{product.price}
                                    </h3>

                                    <span
                                        className={
                                            product.stock > 0
                                                ? "wishlist-stock in-stock"
                                                : "wishlist-stock out-stock"
                                        }
                                    >
                                        {product.stock > 0
                                            ? `In Stock: ${product.stock}`
                                            : "Out of Stock"}
                                    </span>

                                </div>

                                <Link
                                    to={`/products/${product._id}`}
                                    className="wishlist-view-link"
                                >
                                    View Product
                                </Link>

                                <div className="wishlist-card-actions">

                                    <button
                                        className="wl-btn wishlist-btn-primary"
                                        onClick={() =>
                                            addToCart(
                                                product._id,
                                                product.stock
                                            )
                                        }
                                        disabled={product.stock <= 0}
                                    >
                                        {product.stock <= 0
                                            ? "Out of Stock"
                                            : "Add to Cart"}
                                    </button>

                                    <button
                                        className="wl-btn wishlist-btn-remove"
                                        onClick={() =>
                                            removeFromWishlist(
                                                product._id
                                            )
                                        }
                                        title="Remove from Wishlist"
                                        aria-label="Remove from Wishlist"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            <path d="M10 11v6" />
                                            <path d="M14 11v6" />
                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                        </svg>
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Wishlist;