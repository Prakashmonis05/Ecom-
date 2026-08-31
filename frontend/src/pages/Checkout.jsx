import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
        <div className="page-shell">

            <div className="page-header">
                <h1>Checkout</h1>
            </div>

            {error && (
                <p className="status-badge status-badge-error">
                    {error}
                </p>
            )}

            <form
                className="form-card"
                onSubmit={placeOrder}
            >

                <h2>Shipping Address</h2>

                <div className="form-field">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h2>Payment Method</h2>

                <p className="status-badge">
                    Cash on Delivery
                </p>

                <button
                    className="button button-primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Placing Order..."
                        : "Place Order"}
                </button>

            </form>

        </div>
    );
};

export default Checkout;
