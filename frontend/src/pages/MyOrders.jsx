import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { LoadingSpinner } from "../components/LoadingAnimation";
import "./MyOrders.css";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState(null);

    const fetchOrders = async () => {

        try {

            const response = await api.get("/orders");

            setOrders(response.data.orders);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const cancelOrder = async (orderId) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        setCancellingId(orderId);

        try {

            const response = await api.put(
                `/orders/${orderId}/cancel`
            );

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order._id === orderId
                        ? response.data.order
                        : order
                )
            );

            alert(response.data.message);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to cancel order"
            );

        } finally {

            setCancellingId(null);
        }
    };

    if (loading) {
        return (
            <div className="page-loading-wrapper">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return <p className="orders-status orders-error">{error}</p>;
    }

    if (orders.length === 0) {

        return (
            <div className="orders-page">

                <h1 className="orders-title">My Orders</h1>

                <div className="orders-empty">

                    <p>
                        You haven't placed any orders yet.
                    </p>

                    <Link
                        to="/products"
                        className="orders-empty-link"
                    >
                        Start Shopping
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div className="orders-page">

            <h1 className="orders-title">My Orders</h1>

            <div className="orders-list">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="order-card"
                    >

                        <div className="order-card-header">

                            <div>

                                <h2 className="order-id">
                                    Order #{order._id}
                                </h2>

                                <p className="order-date">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                            <span
                                className={`order-badge status-${order.orderStatus}`}
                            >
                                {order.orderStatus}
                            </span>

                        </div>

                        <div className="order-card-meta">

                            <div className="order-meta-item">
                                <span className="order-meta-label">Total</span>
                                <span className="order-meta-value">
                                    ₹{order.totalAmount}
                                </span>
                            </div>

                            <div className="order-meta-item">
                                <span className="order-meta-label">Payment</span>
                                <span className="order-meta-value">
                                    {order.paymentMethod || "Cash on Delivery"}
                                </span>
                            </div>

                            <div className="order-meta-item">
                                <span className="order-meta-label">Payment Status</span>
                                <span className="order-meta-value">
                                    {order.paymentStatus}
                                </span>
                            </div>

                        </div>

                        <div className="order-items">

                            {order.items.map((item) => (

                                <div
                                    key={item._id}
                                    className="order-item-row"
                                >

                                    <span className="order-item-name">
                                        {item.product?.name}
                                    </span>

                                    <span className="order-item-price">
                                        ₹{item.price} × {item.quantity}
                                    </span>

                                </div>

                            ))}

                        </div>

                        <div className="order-card-actions">

                            <Link
                                to={`/orders/${order._id}`}
                                className="order-view-link"
                            >
                                View Order
                            </Link>

                            {order.orderStatus === "processing" && (

                                <button
                                    className="order-cancel-btn"
                                    onClick={() =>
                                        cancelOrder(order._id)
                                    }
                                    disabled={
                                        cancellingId === order._id
                                    }
                                >
                                    {cancellingId === order._id
                                        ? "Cancelling..."
                                        : "Cancel Order"}
                                </button>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default MyOrders;