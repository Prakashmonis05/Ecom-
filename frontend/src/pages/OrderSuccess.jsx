import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {

    const location = useLocation();

    const order = location.state?.order;

    if (!order) {
        return (
            <div>

                <h1>Order Not Found</h1>

                <Link to="/orders">
                    View My Orders
                </Link>

            </div>
        );
    }

    return (
        <div>

            <h1>Order Placed Successfully!</h1>

            <p>
                Thank you for your purchase.
            </p>

            <h2>
                Order ID
            </h2>

            <p>
                {order._id}
            </p>

            <h2>
                Total Amount
            </h2>

            <p>
                ₹{order.totalAmount}
            </p>

            <h2>
                Payment
            </h2>

            <p>
                {order.paymentMethod || "Cash on Delivery"}
            </p>

            <h2>
                Order Status
            </h2>

            <p>
                {order.orderStatus}
            </p>

            <br />

            <Link to={`/orders/${order._id}`}>
                View Order
            </Link>

            <br />

            <Link to="/products">
                Continue Shopping
            </Link>

        </div>
    );
};

export default OrderSuccess;