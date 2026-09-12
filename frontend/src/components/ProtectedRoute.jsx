import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "./LoadingAnimation";

const ProtectedRoute = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="page-loading-wrapper">
                <LoadingSpinner size="lg" />
                <p className="page-loading-text">Verifying authorization...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;