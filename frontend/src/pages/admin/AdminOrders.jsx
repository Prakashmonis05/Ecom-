import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./AdminOrders.css";

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

    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
        const matchesSearch =
            !searchTerm ||
            order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const statusCounts = {
        all: orders.length,
        processing: orders.filter((o) => o.orderStatus === "processing").length,
        shipped: orders.filter((o) => o.orderStatus === "shipped").length,
        delivered: orders.filter((o) => o.orderStatus === "delivered").length,
        cancelled: orders.filter((o) => o.orderStatus === "cancelled").length
    };

    return (
        <div className="admin-page admin-orders">

            <header className="admin-page__header">
                <div>
                    <h1 className="admin-page__title">Manage Orders</h1>
                    <p className="admin-page__subtitle">
                        {orders.length} total orders placed across your store
                    </p>
                </div>

                <div className="admin-orders-search">
                    <input
                        type="text"
                        placeholder="Search by customer name, email, or Order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="search-clear-btn"
                            onClick={() => setSearchTerm("")}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </header>

            {/* Status Filter Tabs */}
            <div className="admin-orders-tabs">
                {[
                    { key: "all", label: "All Orders" },
                    { key: "processing", label: "Processing" },
                    { key: "shipped", label: "Shipped" },
                    { key: "delivered", label: "Delivered" },
                    { key: "cancelled", label: "Cancelled" }
                ].map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        className={`admin-order-tab ${statusFilter === tab.key ? "is-active" : ""}`}
                        onClick={() => setStatusFilter(tab.key)}
                    >
                        <span>{tab.label}</span>
                        <span className="tab-count">{statusCounts[tab.key] || 0}</span>
                    </button>
                ))}
            </div>

            {filteredOrders.length === 0 ? (

                <div className="admin-empty-state">
                    <p>No orders found matching your filter.</p>
                    {(statusFilter !== "all" || searchTerm) && (
                        <button
                            type="button"
                            className="admin-button admin-button--secondary"
                            onClick={() => {
                                setStatusFilter("all");
                                setSearchTerm("");
                            }}
                        >
                            Reset Filter
                        </button>
                    )}
                </div>

            ) : (

                <div className="admin-list admin-order-list">
                    {filteredOrders.map((order) => (

                        <article
                            className="admin-card admin-order-card"
                            key={order._id}
                        >

                            <div className="admin-order-card__header">
                                <div>
                                    <span className="order-number">
                                        Order #{order._id.slice(-8).toUpperCase()}
                                    </span>
                                    <span className="order-full-id">
                                        Full ID: {order._id}
                                    </span>
                                </div>

                                <div className="order-badges">
                                    <span className={`status-pill status-${order.orderStatus?.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="admin-order-card__meta">
                                <div className="order-meta-item">
                                    <span className="meta-label">Customer</span>
                                    <strong className="meta-value">{order.user?.name || "Customer"}</strong>
                                    <span className="meta-sub">{order.user?.email || "No email"}</span>
                                </div>

                                <div className="order-meta-item">
                                    <span className="meta-label">Order Total</span>
                                    <strong className="meta-value meta-price">₹{order.totalAmount}</strong>
                                    <span className="meta-sub">Items: {order.items?.length || 0}</span>
                                </div>

                                <div className="order-meta-item">
                                    <span className="meta-label">Payment</span>
                                    <strong className="meta-value">{order.paymentMethod || "COD"}</strong>
                                    <span className={`payment-status-badge ${order.paymentStatus === "paid" ? "paid" : "pending"}`}>
                                        {order.paymentStatus || "Unpaid"}
                                    </span>
                                </div>
                            </div>

                            <div className="admin-card__actions">
                                <div className="order-status-update-wrap">
                                    <label htmlFor={`status-${order._id}`}>Update Status:</label>
                                    <select
                                        id={`status-${order._id}`}
                                        className="admin-form__control admin-order-card__status-control"
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            updateStatus(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <Link
                                    className="admin-button admin-button--secondary"
                                    to={`/admin/orders/${order._id}`}
                                >
                                    View Details →
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
