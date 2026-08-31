import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchStats = async () => {

        try {

            const response = await api.get(
                "/admin/dashboard"
            );

            setStats(response.data.stats);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {
        fetchStats();
    }, []);


    if (loading) {

        return (
            <div className="admin-page admin-state">

                <div className="admin-loader"></div>

                <p>
                    Loading dashboard...
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="admin-page admin-state">

                <div className="admin-error-icon">
                    !
                </div>

                <h2>
                    Dashboard unavailable
                </h2>

                <p>
                    {error}
                </p>

                <button
                    className="admin-retry-btn"
                    onClick={() => {
                        setLoading(true);
                        setError("");
                        fetchStats();
                    }}
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
                    HEADER
                ================================= */}

                <header className="admin-header">

                    <div>

                        <span className="admin-eyebrow">
                            VEYRO ADMIN
                        </span>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Overview of your store performance and operations.
                        </p>

                    </div>

                    <Link
                        to="/"
                        className="admin-store-link"
                    >
                        View Store →
                    </Link>

                </header>


                {/* =================================
                    STAT CARDS
                ================================= */}

                <section className="admin-stats-grid">


                    {/* PRODUCTS */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-top">

                            <span className="admin-stat-label">
                                PRODUCTS
                            </span>

                            <div className="admin-stat-icon">
                                ◈
                            </div>

                        </div>

                        <strong className="admin-stat-value">
                            {stats.totalProducts}
                        </strong>

                        <Link
                            to="/admin/products"
                            className="admin-stat-link"
                        >
                            Manage Products →
                        </Link>

                    </div>


                    {/* ORDERS */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-top">

                            <span className="admin-stat-label">
                                ORDERS
                            </span>

                            <div className="admin-stat-icon">
                                □
                            </div>

                        </div>

                        <strong className="admin-stat-value">
                            {stats.totalOrders}
                        </strong>

                        <Link
                            to="/admin/orders"
                            className="admin-stat-link"
                        >
                            Manage Orders →
                        </Link>

                    </div>


                    {/* USERS */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-top">

                            <span className="admin-stat-label">
                                CUSTOMERS
                            </span>

                            <div className="admin-stat-icon">
                                ◎
                            </div>

                        </div>

                        <strong className="admin-stat-value">
                            {stats.totalUsers}
                        </strong>

                        <Link
                            to="/admin/users"
                            className="admin-stat-link"
                        >
                            Manage Users →
                        </Link>

                    </div>


                    {/* REVENUE */}

                    <div className="admin-stat-card admin-stat-card--revenue">

                        <div className="admin-stat-top">

                            <span className="admin-stat-label">
                                TOTAL REVENUE
                            </span>

                            <div className="admin-stat-icon">
                                ₹
                            </div>

                        </div>

                        <strong className="admin-stat-value">
                            ₹{Number(
                                stats.totalRevenue || 0
                            ).toLocaleString("en-IN")}
                        </strong>

                        <span className="admin-stat-description">
                            Overall store revenue
                        </span>

                    </div>

                </section>


                {/* =================================
                    MANAGEMENT
                ================================= */}

                <section className="admin-section">

                    <div className="admin-section-header">

                        <div>

                            <span>
                                STORE MANAGEMENT
                            </span>

                            <h2>
                                Manage your store
                            </h2>

                        </div>

                    </div>


                    <div className="admin-management-grid">


                        {/* PRODUCTS */}

                        <Link
                            to="/admin/products"
                            className="admin-management-card"
                        >

                            <div className="management-icon">
                                ◈
                            </div>

                            <div className="management-content">

                                <h3>
                                    Products
                                </h3>

                                <p>
                                    Add, edit and manage products
                                    in your store.
                                </p>

                                <span>
                                    Manage Products →
                                </span>

                            </div>

                        </Link>


                        {/* LOW STOCK */}

                        <Link
                            to="/admin/products/low-stock"
                            className="admin-management-card"
                        >

                            <div className="management-icon warning">
                                !
                            </div>

                            <div className="management-content">

                                <h3>
                                    Inventory
                                </h3>

                                <p>
                                    Monitor products with low
                                    stock levels.
                                </p>

                                <span>
                                    Check Inventory →
                                </span>

                            </div>

                        </Link>


                        {/* ORDERS */}

                        <Link
                            to="/admin/orders"
                            className="admin-management-card"
                        >

                            <div className="management-icon">
                                □
                            </div>

                            <div className="management-content">

                                <h3>
                                    Orders
                                </h3>

                                <p>
                                    View and manage customer
                                    orders.
                                </p>

                                <span>
                                    Manage Orders →
                                </span>

                            </div>

                        </Link>


                        {/* CATEGORIES */}

                        <Link
                            to="/admin/categories"
                            className="admin-management-card"
                        >

                            <div className="management-icon">
                                #
                            </div>

                            <div className="management-content">

                                <h3>
                                    Categories
                                </h3>

                                <p>
                                    Organize your products into
                                    categories.
                                </p>

                                <span>
                                    Manage Categories →
                                </span>

                            </div>

                        </Link>


                        {/* USERS */}

                        <Link
                            to="/admin/users"
                            className="admin-management-card"
                        >

                            <div className="management-icon">
                                ◎
                            </div>

                            <div className="management-content">

                                <h3>
                                    Customers
                                </h3>

                                <p>
                                    View and manage registered
                                    customers.
                                </p>

                                <span>
                                    Manage Customers →
                                </span>

                            </div>

                        </Link>

                    </div>

                </section>


                {/* =================================
                    QUICK ACTIONS
                ================================= */}

                <section className="admin-quick-actions">

                    <div>

                        <span className="admin-section-label">
                            QUICK ACTION
                        </span>

                        <h2>
                            Keep your store running smoothly.
                        </h2>

                    </div>

                    <div className="quick-action-buttons">

                        <Link
                            to="/admin/products"
                            className="quick-primary"
                        >
                            Manage Products
                        </Link>

                        <Link
                            to="/admin/orders"
                            className="quick-secondary"
                        >
                            View Orders
                        </Link>

                    </div>

                </section>

            </div>

        </main>
    );
};

export default AdminDashboard;