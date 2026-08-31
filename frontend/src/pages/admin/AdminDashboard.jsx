import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStats = async () => {

        try {

            const response = await api.get("/admin/dashboard");

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
                <p className="admin-state__message">
                    Loading dashboard...
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
        <div className="admin-page admin-dashboard">

            <header className="admin-page__header">
                <h1 className="admin-page__title">Admin Dashboard</h1>
            </header>

            <div className="admin-dashboard__grid">

                <section className="admin-card admin-card--products">

                    <h2 className="admin-card__title">Products</h2>

                    <p className="admin-card__metric">
                        {stats.totalProducts}
                    </p>

                    <div className="admin-card__actions">
                        <Link
                            className="admin-link admin-link--action"
                            to="/admin/products"
                        >
                            Manage Products
                        </Link>

                        <Link
                            className="admin-link admin-link--action"
                            to="/admin/products/low-stock"
                        >
                            View Low Stock Products
                        </Link>
                    </div>

                </section>

                <section className="admin-card admin-card--orders">

                    <h2 className="admin-card__title">Orders</h2>
                    <p className="admin-card__metric">
                        {stats.totalOrders}
                    </p>

                    <div className="admin-card__actions">
                        <Link
                            className="admin-link admin-link--action"
                            to="/admin/orders"
                        >
                            Manage Orders
                        </Link>
                    </div>

                </section>

                <section className="admin-card admin-card--categories">

                    <h2 className="admin-card__title">Categories</h2>

                    <div className="admin-card__actions">
                        <Link
                            className="admin-link admin-link--action"
                            to="/admin/categories"
                        >
                            Manage Categories
                        </Link>
                    </div>

                </section>

                <section className="admin-card admin-card--users">

                    <h2 className="admin-card__title">Users</h2>
                    <p className="admin-card__metric">
                        {stats.totalUsers}
                    </p>

                    <div className="admin-card__actions">
                        <Link
                            className="admin-link admin-link--action"
                            to="/admin/users"
                        >
                            Manage Users
                        </Link>
                    </div>
                </section>

                <section className="admin-card admin-card--revenue">
                    <h2 className="admin-card__title">Total Revenue</h2>
                    <p className="admin-card__metric">
                        ₹{stats.totalRevenue}
                    </p>
                </section>
            </div>

        </div>
    );
};

export default AdminDashboard;
