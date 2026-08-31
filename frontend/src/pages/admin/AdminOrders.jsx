import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {

        try {

            const response = await api.get("/admin/orders");

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

    const updateStatus = async (orderId, status) => {

        try {

            const response = await api.put(
                `/admin/orders/${orderId}/status`,
                { status }
            );

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order._id === orderId
                        ? response.data.order
                        : order
                )
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update order status"
            );
        }
    };

    if (loading) {
        return (
            <div className="admin-page admin-state">
                <p className="admin-state__message">
                    Loading orders...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page admin-state">
                <p className="admin-state__message admin-state__message--error">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="admin-page admin-orders">

            <header className="admin-page__header">
                <h1 className="admin-page__title">Manage Orders</h1>
            </header>

            {orders.length === 0 ? (

                <div className="admin-empty-state">
                    <p>No orders found.</p>
                </div>

            ) : (

                <div className="admin-list admin-order-list">
                    {orders.map((order) => (

                        <article
                            className="admin-card admin-order-card"
                            key={order._id}
                        >

                            <h2 className="admin-card__title">
                                Order #{order._id}
                            </h2>

                            <div className="admin-order-card__meta">
                                <p>
                                    Customer: {order.user?.name}
                                </p>

                                <p>
                                    Email: {order.user?.email}
                                </p>

                                <p>
                                    Total: ₹{order.totalAmount}
                                </p>

                                <p>
                                    Payment: {order.paymentMethod}
                                </p>

                                <p>
                                    Payment Status: {order.paymentStatus}
                                </p>

                                <p>
                                    Current Status: {order.orderStatus}
                                </p>
                            </div>

                            <div className="admin-card__actions">
                                <select
                                    className="admin-form__control admin-order-card__status-control"
                                    value={order.orderStatus}
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="processing">
                                        Processing
                                    </option>

                                    <option value="shipped">
                                        Shipped
                                    </option>

                                    <option value="delivered">
                                        Delivered
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>

                                </select>

                                <Link
                                    className="admin-button admin-button--secondary"
                                    to={`/admin/orders/${order._id}`}
                                >
                                    View Order
                                </Link>
                            </div>

                        </article>

                    ))}

                </div>

            )}

        </div>
    );
};

export default AdminOrders;
