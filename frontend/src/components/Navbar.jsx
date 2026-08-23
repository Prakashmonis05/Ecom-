import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        <nav>

            <Link to="/">
                <strong>WordWander</strong>
            </Link>

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
                    <Link to="/cart">
                        Cart
                    </Link>

                    <Link to="/wishlist">
                        Wishlist
                    </Link>

                    <Link to="/profile">
                        Profile
                    </Link>
                    <Link to="/orders">
    My Orders
</Link>

                    {user.role === "admin" && (
                        <Link to="/admin/dashboard">
                            Admin Dashboard
                        </Link>
                    )}

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </>
            )}

        </nav>
    );
};

export default Navbar;