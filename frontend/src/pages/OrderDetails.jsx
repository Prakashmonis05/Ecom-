import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelling, setCancelling] = useState(false);


    const fetchOrder = async () => {

        try {

            const response = await api.get(
                `/orders/${id}`
            );

            setOrder(response.data.order);

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


    const handleCancelOrder = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        setCancelling(true);

        try {

            const response = await api.put(
                `/orders/${order._id}/cancel`
            );

            setOrder(response.data.order);

            alert(response.data.message);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to cancel order"
            );

        } finally {

            setCancelling(false);

        }

    };


    if (loading) {
        return <p>Loading order...</p>;
    }


    if (error) {
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


            <h2>Shipping Address</h2>

            <p>{order.shippingAddress?.name}</p>
            <p>{order.shippingAddress?.phone}</p>
            <p>{order.shippingAddress?.address}</p>

            <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
            </p>

            <p>
                {order.shippingAddress?.pincode}
            </p>


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


            <h2>Payment</h2>

            <p>
                {order.paymentMethod || "Cash on Delivery"}
            </p>


            <h2>Order Status</h2>

            <p>
                {order.orderStatus}
            </p>


            {order.orderStatus !== "cancelled" &&
                order.orderStatus !== "delivered" && (

                    <button
                        onClick={handleCancelOrder}
                        disabled={cancelling}
                    >
                        {cancelling
                            ? "Cancelling..."
                            : "Cancel Order"}
                    </button>

                )}


            <br />
            <br />

            <Link to="/orders">
                Back to My Orders
            </Link>

        </div>
    );
};


export default OrderDetails;