import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ChangePassword.css";

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

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            setError("New password must be at least 6 characters");
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
        <main className="change-password-page">

            <div className="change-password-container">

                <button
                    className="change-password-back"
                    onClick={() => navigate("/profile")}
                >
                    ← Back to Profile
                </button>


                <div className="change-password-card">

                    <div className="security-icon">
                        🔒
                    </div>


                    <div className="change-password-header">

                        <span>
                            ACCOUNT SECURITY
                        </span>

                        <h1>
                            Change Password
                        </h1>

                        <p>
                            Keep your Veyro account secure by using a
                            strong password.
                        </p>

                    </div>


                    {error && (

                        <div className="password-message error">

                            <span>!</span>

                            <p>
                                {error}
                            </p>

                        </div>

                    )}


                    {success && (

                        <div className="password-message success">

                            <span>✓</span>

                            <p>
                                {success}
                            </p>

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="password-form"
                    >

                        <div className="password-field">

                            <label>
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Enter current password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="password-field">

                            <label>
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />

                            <small>
                                Use at least 6 characters.
                            </small>

                        </div>


                        <div className="password-field">

                            <label>
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <button
                            className="change-password-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Changing Password..."
                                : "Change Password"}
                        </button>

                    </form>


                    <div className="security-note">

                        <span>
                            🔐
                        </span>

                        <p>
                            Never share your password with anyone.
                            Veyro will never ask for your password.
                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default ChangePassword;