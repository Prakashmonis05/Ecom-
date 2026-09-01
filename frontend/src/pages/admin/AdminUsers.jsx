import { useEffect, useState } from "react";
import api from "../../services/api";
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
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>Manage Users</h1>

            {users.length === 0 ? (

                <p>No users found.</p>

            ) : (

                users.map((user) => (

                    <div key={user._id}>

                        <h2>
                            {user.name}
                        </h2>

                        <p>
                            Email: {user.email}
                        </p>

                        <p>
                            Role: {user.role}
                        </p>

                        <p>
                            Joined:{" "}
                            {new Date(
                                user.createdAt
                            ).toLocaleDateString()}
                        </p>

                        <hr />

                    </div>

                ))

            )}

        </div>
    );
};

export default AdminUsers;