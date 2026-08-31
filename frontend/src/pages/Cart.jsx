import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cart.css";

const Cart = () => {

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchCart = async () => {

        try {

            const response = await api.get("/cart");

            setCart(response.data.cart);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load cart"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId, quantity) => {

        try {

            const response = await api.put(
                `/cart/${productId}`,
                { quantity }
            );

            setCart(response.data.cart);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update cart"
            );

        }

    };

    const removeItem = async (productId) => {

        try {

            const response = await api.delete(
                `/cart/${productId}`
            );

            setCart(response.data.cart);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to remove product"
            );

        }

    };

    if (loading) {
        return <p className="cart-status">Loading cart...</p>;
    }

    if (error) {
        return <p className="cart-status cart-error">{error}</p>;
    }

    if (!cart || cart.items.length === 0) {

        return (
            <div className="cart-page">

                <h1 className="cart-title">Your Cart</h1>

                <div className="cart-empty">

                    <p>Your cart is empty.</p>

                    <Link
                        to="/products"
                        className="cart-empty-link"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        );

    }

    const totalPrice = cart.items.reduce(
        (total, item) => {
            return total + (
                item.product.price * item.quantity
            );
        },
        0
    );

    return (
        <div className="cart-page">

            <h1 className="cart-title">Your Cart</h1>

            <div className="cart-layout">

                <div className="cart-items">

                    {cart.items.map((item) => (

                        <div
                            key={item._id}
                            className="cart-item"
                        >

                            <div className="cart-item-image">

                                {item.product.images?.length > 0 ? (
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                    />
                                ) : (
                                    <div className="cart-no-image">
                                        No Image
                                    </div>
                                )}

                            </div>

                            <div className="cart-item-details">

                                <h2 className="cart-item-name">
                                    {item.product.name}
                                </h2>

                                <p className="cart-item-price">
                                    ₹{item.product.price}
                                </p>

                                <div className="cart-item-qty">

                                    <button
                                        disabled={item.quantity <= 1}
                                        onClick={() =>
                                            updateQuantity(
                                                item.product._id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        disabled={
                                            item.quantity >= item.product.stock
                                        }
                                        onClick={() =>
                                            updateQuantity(
                                                item.product._id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    className="cart-remove-btn"
                                    onClick={() =>
                                        removeItem(item.product._id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                            <div className="cart-item-subtotal">
                                ₹{item.product.price * item.quantity}
                            </div>

                        </div>

                    ))}

                </div>

                <div className="cart-summary">

                    <h2 className="cart-summary-title">
                        Order Summary
                    </h2>

                    <div className="cart-summary-row">
                        <span>Subtotal</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <div className="cart-summary-total">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <button
                        className="cart-checkout-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to Checkout
                    </button>

                    <Link
                        to="/products"
                        className="cart-continue-link"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default Cart;