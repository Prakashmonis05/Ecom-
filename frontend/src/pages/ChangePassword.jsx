import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ChangePassword = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {
            setError("All fields are required");
            return;
        }

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            setError("New passwords do not match");
            return;
        }

        setLoading(true);

        try {

            const response = await api.put(
                "/users/change-password",
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }
            );

            setSuccess(response.data.message);

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to change password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="page-shell">

            <div className="page-header">
                <h1>Change Password</h1>
            </div>

            {error && (
                <p className="status-badge status-badge-error">
                    {error}
                </p>
            )}

            {success && (
                <p className="status-badge status-badge-success">
                    {success}
                </p>
            )}

            <form
                className="form-card"
                onSubmit={handleSubmit}
            >

                <div className="form-field">
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className="button button-primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Changing..."
                        : "Change Password"}
                </button>

            </form>
            <button
                className="button button-secondary"
                onClick={() => navigate("/profile")}
            >
                Back to Profile
            </button>

        </div>
    );
};

export default ChangePassword;
