import { Link } from "react-router-dom";
import api from "../services/api";

const ProductCard = ({ product }) => {

    const handleAddToCart = async () => {

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
        <div>

            {product.images?.length > 0 && (
                <img
                    src={product.images[0]}
                    alt={product.name}
                    width="200"
                />
            )}

            <h2>{product.name}</h2>

            <p>{product.brand}</p>

            <p>₹{product.price}</p>

            <p>
                {product.stock > 0
                    ? `In Stock: ${product.stock}`
                    : "Out of Stock"}
            </p>

            <Link to={`/products/${product._id}`}>
                View Product
            </Link>

            <br />

            <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
            >
                {product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
            </button>

            <button
                onClick={handleWishlist}
            >
                Wishlist
            </button>

        </div>
    );
};

export default ProductCard;