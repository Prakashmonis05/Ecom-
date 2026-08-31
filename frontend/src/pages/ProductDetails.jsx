import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProduct = async () => {

        try {

            const response = await api.get(`/products/${id}`);

            setProduct(response.data.product);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load product"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

   const handleAddToCart = async () => {

    if (!user) {
        alert("Please login to add products to cart");
        return;
    }

    if (product.stock === 0) {
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

    // Wishlist handler must be inside the component
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


    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div>

            <h1>{product.name}</h1>

            {product.images?.length > 0 && (
                <img
                    src={product.images[0]}
                    alt={product.name}
                    width="400"
                />
            )}

            <p>
                Brand: {product.brand}
            </p>

            <p>
                Category: {product.category?.name}
            </p>

            <p>
                {product.description}
            </p>

            <h2>
                ₹{product.price}
            </h2>

            <p>
                {product.stock > 0
                    ? `In Stock: ${product.stock}`
                    : "Out of Stock"}
            </p>

            <button
    onClick={handleAddToCart}
    disabled={product.stock === 0}
>
    Add to Cart
</button>

            <button onClick={handleWishlist}>
                Add to Wishlist
            </button>

        </div>
    );
};

export default ProductDetails;