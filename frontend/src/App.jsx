import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Public routes */}

        <Route
          path="/"
          element={<h1>WordWander Home</h1>}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Logged-in users */}

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
    path="/profile"
    element={<Profile />}
/>
          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
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
    path="/change-password"
    element={<ChangePassword />}
/>

        </Route>

      
        {/* Admin only */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin/dashboard"
            element={<h1>Admin Dashboard</h1>}
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
    path="/admin/dashboard"
    element={<AdminDashboard />}
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


<Link to="/admin/products">
    Manage Products
</Link>


        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;