import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import VeyroLogo from "./VeyroLogo";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* ================= LOGO ================= */}
                <Link
                    to={user?.role === "admin" ? "/admin/dashboard" : "/"}
                    className="navbar-brand-wrap"
                    onClick={closeMenu}
                    aria-label="Veyro Home"
                >
                    <VeyroLogo size={38} className="navbar-logo-symbol" />
                    <div className="navbar-brand-text">
                        <span className="navbar-brand-name">VEYRO</span>
                        <span className="navbar-brand-tagline">LUXURY STORE</span>
                    </div>
                </Link>

                {/* ================= HAMBURGER ================= */}
                <button
                    type="button"
                    className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="navbar-toggle-bar"></span>
                </button>

                {/* ================= NAVIGATION ACTIONS ================= */}
                <div className={`navbar-actions ${menuOpen ? "is-open" : ""}`}>

                    {/* ================= GUEST ================= */}
                    {!user && (
                        <>
                            <Link
                                to="/products"
                                className={`navbar-link ${isActive("/products") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                                    <line x1="3" y1="6" x2="21" y2="6"/>
                                    <path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                                <span>Shop</span>
                            </Link>

                            <Link
                                to="/login"
                                className="navbar-login"
                                onClick={closeMenu}
                            >
                                <span>Sign In</span>
                            </Link>

                            <Link
                                to="/register"
                                className="navbar-register"
                                onClick={closeMenu}
                            >
                                <span>Create Account</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>
                        </>
                    )}

                    {/* ================= NORMAL USER ================= */}
                    {user && user.role !== "admin" && (
                        <>
                            <Link
                                to="/products"
                                className={`navbar-link ${isActive("/products") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                                    <line x1="3" y1="6" x2="21" y2="6"/>
                                    <path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                                <span>Shop</span>
                            </Link>

                            <Link
                                to="/wishlist"
                                className={`navbar-link ${isActive("/wishlist") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span>Wishlist</span>
                            </Link>

                            <Link
                                to="/cart"
                                className={`navbar-link ${isActive("/cart") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <span>Cart</span>
                            </Link>

                            <Link
                                to="/orders"
                                className={`navbar-link ${isActive("/orders") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                                <span>Orders</span>
                            </Link>

                            <Link
                                to="/profile"
                                className={`navbar-link navbar-profile-link ${isActive("/profile") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <span className="nav-user-avatar">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </span>
                                <span>{user.name ? user.name.split(" ")[0] : "Profile"}</span>
                            </Link>

                            <button
                                className="navbar-logout"
                                onClick={handleLogout}
                                title="Sign out"
                            >
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                <span>Logout</span>
                            </button>
                        </>
                    )}

                    {/* ================= ADMIN ================= */}
                    {user && user.role === "admin" && (
                        <>
                            <span className="navbar-admin-badge">ADMIN</span>

                            <Link
                                to="/admin/dashboard"
                                className={`navbar-link ${isActive("/admin/dashboard") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <svg className="nav-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                <span>Dashboard</span>
                            </Link>

                            <Link
                                to="/admin/products"
                                className={`navbar-link ${isActive("/admin/products") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <span>Products</span>
                            </Link>

                            <Link
                                to="/admin/orders"
                                className={`navbar-link ${isActive("/admin/orders") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <span>Orders</span>
                            </Link>

                            <Link
                                to="/admin/users"
                                className={`navbar-link ${isActive("/admin/users") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <span>Users</span>
                            </Link>

                            <Link
                                to="/admin/categories"
                                className={`navbar-link ${isActive("/admin/categories") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <span>Categories</span>
                            </Link>

                            <Link
                                to="/admin/products/low-stock"
                                className={`navbar-link ${isActive("/admin/products/low-stock") ? "is-active" : ""}`}
                                onClick={closeMenu}
                            >
                                <span className="low-stock-dot"></span>
                                <span>Low Stock</span>
                            </Link>

                            <button
                                className="navbar-logout"
                                onClick={handleLogout}
                            >
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                <span>Logout</span>
                            </button>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
};

export default Navbar;