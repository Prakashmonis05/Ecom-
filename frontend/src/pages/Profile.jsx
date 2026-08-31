import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Profile = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProfile = async () => {

        try {

            const response = await api.get("/users/profile");

            setProfile(response.data.user);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="page-shell loading-state">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-shell">
                <p className="status-badge status-badge-error">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="page-shell">

            <div className="page-header">
                <h1>My Profile</h1>
            </div>

            <div className="form-card">
                <p>
                    Name: {profile?.name}
                </p>

                <p>
                    Email: {profile?.email}
                </p>

                <p>
                    Role: {profile?.role}
                </p>

                <Link
                    className="button button-secondary"
                    to="/change-password"
                >
                    Change Password
                </Link>
            </div>

        </div>
    );
};

export default Profile;
