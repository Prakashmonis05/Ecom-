import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {

    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return null;
    }

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    WordWander
                </Link>

                <div className="navbar-links">

                    <Link to="/products">
                        Products
                    </Link>

                    {!user ? (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>

                            <Link to="/wishlist">
                                Wishlist
                            </Link>

                            <Link to="/cart">
                                Cart
                            </Link>

                            <Link to="/orders">
                                Orders
                            </Link>

                            <Link to="/profile">
                                Profile
                            </Link>

                            {user.role === "admin" && (
                                <Link to="/admin/dashboard">
                                    Admin
                                </Link>
                            )}

                            <button
                                className="navbar-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>
                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;