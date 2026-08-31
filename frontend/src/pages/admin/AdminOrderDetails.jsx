import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const AdminOrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    const fetchOrder = async () => {

        try {

            const response = await api.get(
                `/admin/orders/${id}`
            );

            setOrder(response.data.order);
            setStatus(response.data.order.orderStatus);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load order"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const updateStatus = async () => {

        setUpdating(true);
        setError("");

        try {

            const response = await api.put(
                `/admin/orders/${id}/status`,
                {
                    status
                }
            );

            setOrder(response.data.order);

            alert("Order status updated successfully");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdating(false);

        }

    };

    if (loading) {
        return (
            <div className="admin-page admin-state">
                <p className="admin-state__message">
                    Loading order...
                </p>
            </div>
        );
    }

    if (error && !order) {
        return (
            <div className="admin-page admin-state">
                <p className="admin-state__message admin-state__message--error">
                    {error}
                </p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="admin-page admin-state">
                <p className="admin-state__message">
                    Order not found
                </p>
            </div>
        );
    }

    return (
        <div className="admin-page admin-order-details">

            <header className="admin-page__header">
                <h1 className="admin-page__title">Order Details</h1>

                <div className="admin-order-details__summary">
                    <p>
                        Order ID: {order._id}
                    </p>

                    <p>
                        Date:{" "}
                        {new Date(
                            order.createdAt
                        ).toLocaleDateString()}
                    </p>
                </div>
            </header>

            <div className="admin-detail-grid">
                <section className="admin-card admin-detail-card">
                    <h2 className="admin-card__title">Customer</h2>

                    <div className="admin-detail-card__content">
                        <p>
                            Name: {order.user?.name}
                        </p>

                        <p>
                            Email: {order.user?.email}
                        </p>
                    </div>
                </section>

                <section className="admin-card admin-detail-card">
                    <h2 className="admin-card__title">Shipping Address</h2>

                    <div className="admin-detail-card__content">
                        <p>{order.shippingAddress?.name}</p>
                        <p>{order.shippingAddress?.phone}</p>
                        <p>{order.shippingAddress?.address}</p>
                        <p>
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.state}
                        </p>
                        <p>{order.shippingAddress?.pincode}</p>
                    </div>
                </section>
            </div>

            <section className="admin-card admin-order-items">
                <h2 className="admin-card__title">Items</h2>

                <div className="admin-list admin-order-items__list">
                    {order.items.map((item) => (

                        <div className="admin-order-item" key={item._id}>

                            <p>
                                {item.product?.name}
                            </p>

                            <p>
                                ₹{item.price} × {item.quantity}
                            </p>

                            <p>
                                Subtotal: ₹
                                {item.price * item.quantity}
                            </p>

                        </div>

                    ))}

                </div>

                <h2 className="admin-order-items__total">
                    Total: ₹{order.totalAmount}
                </h2>
            </section>

            <section className="admin-card admin-order-status">
                <h2 className="admin-card__title">Order Status</h2>

                <div className="admin-card__actions">
                    <select
                        className="admin-form__control admin-order-status__control"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
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

                    <button
                        className="admin-button admin-button--primary"
                        onClick={updateStatus}
                        disabled={updating || status === order.orderStatus}
                    >
                        {updating
                            ? "Updating..."
                            : "Update Status"}
                    </button>
                </div>

                {error && (
                    <p className="admin-form__message admin-form__message--error">
                        {error}
                    </p>
                )}
            </section>

            <div className="admin-page__footer-actions">
                <Link
                    className="admin-button admin-button--secondary"
                    to="/admin/orders"
                >
                    Back to Orders
                </Link>
            </div>

        </div>
    );
};

export default AdminOrderDetails;
