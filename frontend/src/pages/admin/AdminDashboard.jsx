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
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <div>

                <h2>Products</h2>

                <p>{stats.totalProducts}</p>

                <Link to="/admin/products">
                    Manage Products
                </Link>

                <br />

                <Link to="/admin/products/low-stock">
                    View Low Stock Products
                </Link>

            </div>
            <hr />

            <div>

                <h2>Orders</h2>
                <p>{stats.totalOrders}</p>

                <Link to="/admin/orders">
                    Manage Orders
                </Link>

            </div>

            <hr />

            <div>

                <h2>Categories</h2>

                <Link to="/admin/categories">
                    Manage Categories
                </Link>

            </div>

            <hr />

            <div>

                <h2>Users</h2>
                <p>{stats.totalUsers}</p>

                <Link to="/admin/users">
                    Manage Users
                </Link>

            </div>

            <hr />

            <div>
                <h2>Total Revenue</h2>
                <p>₹{stats.totalRevenue}</p>
            </div>

        </div>
    );
};

export default AdminDashboard;