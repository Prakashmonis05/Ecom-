import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Checkout.css";

const Checkout = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const placeOrder = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await api.post(
                "/orders",
                formData
            );

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
                            Enter your delivery details to place your order.
                        </p>

                    </div>

                </div>


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="checkout-error">

                        <span>!</span>

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                <form
                    className="checkout-layout"
                    onSubmit={placeOrder}
                >


                    {/* =================================
                        LEFT
                    ================================= */}

                    <div className="checkout-main">


                        {/* SHIPPING */}

                        <section className="checkout-card">

                            <div className="checkout-card-header">

                                <div className="checkout-number">
                                    01
                                </div>

                                <div>

                                    <h2>
                                        Delivery Address
                                    </h2>

                                    <p>
                                        Where should we deliver your order?
                                    </p>

                                </div>

                            </div>


                            <div className="checkout-fields">


                                <div className="checkout-field full">

                                    <label>
                                        Full Name
                                    </label>

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

                                    <label>
                                        Phone Number
                                    </label>

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

                                    <label>
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        placeholder="House number, street, area"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    />

                                </div>


                                <div className="checkout-field">

                                    <label>
                                        City
                                    </label>

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

                                    <label>
                                        State
                                    </label>

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

                                    <label>
                                        Pincode
                                    </label>

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


                        {/* PAYMENT */}

                        <section className="checkout-card">

                            <div className="checkout-card-header">

                                <div className="checkout-number">
                                    02
                                </div>

                                <div>

                                    <h2>
                                        Payment Method
                                    </h2>

                                    <p>
                                        Select your preferred payment option.
                                    </p>

                                </div>

                            </div>


                            <div className="payment-option selected">

                                <div className="payment-radio">
                                    <span></span>
                                </div>


                                <div className="payment-info">

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <p>
                                        Pay when your order arrives.
                                    </p>

                                </div>


                                <div className="payment-icon">
                                    ₹
                                </div>

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

                                <h2>
                                    Order Summary
                                </h2>

                                <span>
                                    Your cart
                                </span>

                            </div>


                            <div className="summary-row">

                                <span>
                                    Products
                                </span>

                                <span>
                                    —
                                </span>

                            </div>


                            <div className="summary-row">

                                <span>
                                    Delivery
                                </span>

                                <strong>
                                    FREE
                                </strong>

                            </div>


                            <div className="summary-divider"></div>


                            <div className="summary-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    Calculated at checkout
                                </strong>

                            </div>


                            <button
                                className="place-order-btn"
                                type="submit"
                                disabled={loading}
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

                                <span>
                                    ✓
                                </span>

                                <div>

                                    <strong>
                                        Secure checkout
                                    </strong>

                                    <p>
                                        Your information is protected.
                                    </p>

                                </div>

                            </div>


                            <div className="checkout-benefit">

                                <span>
                                    ✓
                                </span>

                                <div>

                                    <strong>
                                        Free delivery
                                    </strong>

                                    <p>
                                        No additional delivery charges.
                                    </p>

                                </div>

                            </div>


                            <div className="checkout-benefit">

                                <span>
                                    ✓
                                </span>

                                <div>

                                    <strong>
                                        Easy cancellation
                                    </strong>

                                    <p>
                                        Cancel eligible orders easily.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </aside>

                </form>

            </div>

        </main>
    );
};

export default Checkout;