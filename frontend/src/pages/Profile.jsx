import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Profile.css";

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

    const initial = profile?.name?.charAt(0)?.toUpperCase() || "?";

    return (
        <div className="page-shell">

            <div className="page-header">
                <h1>My Profile</h1>
            </div>

            <div className="form-card profile-card">

                <div className="profile-avatar">
                    {initial}
                </div>

                <div className="profile-info">

                    <div className="profile-row">
                        <span className="profile-label">Name</span>
                        <span className="profile-value">{profile?.name}</span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-label">Email</span>
                        <span className="profile-value">{profile?.email}</span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-label">Role</span>
                        <span className="profile-value profile-role">
                            {profile?.role}
                        </span>
                    </div>

                </div>

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