import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {

        try {

            const response = await api.get("/orders/my");

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

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (orders.length === 0) {

        return (
            <div>

                <h1>My Orders</h1>

                <p>You haven't placed any orders yet.</p>

                <Link to="/products">
                    Start Shopping
                </Link>

            </div>
        );
    }

    return (
        <div>

            <h1>My Orders</h1>

            {orders.map((order) => (

                <div key={order._id}>

                    <h2>
                        Order #{order._id}
                    </h2>

                    <p>
                        Date:{" "}
                        {new Date(
                            order.createdAt
                        ).toLocaleDateString()}
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
                        Order Status: {order.orderStatus}
                    </p>

                    <h3>Items</h3>

                    {order.items.map((item) => (

                        <div key={item._id}>

                            <p>
                                {item.product?.name}
                            </p>

                            <p>
                                ₹{item.price} × {item.quantity}
                            </p>

                        </div>

                    ))}

                    <hr />

                </div>

            ))}

        </div>
    );
};

export default MyOrders;