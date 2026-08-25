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
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <div>

                <div>
                    <h2>Products</h2>
                    <p>{stats.products}</p>
                </div>

                <div>
                    <h2>Orders</h2>
                    <p>{stats.orders}</p>
                </div>

                <div>
                    <h2>Users</h2>
                    <p>{stats.users}</p>
                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;