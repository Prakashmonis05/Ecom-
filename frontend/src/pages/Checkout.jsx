import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Checkout = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const placeOrder = async () => {

        setLoading(true);
        setError("");

        try {

            const response = await api.post("/orders");

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
        <div>

            <h1>Checkout</h1>

            <p>
                Payment Method: Cash on Delivery
            </p>

            {error && (
                <p>{error}</p>
            )}

            <button
                onClick={placeOrder}
                disabled={loading}
            >
                {loading
                    ? "Placing Order..."
                    : "Place Order"}
            </button>

        </div>
    );
};

export default Checkout;