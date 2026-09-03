import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Basic password validation
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post(
                "/register",
                formData
            );

            if (!response.data.success) {
                setError(response.data.message);
                return;
            }

            setSuccess("Account created successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* Veyro Branding */}
            {/* <div className="auth-brand">
                VEYRO
            </div> */}


            <div className="auth-form-wrapper">

                {/* Header */}
                <div className="auth-form-header">

                    <span className="auth-form-eyebrow">
                        GET STARTED
                    </span>

                    <h1>Create your account</h1>

                    <p>
                        Join Veyro and start shopping today.
                    </p>

                </div>


                {/* Error */}
                {error && (
                    <div className="auth-error">

                        <span>!</span>

                        <p>{error}</p>

                    </div>
                )}


                {/* Success */}
                {success && (
                    <div className="auth-success">

                        <span>✓</span>

                        <p>{success}</p>

                    </div>
                )}


                {/* Form */}
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* Name */}
                    <div className="auth-field">

                        <label htmlFor="name">
                            Full name
                        </label>

                        <div className="auth-input-wrapper">

                            <span className="auth-input-icon">
                                ◯
                            </span>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                            />

                        </div>

                    </div>


                    {/* Email */}
                    <div className="auth-field">

                        <label htmlFor="email">
                            Email address
                        </label>

                        <div className="auth-input-wrapper">

                            <span className="auth-input-icon">
                                @
                            </span>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />

                        </div>

                    </div>


                    {/* Password */}
                    <div className="auth-field">

                        <div className="auth-label-row">

                            <label htmlFor="password">
                                Password
                            </label>

                            <span className="password-hint">
                                Min. 6 characters
                            </span>

                        </div>

                        <div className="auth-input-wrapper">

                            <span className="auth-input-icon">
                                •
                            </span>

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>


                    {/* Register Button */}
                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="auth-spinner"></span>
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create account
                                <span>→</span>
                            </>
                        )}
                    </button>

                </form>


                {/* Login */}
                <div className="auth-register">

                    <span>
                        Already have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </button>

                </div>


                {/* Back to Store */}
                <button
                    className="back-to-store"
                    onClick={() => navigate("/")}
                >
                    ← Back to Veyro
                </button>

            </div>

        </div>
    );
};

export default Register;