import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const { user } = useAuth();

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

    const handleWishlist = async () => {
        if (!user) {
            alert("Please login to use wishlist");
            return;
        }

        try {
            const response = await api.post(
                `/wishlist/${product._id}`
            );

            alert(response.data.message);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update wishlist"
            );
        }
    };

    return (
        <div className="product-card">

            {/* Product Image */}
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

                {/* Stock Badge */}
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

                {/* Wishlist Button */}
                <button
                    className="wishlist-btn"
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    ♡
                </button>
            </div>

            {/* Product Information */}
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

                {/* Actions */}
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