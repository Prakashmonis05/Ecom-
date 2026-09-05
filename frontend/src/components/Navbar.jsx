import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {

    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        closeMenu();
        logout();
        navigate("/login");
    };

    if (loading) {
        return null;
    }

    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}

                <Link
                    to={user?.role === "admin"
                        ? "/admin/dashboard"
                        : "/"
                    }
                    className="navbar-logo"
                    onClick={closeMenu}
                >
                    VEYRO
                </Link>


                {/* Hamburger */}

                <button
                    type="button"
                    className={`navbar-toggle ${menuOpen ? "is-open" : ""
                        }`}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() =>
                        setMenuOpen((open) => !open)
                    }
                >
                    <span className="navbar-toggle-bar"></span>
                </button>


                {/* Navigation */}

                <div
                    className={`navbar-actions ${menuOpen ? "is-open" : ""
                        }`}
                >

                    {/* ================= GUEST ================= */}

                    {!user && (
                        <>
                            <Link
                                to="/products"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Shop
                            </Link>

                            <Link
                                to="/login"
                                className="navbar-login"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="navbar-register"
                                onClick={closeMenu}
                            >
                                Register
                            </Link>
                        </>
                    )}


                    {/* ================= NORMAL USER ================= */}

                    {user && user.role !== "admin" && (
                        <>
                            <Link
                                to="/products"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Shop
                            </Link>

                            <Link
                                to="/wishlist"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Wishlist
                            </Link>

                            <Link
                                to="/cart"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Cart
                            </Link>

                            <Link
                                to="/orders"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Orders
                            </Link>

                            <Link
                                to="/profile"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Profile
                            </Link>

                            <button
                                className="navbar-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}


                    {/* ================= ADMIN ================= */}

                    {user && user.role === "admin" && (
                        <>
                            <Link
                                to="/admin/dashboard"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/admin/products"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Products
                            </Link>

                            <Link
                                to="/admin/orders"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Orders
                            </Link>

                            <Link
                                to="/admin/users"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Users
                            </Link>

                            <Link
                                to="/admin/categories"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Categories
                            </Link>

                            <Link
                                to="/admin/products/low-stock"
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                Low Stock
                            </Link>

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