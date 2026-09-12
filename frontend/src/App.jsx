import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import OrderDetails from "./pages/OrderDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLowStock from "./pages/admin/AdminLowStock";
import AdminCategories from "./pages/admin/AdminCategories";
const HomeRedirect = () => {

    const { user, loading } = useAuth();

    console.log("HOME REDIRECT:", {
        user,
        role: user?.role,
        loading
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Home />;
    }

    if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/products" replace />;
};

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/"
                    element={<HomeRedirect />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />


                {/* PROTECTED */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/wishlist"
                        element={<Wishlist />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />

                    <Route
                        path="/order-success"
                        element={<OrderSuccess />}
                    />

                    <Route
                        path="/orders"
                        element={<MyOrders />}
                    />

                    <Route
                        path="/orders/:id"
                        element={<OrderDetails />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />


                </Route>


                {/* ================= ADMIN ================= */}

                <Route element={<AdminRoute />}>

                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/products/low-stock"
                        element={<AdminLowStock />}
                    />

                    <Route
                        path="/admin/products"
                        element={<AdminProducts />}
                    />

                    <Route
                        path="/admin/products/create"
                        element={<AdminProductForm />}
                    />

                    <Route
                        path="/admin/products/:id/edit"
                        element={<AdminProductForm />}
                    />

                    <Route
                        path="/admin/orders"
                        element={<AdminOrders />}
                    />

                    <Route
                        path="/admin/orders/:id"
                        element={<AdminOrderDetails />}
                    />

                    <Route
                        path="/admin/users"
                        element={<AdminUsers />}
                    />

                    <Route
                        path="/admin/categories"
                        element={<AdminCategories />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;