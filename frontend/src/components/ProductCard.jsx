import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const { user } = useAuth();

    const [isWishlisted, setIsWishlisted] = useState(false);

    // Check whether product is already in wishlist
    useEffect(() => {
        const checkWishlist = async () => {
            if (!user) {
                setIsWishlisted(false);
                return;
            }

            try {
                const response = await api.get("/wishlist");

                const wishlistProducts = response.data.products || [];

                const exists = wishlistProducts.some(
                    (wishlistProduct) =>
                        wishlistProduct._id === product._id
                );

                setIsWishlisted(exists);

            } catch (error) {
                console.error(
                    "Failed to check wishlist:",
                    error
                );
            }
        };

        checkWishlist();
    }, [user, product._id]);


    // Add / remove wishlist
    const handleWishlist = async () => {
        if (!user) {
            alert("Please login to use wishlist");
            return;
        }

        try {
            const response = await api.post(
                `/wishlist/${product._id}`
            );

            // Since backend toggles the product,
            // update the frontend state too
            setIsWishlisted((previous) => !previous);

            alert(response.data.message);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update wishlist"
            );
        }
    };


    // Add to cart
    const handleAddToCart = async () => {
        if (!user) {
            alert("Please login to add products to cart");
            return;
        }

        if (product.stock <= 0) {
            alert("Product is out of stock");
            return;
        }

        try {
            const response = await api.post("/cart", {
                productId: product._id,
                quantity: 1
            });

            alert(response.data.message);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        }
    };


    return (
        <div className="product-card">

            <div className="product-image-container">

                {product.images?.length > 0 ? (
                    <img
                        className="product-image"
                        src={product.images[0]}
                        alt={product.name}
                    />
                ) : (
                    <div className="no-image">
                        No Image
                    </div>
                )}

                <span
                    className={`stock-badge ${
                        product.stock > 0
                            ? "in-stock"
                            : "out-of-stock"
                    }`}
                >
                    {product.stock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                </span>


                {/* Wishlist */}
                <button
                    className="wishlist-btn"
                    onClick={handleWishlist}
                    aria-label={
                        isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                >
                    {isWishlisted ? "♥" : "♡"}
                </button>

            </div>


            <div className="product-info">

                <p className="product-brand">
                    {product.brand}
                </p>

                <h2 className="product-name">
                    {product.name}
                </h2>

                <p className="product-category">
                    {product.category?.name}
                </p>

                <div className="product-price">
                    ₹{product.price}
                </div>

                {product.stock > 0 && (
                    <p className="stock-count">
                        {product.stock} available
                    </p>
                )}


                <div className="product-actions">

                    <Link
                        to={`/products/${product._id}`}
                        className="view-product-btn"
                    >
                        View Product
                    </Link>

                    <button
                        className="add-cart-btn"
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                    >
                        {product.stock <= 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductCard;