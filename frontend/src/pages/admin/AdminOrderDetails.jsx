import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const AdminOrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    const fetchOrder = async () => {

        try {

            const response = await api.get(
                `/admin/orders/${id}`
            );

            setOrder(response.data.order);
            setStatus(response.data.order.orderStatus);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load order"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const updateStatus = async () => {

        setUpdating(true);
        setError("");

        try {

            const response = await api.put(
                `/admin/orders/${id}/status`,
                {
                    status
                }
            );

            setOrder(response.data.order);

            alert("Order status updated successfully");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdating(false);

        }

    };

    if (loading) {
        return <p>Loading order...</p>;
    }

    if (error && !order) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Order not found</p>;
    }

    return (
        <div>

            <h1>Order Details</h1>

            <p>
                Order ID: {order._id}
            </p>

            <p>
                Date:{" "}
                {new Date(
                    order.createdAt
                ).toLocaleDateString()}
            </p>

            <h2>Customer</h2>

            <p>
                Name: {order.user?.name}
            </p>

            <p>
                Email: {order.user?.email}
            </p>

            <h2>Shipping Address</h2>

            <p>{order.shippingAddress?.name}</p>
            <p>{order.shippingAddress?.phone}</p>
            <p>{order.shippingAddress?.address}</p>
            <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
            </p>
            <p>{order.shippingAddress?.pincode}</p>

            <h2>Items</h2>

            {order.items.map((item) => (

                <div key={item._id}>

                    <p>
                        {item.product?.name}
                    </p>

                    <p>
                        ₹{item.price} × {item.quantity}
                    </p>

                    <p>
                        Subtotal: ₹
                        {item.price * item.quantity}
                    </p>

                    <hr />

                </div>

            ))}

            <h2>
                Total: ₹{order.totalAmount}
            </h2>

            <h2>Order Status</h2>

            <select
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
            >
                <option value="processing">
                    Processing
                </option>

                <option value="shipped">
                    Shipped
                </option>

                <option value="delivered">
                    Delivered
                </option>

                <option value="cancelled">
                    Cancelled
                </option>

            </select>

            <button
                onClick={updateStatus}
                disabled={updating || status === order.orderStatus}
            >
                {updating
                    ? "Updating..."
                    : "Update Status"}
            </button>

            {error && (
                <p>{error}</p>
            )}

            <br />

            <Link to="/admin/orders">
                Back to Orders
            </Link>

        </div>
    );
};

export default AdminOrderDetails;