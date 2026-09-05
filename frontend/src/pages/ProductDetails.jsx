import { useEffect, useState, useRef } from "react";
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
    const [wishlisted, setWishlisted] = useState(false);
    const [wishlistAnim, setWishlistAnim] = useState(false);
    const [toast, setToast] = useState(null);
    const toastTimer = useRef(null);

    const showToast = (message, type = "success") => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToast({ message, type });
        toastTimer.current = setTimeout(() => setToast(null), 3000);
    };

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
            showToast("Please login to add products to cart", "error");
            return;
        }

        if (product.stock <= 0) {
            showToast("Product is out of stock", "error");
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

            showToast(response.data.message);

        } catch (error) {

            showToast(
                error.response?.data?.message ||
                "Failed to add product to cart",
                "error"
            );

        }

    };


    /* =========================
       Wishlist
    ========================= */

    const handleWishlist = async () => {

        if (!user) {
            showToast("Please login to use wishlist", "error");
            return;
        }

        try {

            const response = await api.post(
                `/wishlist/${product._id}`
            );

            const added = response.data.message?.toLowerCase().includes("added");
            setWishlisted(added);

            /* heart pop animation */
            setWishlistAnim(true);
            setTimeout(() => setWishlistAnim(false), 500);

            showToast(response.data.message);

        } catch (error) {

            showToast(
                error.response?.data?.message ||
                "Failed to update wishlist",
                "error"
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
        <>
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
                                    className={`thumbnail ${selectedImage === index
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
                                className={`details-wishlist-btn${wishlisted ? " wishlisted" : ""}`}
                                onClick={handleWishlist}
                                aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <svg
                                    key={wishlistAnim ? "anim" : "idle"}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill={wishlisted ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`wishlist-heart-icon${wishlistAnim ? " wishlist-pop" : ""}`}
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <span>
                                    {wishlisted ? "Wishlisted" : "Wishlist"}
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

        {/* Toast Notification */}
        {toast && (
            <div className={`pd-toast pd-toast--${toast.type}`}>
                <span className="pd-toast-icon">
                    {toast.type === "success" ? "✓" : "✕"}
                </span>
                {toast.message}
            </div>
        )}
        </>
    );
};

export default ProductDetails;