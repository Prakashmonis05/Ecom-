import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
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
        setLoading(true);

        try {
            const response = await api.post("/login", formData);

            if (!response.data.success) {
                setError(response.data.message);
                return;
            }

            const user = await login(response.data.token);

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/products");
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* Branding */}
            {/* <div className="auth-brand">
                VEYRO
            </div> */}

            <div className="auth-form-wrapper">

                <div className="auth-form-header">

                    <span className="auth-form-eyebrow">
                        ACCOUNT
                    </span>

                    <h1>Welcome back</h1>

                    <p>
                        Sign in to continue to your Veyro account.
                    </p>

                </div>


                {error && (
                    <div className="auth-error">
                        <span>!</span>
                        <p>{error}</p>
                    </div>
                )}


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

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

                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() =>
                                    alert(
                                        "Password reset functionality will be added soon."
                                    )
                                }
                            >
                                Forgot password?
                            </button>

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
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                    </div>


                    {/* Login Button */}
                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="auth-spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign in
                                <span>→</span>
                            </>
                        )}
                    </button>

                </form>


                {/* Register */}
                <div className="auth-register">

                    <span>
                        Don't have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        Create an account
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

export default Login;