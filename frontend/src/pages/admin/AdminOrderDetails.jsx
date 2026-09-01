import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "./AdminOrderDetails.css";

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

        {/* HEADER */}

        <header className="admin-page__header order-details-header">

            <div>

                <span className="admin-page__eyebrow">
                    ORDER MANAGEMENT
                </span>

                <h1 className="admin-page__title">
                    Order Details
                </h1>

                <div className="order-meta">
                    <span>
                        Order #{order._id}
                    </span>

                    <span className="order-meta__separator">
                        •
                    </span>

                    <span>
                        {new Date(
                            order.createdAt
                        ).toLocaleDateString()}
                    </span>
                </div>

            </div>

            <span
                className={`order-status-badge order-status-badge--${order.orderStatus}`}
            >
                {order.orderStatus}
            </span>

        </header>


        {/* CUSTOMER + SHIPPING */}

        <div className="admin-detail-grid">

            <section className="admin-card order-info-card">

                <div className="order-card-heading">
                    <span className="order-card-icon">
                        👤
                    </span>

                    <div>
                        <span className="order-card-label">
                            CUSTOMER
                        </span>

                        <h2>
                            Customer Information
                        </h2>
                    </div>
                </div>

                <div className="order-info-list">

                    <div className="order-info-row">
                        <span>Name</span>
                        <strong>
                            {order.user?.name || "—"}
                        </strong>
                    </div>

                    <div className="order-info-row">
                        <span>Email</span>
                        <strong>
                            {order.user?.email || "—"}
                        </strong>
                    </div>

                </div>

            </section>


            <section className="admin-card order-info-card">

                <div className="order-card-heading">
                    <span className="order-card-icon">
                        📍
                    </span>

                    <div>
                        <span className="order-card-label">
                            DELIVERY
                        </span>

                        <h2>
                            Shipping Address
                        </h2>
                    </div>
                </div>

                <div className="shipping-address">

                    <strong>
                        {order.shippingAddress?.name}
                    </strong>

                    <span>
                        {order.shippingAddress?.phone}
                    </span>

                    <span>
                        {order.shippingAddress?.address}
                    </span>

                    <span>
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}
                    </span>

                    <span>
                        {order.shippingAddress?.pincode}
                    </span>

                </div>

            </section>

        </div>


        {/* ORDER ITEMS */}

        <section className="admin-card admin-order-items">

            <div className="order-section-header">

                <div>
                    <span className="order-card-label">
                        ORDER CONTENTS
                    </span>

                    <h2>
                        Items
                    </h2>
                </div>

                <span className="order-item-count">
                    {order.items.length}{" "}
                    {order.items.length === 1
                        ? "item"
                        : "items"}
                </span>

            </div>


            <div className="order-items-table">

                <div className="order-items-table__header">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Qty</span>
                    <span>Subtotal</span>
                </div>


                {order.items.map((item) => (

                    <div
                        className="order-item-row"
                        key={item._id}
                    >

                        <div className="order-product">

                            {item.product?.images?.length > 0 ? (

                                <img
                                    src={item.product.images[0]}
                                    alt={item.product?.name}
                                />

                            ) : (

                                <div className="order-product__placeholder">
                                    —
                                </div>

                            )}

                            <strong>
                                {item.product?.name ||
                                    "Product unavailable"}
                            </strong>

                        </div>

                        <span>
                            ₹{item.price}
                        </span>

                        <span>
                            {item.quantity}
                        </span>

                        <strong>
                            ₹
                            {item.price *
                                item.quantity}
                        </strong>

                    </div>

                ))}

            </div>


            <div className="order-total">

                <span>
                    Total Amount
                </span>

                <strong>
                    ₹{order.totalAmount}
                </strong>

            </div>

        </section>


        {/* STATUS MANAGEMENT */}

        <section className="admin-card order-status-card">

            <div className="order-status-card__info">

                <span className="order-card-label">
                    ORDER MANAGEMENT
                </span>

                <h2>
                    Update Order Status
                </h2>

                <p>
                    Change the current order status to keep
                    the customer and inventory information
                    up to date.
                </p>

            </div>


            <div className="order-status-controls">

                <div className="order-status-select">

                    <label htmlFor="order-status">
                        Status
                    </label>

                    <select
                        id="order-status"
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

                </div>


                <button
                    className="admin-button admin-button--primary order-update-button"
                    onClick={updateStatus}
                    disabled={
                        updating ||
                        status === order.orderStatus
                    }
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


        {/* FOOTER */}

        <div className="admin-page__footer-actions">

            <Link
                className="admin-button admin-button--secondary"
                to="/admin/orders"
            >
                ← Back to Orders
            </Link>

        </div>

    </div>
);
};

export default AdminOrderDetails;
