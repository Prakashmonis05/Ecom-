import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {

        try {

            const response = await api.get("/admin/orders");

            setOrders(response.data.orders);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, status) => {

        try {

            const response = await api.put(
                `/admin/orders/${orderId}/status`,
                { status }
            );

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order._id === orderId
                        ? response.data.order
                        : order
                )
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update order status"
            );
        }
    };

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>Manage Orders</h1>

            {orders.length === 0 ? (

                <p>No orders found.</p>

            ) : (

                orders.map((order) => (

                    <div key={order._id}>

                        <h2>
                            Order #{order._id}
                        </h2>

                        <p>
                            Customer: {order.user?.name}
                        </p>

                        <p>
                            Email: {order.user?.email}
                        </p>

                        <p>
                            Total: ₹{order.totalAmount}
                        </p>

                        <p>
                            Payment: {order.paymentMethod}
                        </p>

                        <p>
                            Payment Status: {order.paymentStatus}
                        </p>

                        <p>
                            Current Status: {order.orderStatus}
                        </p>

                        <select
                            value={order.orderStatus}
                            onChange={(e) =>
                                updateStatus(
                                    order._id,
                                    e.target.value
                                )
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

                        {" "}

                        <Link
                            to={`/admin/orders/${order._id}`}
                        >
                            View Order
                        </Link>

                        <hr />

                    </div>

                ))

            )}

        </div>
    );
};

export default AdminOrders;