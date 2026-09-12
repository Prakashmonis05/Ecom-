import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { LoadingSpinner } from "../components/LoadingAnimation";
import "./Profile.css";

const Profile = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchProfile = async () => {

        try {

            const response = await api.get("/users/profile");

            setProfile(response.data.user);
            setFormData({
                name: response.data.user?.name || "",
                email: response.data.user?.email || "",
                phone: response.data.user?.phone || ""
            });

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

    const handleEditToggle = () => {
        if (!isEditing && profile) {
            setFormData({
                name: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || ""
            });
        }
        setSaveError("");
        setSuccessMessage("");
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        setSaveError("");
        setSuccessMessage("");

        try {
            const response = await api.put("/users/profile", formData);
            if (response.data.success) {
                setSuccessMessage("Profile updated successfully!");
                if (response.data.user) {
                    setProfile(prev => ({
                        ...prev,
                        ...response.data.user
                    }));
                } else {
                    setProfile(prev => ({
                        ...prev,
                        ...formData
                    }));
                }
                setIsEditing(false);
            }
        } catch (err) {
            setSaveError(
                err.response?.data?.message || "Failed to update profile"
            );
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="page-loading-wrapper">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">Loading profile...</p>
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

            {successMessage && (
                <div className="status-badge status-badge-success" style={{ marginBottom: '16px' }}>
                    {successMessage}
                </div>
            )}

            <div className="form-card profile-card">

                <div className="profile-avatar">
                    {initial}
                </div>

                {!isEditing ? (
                    <>
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
                                <span className="profile-label">Phone</span>
                                <span className="profile-value">{profile?.phone || "Not provided"}</span>
                            </div>

                            <div className="profile-row">
                                <span className="profile-label">Role</span>
                                <span className="profile-value profile-role">
                                    {profile?.role}
                                </span>
                            </div>

                        </div>

                        <div className="profile-actions-row">
                            <button
                                className="button button-primary"
                                onClick={handleEditToggle}
                            >
                                Edit Profile
                            </button>

                            <Link
                                className="button button-secondary"
                                to="/change-password"
                            >
                                Change Password
                            </Link>
                        </div>
                    </>
                ) : (
                    <form className="profile-edit-form" onSubmit={handleSaveProfile}>

                        {saveError && (
                            <p className="status-badge status-badge-error" style={{ width: '100%' }}>
                                {saveError}
                            </p>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="profile-actions-row">
                            <button
                                type="submit"
                                className="button button-primary"
                                disabled={saveLoading}
                            >
                                {saveLoading ? "Saving..." : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="button button-secondary"
                                onClick={handleEditToggle}
                                disabled={saveLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

            </div>

        </div>
    );
};

export default Profile;