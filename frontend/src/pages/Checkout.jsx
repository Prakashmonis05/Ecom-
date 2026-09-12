import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/LoadingAnimation";
import "./Checkout.css";

const Checkout = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [cart, setCart] = useState({ items: [] });
    const [cartLoading, setCartLoading] = useState(true);
    const [updatingItem, setUpdatingItem] = useState(null);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch user cart
    const fetchCart = async () => {
        try {
            setCartLoading(true);
            const response = await api.get("/cart");
            if (response.data?.cart) {
                setCart(response.data.cart);
            }
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setError("Failed to load your cart items. Please refresh.");
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Update item quantity directly in Checkout
    const handleUpdateQuantity = async (productId, currentQty, delta) => {
        const newQty = currentQty + delta;
        if (newQty < 1) return;

        setUpdatingItem(productId);
        setError("");
        try {
            const response = await api.put(`/cart/${productId}`, {
                quantity: newQty
            });
            if (response.data?.cart) {
                setCart(response.data.cart);
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to update quantity"
            );
        } finally {
            setUpdatingItem(null);
        }
    };

    // Remove item directly in Checkout
    const handleRemoveItem = async (productId) => {
        setUpdatingItem(productId);
        setError("");
        try {
            const response = await api.delete(`/cart/${productId}`);
            if (response.data?.cart) {
                setCart(response.data.cart);
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to remove item"
            );
        } finally {
            setUpdatingItem(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Check if any item has quantity > available stock
    const cartItems = cart.items || [];
    const stockErrors = cartItems.filter(item => {
        const availableStock = item.product?.stock ?? 0;
        return item.quantity > availableStock;
    });

    const hasStockIssue = stockErrors.length > 0;
    const isCartEmpty = cartItems.length === 0;

    // Calculate subtotal & total
    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.product?.price || 0;
        return acc + price * item.quantity;
    }, 0);

    const placeOrder = async (e) => {
        e.preventDefault();

        if (isCartEmpty) {
            setError("Your cart is empty. Add items before checking out.");
            return;
        }

        if (hasStockIssue) {
            setError(
                "Some items in your cart exceed available stock. Please reduce their quantities before placing your order."
            );
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/orders", formData);

            if (!response.data.success) {
                setError(response.data.message);
                return;
            }

            navigate("/order-success", {
                state: {
                    order: response.data.order
                }
            });

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to place order"
            );
        } finally {
            setLoading(false);
        }
    };

    if (cartLoading) {
        return (
            <main className="checkout-page">
                <div className="checkout-container checkout-loading">
                    <LoadingSpinner size="lg" />
                    <p className="page-loading-text">Loading your checkout details...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <div className="checkout-container">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="checkout-header">
                    <div>
                        <span className="checkout-label">
                            VEYRO CHECKOUT
                        </span>
                        <h1>
                            Complete your order
                        </h1>
                        <p>
                            Review your items and enter your delivery details to place your order.
                        </p>
                    </div>
                </div>

                {/* =================================
                    ERROR BANNERS
                ================================= */}

                {error && (
                    <div className="checkout-error">
                        <span>!</span>
                        <p>{error}</p>
                    </div>
                )}

                {hasStockIssue && !error && (
                    <div className="checkout-stock-alert">
                        <span className="alert-icon">⚠️</span>
                        <div>
                            <strong>Stock Alert: Insufficient Quantity</strong>
                            <p>
                                One or more items in your cart exceed available stock. Please reduce the item quantity below to proceed with checkout.
                            </p>
                        </div>
                    </div>
                )}

                {isCartEmpty ? (
                    <div className="checkout-empty-cart">
                        <h2>Your Cart is Empty</h2>
                        <p>You don't have any items in your cart to checkout.</p>
                        <Link to="/products" className="checkout-shop-btn">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <form
                        className="checkout-layout"
                        onSubmit={placeOrder}
                    >
                        {/* =================================
                            LEFT CONTENT
                        ================================= */}

                        <div className="checkout-main">

                            {/* 1. SHIPPING ADDRESS */}
                            <section className="checkout-card">
                                <div className="checkout-card-header">
                                    <div className="checkout-number">01</div>
                                    <div>
                                        <h2>Delivery Address</h2>
                                        <p>Where should we deliver your order?</p>
                                    </div>
                                </div>

                                <div className="checkout-fields">
                                    <div className="checkout-field full">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field full">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field full">
                                        <label>Address</label>
                                        <textarea
                                            name="address"
                                            placeholder="House number, street, area"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows="3"
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field">
                                        <label>State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field full">
                                        <label>Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder="6-digit pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            maxLength="6"
                                            required
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 2. ORDER ITEMS & STOCK CHECK */}
                            <section className="checkout-card">
                                <div className="checkout-card-header">
                                    <div className="checkout-number">02</div>
                                    <div>
                                        <h2>Review Items ({cartItems.length})</h2>
                                        <p>Check item quantities and availability</p>
                                    </div>
                                </div>

                                <div className="checkout-items-list">
                                    {cartItems.map((item) => {
                                        const prod = item.product || {};
                                        const availableStock = prod.stock ?? 0;
                                        const isExceeded = item.quantity > availableStock;
                                        const isOut = availableStock <= 0;
                                        const isUpdating = updatingItem === prod._id;

                                        return (
                                            <div
                                                key={item._id || prod._id}
                                                className={`checkout-item ${isExceeded ? "item-stock-exceeded" : ""}`}
                                            >
                                                <img
                                                    src={prod.images?.[0] || "/placeholder.jpg"}
                                                    alt={prod.name}
                                                    className="checkout-item-img"
                                                />

                                                <div className="checkout-item-details">
                                                    <h3 className="checkout-item-name">{prod.name || "Product"}</h3>
                                                    <p className="checkout-item-price">
                                                        ₹{prod.price?.toLocaleString()} each
                                                    </p>

                                                    {/* Stock badge/warning */}
                                                    {isOut ? (
                                                        <span className="stock-warning-badge out-of-stock">
                                                            Out of stock! Please remove.
                                                        </span>
                                                    ) : isExceeded ? (
                                                        <span className="stock-warning-badge stock-exceeded">
                                                            ⚠️ Exceeds available stock ({availableStock} available). Please reduce.
                                                        </span>
                                                    ) : (
                                                        <span className="stock-in-stock-badge">
                                                            ✓ In stock ({availableStock} available)
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="checkout-item-actions">
                                                    <div className="checkout-qty-controls">
                                                        <button
                                                            type="button"
                                                            className="qty-btn"
                                                            onClick={() => handleUpdateQuantity(prod._id, item.quantity, -1)}
                                                            disabled={item.quantity <= 1 || isUpdating}
                                                            title="Decrease Quantity"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="qty-value">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            className="qty-btn"
                                                            onClick={() => handleUpdateQuantity(prod._id, item.quantity, 1)}
                                                            disabled={isUpdating || item.quantity >= availableStock}
                                                            title="Increase Quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="checkout-item-remove-btn"
                                                        onClick={() => handleRemoveItem(prod._id)}
                                                        disabled={isUpdating}
                                                        title="Remove item"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="checkout-item-total">
                                                    ₹{(prod.price * item.quantity)?.toLocaleString()}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* 3. PAYMENT */}
                            <section className="checkout-card">
                                <div className="checkout-card-header">
                                    <div className="checkout-number">03</div>
                                    <div>
                                        <h2>Payment Method</h2>
                                        <p>Select your preferred payment option.</p>
                                    </div>
                                </div>

                                <div className="payment-option selected">
                                    <div className="payment-radio">
                                        <span></span>
                                    </div>
                                    <div className="payment-info">
                                        <strong>Cash on Delivery</strong>
                                        <p>Pay when your order arrives.</p>
                                    </div>
                                    <div className="payment-icon">₹</div>
                                </div>
                            </section>

                        </div>

                        {/* =================================
                            RIGHT SIDEBAR
                        ================================= */}

                        <aside className="checkout-sidebar">

                            {/* ORDER SUMMARY */}
                            <section className="checkout-summary">
                                <div className="summary-title">
                                    <h2>Order Summary</h2>
                                    <span>{cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Delivery</span>
                                    <strong>FREE</strong>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-total">
                                    <span>Total</span>
                                    <strong>₹{subtotal.toLocaleString()}</strong>
                                </div>

                                {hasStockIssue && (
                                    <div className="summary-stock-warning">
                                        Please fix stock errors before placing order.
                                    </div>
                                )}

                                <button
                                    className="place-order-btn"
                                    type="submit"
                                    disabled={loading || hasStockIssue || isCartEmpty}
                                >
                                    {loading
                                        ? "Placing Order..."
                                        : "Place Order"}
                                </button>

                                <p className="secure-checkout">
                                    🔒 Secure checkout
                                </p>
                            </section>

                            {/* BENEFITS */}
                            <div className="checkout-benefits">
                                <div className="checkout-benefit">
                                    <span>✓</span>
                                    <div>
                                        <strong>Secure checkout</strong>
                                        <p>Your information is protected.</p>
                                    </div>
                                </div>

                                <div className="checkout-benefit">
                                    <span>✓</span>
                                    <div>
                                        <strong>Free delivery</strong>
                                        <p>No additional delivery charges.</p>
                                    </div>
                                </div>

                                <div className="checkout-benefit">
                                    <span>✓</span>
                                    <div>
                                        <strong>Easy cancellation</strong>
                                        <p>Cancel eligible orders easily.</p>
                                    </div>
                                </div>
                            </div>

                        </aside>

                    </form>
                )}

            </div>
        </main>
    );
};

export default Checkout;