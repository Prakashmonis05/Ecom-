import { useEffect, useState } from "react";
import api from "../../services/api";
import { LoadingSpinner } from "../../components/LoadingAnimation";
import "./AdminUsers.css";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {

        try {

            const response = await api.get("/admin/users");

            setUsers(response.data.users);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load users"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="admin-page admin-state admin-users-state">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page admin-users-state admin-users-state--error">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="admin-page admin-users">

            {/* HEADER */}

            <header className="admin-page__header">

                <h1 className="admin-page__title">
                    Manage Users
                </h1>

            </header>


            {/* USERS */}

            {users.length === 0 ? (

                <div className="admin-users-empty">
                    <p>No users found.</p>
                </div>

            ) : (

                <div className="admin-users-table-wrapper">

                    <table className="admin-users-table">

                        <thead>

                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => {

                                const initial =
                                    user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "?";

                                return (

                                    <tr key={user._id}>

                                        {/* USER */}

                                        <td>

                                            <div className="admin-user-name">

                                                <span className="admin-user-avatar">
                                                    {initial}
                                                </span>

                                                <span>
                                                    {user.name}
                                                </span>

                                            </div>

                                        </td>


                                        {/* EMAIL */}

                                        <td>

                                            <span className="admin-user-email">
                                                {user.email}
                                            </span>

                                        </td>


                                        {/* ROLE */}

                                        <td>

                                            <span
                                                className={`admin-user-role ${
                                                    user.role === "admin"
                                                        ? "admin-user-role--admin"
                                                        : ""
                                                }`}
                                            >
                                                {user.role}
                                            </span>

                                        </td>


                                        {/* JOINED */}

                                        <td>

                                            <span className="admin-user-date">

                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}

                                            </span>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default AdminUsers;