import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const handleLogout = () => {
        closeMenu();
        logout();
        navigate("/login");
    };

    if (loading) return null;

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    VEYRO
                </Link>

                {/* Hamburger toggle - mobile only */}
                <button
                    type="button"
                    className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="navbar-toggle-bar"></span>
                </button>

                {/* Right Side Navigation */}
                <div className={`navbar-actions ${menuOpen ? "is-open" : ""}`}>

                    {/* Shop - available for everyone */}
                    <Link to="/products" className="navbar-link" onClick={closeMenu}>
                        Shop
                    </Link>

                    {!user ? (
                        <>
                            {/* Guest */}
                            <Link to="/login" className="navbar-login" onClick={closeMenu}>
                                Login
                            </Link>

                            <Link to="/register" className="navbar-register" onClick={closeMenu}>
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Logged-in user */}
                            <Link to="/wishlist" className="navbar-link" onClick={closeMenu}>
                                Wishlist
                            </Link>

                            <Link to="/cart" className="navbar-link" onClick={closeMenu}>
                                Cart
                            </Link>

                            <Link to="/orders" className="navbar-link" onClick={closeMenu}>
                                Orders
                            </Link>

                            <Link to="/profile" className="navbar-link" onClick={closeMenu}>
                                Profile
                            </Link>

                            {/* Admin */}
                            {user.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="navbar-admin"
                                    onClick={closeMenu}
                                >
                                    Admin
                                </Link>
                            )}

                            {/* Logout */}
                            <button
                                className="navbar-logout"
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