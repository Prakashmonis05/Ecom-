import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { LoadingSpinner } from "../../components/LoadingAnimation";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const { user } = useAuth();

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState("");

    const fetchDashboardData = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setIsRefreshing(true);
            } else {
                setLoading(true);
            }
            setError("");

            const [statsRes, ordersRes, lowStockRes] = await Promise.allSettled([
                api.get("/admin/dashboard"),
                api.get("/admin/orders"),
                api.get("/admin/products/low-stock?threshold=5")
            ]);

            if (statsRes.status === "fulfilled") {
                setStats(statsRes.value.data.stats || {
                    totalProducts: 0,
                    totalOrders: 0,
                    totalUsers: 0,
                    totalRevenue: 0
                });
            } else {
                setError(statsRes.reason?.response?.data?.message || "Failed to load stats");
            }

            if (ordersRes.status === "fulfilled") {
                setRecentOrders(ordersRes.value.data.orders || []);
            }

            if (lowStockRes.status === "fulfilled") {
                setLowStockProducts(lowStockRes.value.data.products || []);
            }

        } catch (err) {
            setError(err.message || "Failed to load dashboard");
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    // Calculate metrics
    const aov = stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0;
    const pendingOrdersCount = recentOrders.filter(
        (o) => o.orderStatus === "pending" || o.orderStatus === "processing"
    ).length;
    const deliveredOrdersCount = recentOrders.filter(
        (o) => o.orderStatus === "delivered"
    ).length;
    const cancelledOrdersCount = recentOrders.filter(
        (o) => o.orderStatus === "cancelled"
    ).length;

    // Date formatting helper
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    if (loading) {
        return (
            <div className="admin-page admin-state">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">Loading executive dashboard...</p>
            </div>
        );
    }

    if (error && !stats.totalProducts && !stats.totalRevenue) {
        return (
            <div className="admin-page admin-state">
                <div className="admin-error-icon">!</div>
                <h2>Dashboard unavailable</h2>
                <p>{error}</p>
                <button
                    className="admin-retry-btn"
                    onClick={() => fetchDashboardData()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <main className="admin-page">
            <div className="admin-container">

                {/* =================================
                    TOP HERO & GREETING HEADER
                ================================= */}
                <header className="admin-header">
                    <div className="admin-header-main">
                        <div className="admin-header-tags">
                            <span className="admin-eyebrow">
                                ADMIN PORTAL
                            </span>
                            <span className="admin-live-pill">
                                <span className="live-pulse"></span>
                                Store Live
                            </span>
                        </div>

                        <h1>
                            {getGreeting()}, {user?.name || "Administrator"}
                        </h1>

                        <p>
                            Live store metrics, order fulfillment, and catalog health.
                        </p>
                    </div>

                    <div className="admin-header-actions">
                        <button
                            type="button"
                            className={`admin-refresh-btn ${isRefreshing ? "is-spinning" : ""}`}
                            onClick={() => fetchDashboardData(true)}
                            title="Refresh dashboard metrics"
                            aria-label="Refresh metrics"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                            </svg>
                            <span>Refresh</span>
                        </button>

                        <Link
                            to="/admin/products/create"
                            className="admin-action-btn primary"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            <span>New Product</span>
                        </Link>

                        <Link
                            to="/"
                            className="admin-action-btn secondary"
                        >
                            View Store →
                        </Link>
                    </div>
                </header>

                {/* =================================
                    KEY METRICS KPI CARDS
                ================================= */}
                <section className="admin-stats-grid">

                    {/* REVENUE */}
                    <div className="admin-stat-card stat-card-revenue">
                        <div className="admin-stat-top">
                            <span className="admin-stat-label">TOTAL REVENUE</span>
                            <div className="admin-stat-icon revenue-icon">
                                ₹
                            </div>
                        </div>
                        <strong className="admin-stat-value">
                            ₹{Number(stats.totalRevenue || 0).toLocaleString("en-IN")}
                        </strong>
                        <div className="admin-stat-footer">
                            <span className="stat-micro-badge">
                                AOV: ₹{aov.toLocaleString("en-IN")}
                            </span>
                            <span className="stat-hint">Total Gross Sales</span>
                        </div>
                    </div>

                    {/* ORDERS */}
                    <div className="admin-stat-card">
                        <div className="admin-stat-top">
                            <span className="admin-stat-label">TOTAL ORDERS</span>
                            <div className="admin-stat-icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                                    <line x1="3" y1="6" x2="21" y2="6"/>
                                    <path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                            </div>
                        </div>
                        <strong className="admin-stat-value">
                            {stats.totalOrders}
                        </strong>
                        <div className="admin-stat-footer">
                            <Link to="/admin/orders" className="admin-stat-link">
                                {pendingOrdersCount > 0 ? (
                                    <span className="alert-count-pill">{pendingOrdersCount} Pending</span>
                                ) : (
                                    "Manage Orders →"
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* PRODUCTS */}
                    <div className="admin-stat-card">
                        <div className="admin-stat-top">
                            <span className="admin-stat-label">PRODUCT CATALOG</span>
                            <div className="admin-stat-icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16.5 9.4 7.5 4.21"/>
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                                </svg>
                            </div>
                        </div>
                        <strong className="admin-stat-value">
                            {stats.totalProducts}
                        </strong>
                        <div className="admin-stat-footer">
                            {lowStockProducts.length > 0 ? (
                                <Link to="/admin/products/low-stock" className="low-stock-stat-pill">
                                    ⚠ {lowStockProducts.length} Low Stock
                                </Link>
                            ) : (
                                <Link to="/admin/products" className="admin-stat-link">
                                    Manage Products →
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* USERS */}
                    <div className="admin-stat-card">
                        <div className="admin-stat-top">
                            <span className="admin-stat-label">CUSTOMERS</span>
                            <div className="admin-stat-icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                        </div>
                        <strong className="admin-stat-value">
                            {stats.totalUsers}
                        </strong>
                        <div className="admin-stat-footer">
                            <Link to="/admin/users" className="admin-stat-link">
                                Manage Customers →
                            </Link>
                        </div>
                    </div>

                </section>

                {/* =================================
                    MAIN DASHBOARD 2-COLUMN SPLIT
                ================================= */}
                <div className="admin-dashboard-grid">

                    {/* PRIMARY LEFT COLUMN */}
                    <div className="admin-column-primary">

                        {/* RECENT ORDERS TABLE */}
                        <section className="admin-widget-card">
                            <div className="widget-header">
                                <div>
                                    <h3>Recent Orders</h3>
                                    <p>Latest customer transactions</p>
                                </div>
                                <Link to="/admin/orders" className="widget-link">
                                    View All ({recentOrders.length}) →
                                </Link>
                            </div>

                            {recentOrders.length === 0 ? (
                                <div className="widget-empty">
                                    <p>No orders recorded yet.</p>
                                </div>
                            ) : (
                                <div className="admin-table-responsive">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Order</th>
                                                <th>Customer</th>
                                                <th>Date</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.slice(0, 5).map((order) => (
                                                <tr key={order._id}>
                                                    <td className="order-code">
                                                        #{order._id.slice(-6).toUpperCase()}
                                                    </td>
                                                    <td className="order-customer">
                                                        {order.user?.name || "Customer"}
                                                    </td>
                                                    <td className="order-date">
                                                        {formatDate(order.createdAt)}
                                                    </td>
                                                    <td className="order-amount">
                                                        ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                                                    </td>
                                                    <td>
                                                        <span className={`status-pill status-${order.orderStatus?.toLowerCase()}`}>
                                                            {order.orderStatus}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/admin/orders/${order._id}`}
                                                            className="table-action-link"
                                                        >
                                                            Details →
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        {/* ORDER PIPELINE BREAKDOWN */}
                        <section className="admin-widget-card">
                            <div className="widget-header">
                                <div>
                                    <h3>Fulfillment Pipeline</h3>
                                    <p>Breakdown of active customer orders</p>
                                </div>
                            </div>

                            <div className="pipeline-grid">
                                <div className="pipeline-box box-pending">
                                    <span className="pipeline-count">{pendingOrdersCount}</span>
                                    <span className="pipeline-name">Pending / Processing</span>
                                </div>
                                <div className="pipeline-box box-delivered">
                                    <span className="pipeline-count">{deliveredOrdersCount}</span>
                                    <span className="pipeline-name">Delivered & Closed</span>
                                </div>
                                <div className="pipeline-box box-cancelled">
                                    <span className="pipeline-count">{cancelledOrdersCount}</span>
                                    <span className="pipeline-name">Cancelled</span>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* SECONDARY RIGHT COLUMN */}
                    <div className="admin-column-secondary">

                        {/* INVENTORY HEALTH & LOW STOCK ALERT */}
                        <section className="admin-widget-card">
                            <div className="widget-header">
                                <div>
                                    <h3>Inventory Alerts</h3>
                                    <p>Low stock threshold: ≤ 5</p>
                                </div>
                                <Link to="/admin/products/low-stock" className="widget-link">
                                    Audit ({lowStockProducts.length}) →
                                </Link>
                            </div>

                            {lowStockProducts.length === 0 ? (
                                <div className="inventory-healthy-box">
                                    <div className="healthy-icon">✓</div>
                                    <p>Inventory is fully stocked. No immediate items require attention.</p>
                                </div>
                            ) : (
                                <div className="low-stock-list">
                                    {lowStockProducts.slice(0, 4).map((product) => (
                                        <div key={product._id} className="low-stock-item">
                                            <div className="low-stock-item-info">
                                                <strong>{product.name}</strong>
                                                <span>₹{product.price}</span>
                                            </div>
                                            <div className="low-stock-badge-group">
                                                <span className={`stock-warning-badge ${product.stock === 0 ? "is-zero" : ""}`}>
                                                    {product.stock === 0 ? "Out of Stock" : `Only ${product.stock} left`}
                                                </span>
                                                <Link
                                                    to={`/admin/products/${product._id}/edit`}
                                                    className="restock-link"
                                                    title="Edit product stock"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* QUICK SHORTCUTS HUB */}
                        <section className="admin-widget-card">
                            <div className="widget-header">
                                <div>
                                    <h3>Quick Modules</h3>
                                    <p>Direct navigation</p>
                                </div>
                            </div>

                            <div className="admin-shortcuts-grid">
                                <Link to="/admin/products" className="shortcut-card">
                                    <div className="shortcut-icon">◈</div>
                                    <div>
                                        <h4>Products</h4>
                                        <p>Catalog list & editing</p>
                                    </div>
                                </Link>

                                <Link to="/admin/categories" className="shortcut-card">
                                    <div className="shortcut-icon">#</div>
                                    <div>
                                        <h4>Categories</h4>
                                        <p>Taxonomies & shelves</p>
                                    </div>
                                </Link>

                                <Link to="/admin/orders" className="shortcut-card">
                                    <div className="shortcut-icon">□</div>
                                    <div>
                                        <h4>Orders</h4>
                                        <p>Fulfill & review sales</p>
                                    </div>
                                </Link>

                                <Link to="/admin/users" className="shortcut-card">
                                    <div className="shortcut-icon">◎</div>
                                    <div>
                                        <h4>Customers</h4>
                                        <p>User registrations</p>
                                    </div>
                                </Link>
                            </div>
                        </section>

                    </div>

                </div>

            </div>
        </main>
    );
};

export default AdminDashboard;