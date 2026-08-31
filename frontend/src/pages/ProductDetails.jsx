import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./ProductDetails.css";

const ProductDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = async () => {

        try {

            const response = await api.get(
                `/products/${id}`
            );

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


    /* =========================
       Add To Cart
    ========================= */

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

            const response = await api.post(
                "/cart",
                {
                    productId: product._id,
                    quantity: quantity
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


    /* =========================
       Wishlist
    ========================= */

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


    /* =========================
       Quantity
    ========================= */

    const increaseQuantity = () => {

        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }

    };

    const decreaseQuantity = () => {

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    };


    /* =========================
       Loading
    ========================= */

    if (loading) {

        return (
            <div className="product-details-state">

                <div className="product-loading-spinner"></div>

                <p>
                    Loading product...
                </p>

            </div>
        );

    }


    /* =========================
       Error
    ========================= */

    if (error) {

        return (
            <div className="product-details-state">

                <div className="product-error">
                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>
                </div>

            </div>
        );

    }


    if (!product) {

        return (
            <div className="product-details-state">

                <h2>
                    Product not found
                </h2>

                <p>
                    The product you're looking for doesn't exist.
                </p>

            </div>
        );

    }


    const images = product.images || [];

    const isOutOfStock = product.stock <= 0;


    return (
        <main className="product-details-page">

            <div className="product-details-container">

                {/* =========================
                    Breadcrumb
                ========================= */}

                <div className="product-breadcrumb">

                    <span>
                        Home
                    </span>

                    <span>/</span>

                    <span>
                        Products
                    </span>

                    <span>/</span>

                    <strong>
                        {product.name}
                    </strong>

                </div>


                {/* =========================
                    Product Main
                ========================= */}

                <div className="product-main">


                    {/* =========================
                        Image Gallery
                    ========================= */}

                    <div className="product-gallery">

                        <div className="thumbnail-list">

                            {images.map((image, index) => (

                                <button
                                    key={index}
                                    className={`thumbnail ${
                                        selectedImage === index
                                            ? "thumbnail-active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setSelectedImage(index)
                                    }
                                >

                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                    />

                                </button>

                            ))}

                        </div>


                        <div className="main-product-image">

                            {images.length > 0 ? (

                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                />

                            ) : (

                                <div className="no-product-image">
                                    No Image Available
                                </div>

                            )}

                            {isOutOfStock && (
                                <span className="details-stock-badge">
                                    Out of Stock
                                </span>
                            )}

                        </div>

                    </div>


                    {/* =========================
                        Product Information
                    ========================= */}

                    <div className="product-information">

                        <div className="product-meta">

                            {product.brand && (
                                <span>
                                    {product.brand}
                                </span>
                            )}

                            {product.category?.name && (
                                <span>
                                    {product.category.name}
                                </span>
                            )}

                        </div>


                        <h1>
                            {product.name}
                        </h1>


                        <div className="product-rating">

                            <span className="stars">
                                ★★★★★
                            </span>

                            <span>
                                4.8
                            </span>

                            <span className="rating-divider">
                                |
                            </span>

                            <span>
                                Customer reviews
                            </span>

                        </div>


                        <div className="details-price">

                            ₹{product.price}

                        </div>


                        {product.stock > 0 ? (

                            <div className="details-stock in-stock-details">

                                <span className="stock-dot"></span>

                                In Stock

                                <span>
                                    ({product.stock} available)
                                </span>

                            </div>

                        ) : (

                            <div className="details-stock out-stock-details">

                                <span className="stock-dot"></span>

                                Currently unavailable

                            </div>

                        )}


                        <div className="product-divider"></div>


                        {/* Description */}

                        <div className="product-description">

                            <h3>
                                About this product
                            </h3>

                            <p>
                                {product.description ||
                                    "No description available for this product."}
                            </p>

                        </div>


                        {/* Quantity */}

                        {!isOutOfStock && (

                            <div className="quantity-section">

                                <label>
                                    Quantity
                                </label>

                                <div className="quantity-control">

                                    <button
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                    >
                                        −
                                    </button>

                                    <span>
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={increaseQuantity}
                                        disabled={
                                            quantity >= product.stock
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                        )}


                        {/* Actions */}

                        <div className="details-actions">

                            <button
                                className="details-cart-btn"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                            >
                                {isOutOfStock
                                    ? "Out of Stock"
                                    : "Add to Cart"}
                            </button>


                            <button
                                className="details-wishlist-btn"
                                onClick={handleWishlist}
                            >
                                ♡
                                <span>
                                    Wishlist
                                </span>
                            </button>

                        </div>


                        {/* Benefits */}

                        <div className="product-benefits">

                            <div className="product-benefit">

                                <span className="benefit-symbol">
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Quality checked
                                    </strong>

                                    <p>
                                        Reliable products from trusted sellers
                                    </p>
                                </div>

                            </div>


                            <div className="product-benefit">

                                <span className="benefit-symbol">
                                    →
                                </span>

                                <div>
                                    <strong>
                                        Fast delivery
                                    </strong>

                                    <p>
                                        Delivered safely to your doorstep
                                    </p>
                                </div>

                            </div>


                            <div className="product-benefit">

                                <span className="benefit-symbol">
                                    ◇
                                </span>

                                <div>
                                    <strong>
                                        Secure checkout
                                    </strong>

                                    <p>
                                        Your payment information is protected
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default ProductDetails;