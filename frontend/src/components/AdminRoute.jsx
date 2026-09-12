import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "./LoadingAnimation";

const AdminRoute = () => {

    const { user, loading } = useAuth();

    console.log("ADMIN ROUTE:", {
        user,
        role: user?.role,
        loading
    });

    if (loading) {
        return (
            <div className="page-loading-wrapper">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">Checking admin privileges...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;