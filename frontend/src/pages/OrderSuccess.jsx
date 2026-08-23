import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {

    const location = useLocation();

    const order = location.state?.order;

    return (
        <div>

            <h1>Order Placed Successfully!</h1>

            {order && (
                <>
                    <p>
                        Order ID: {order._id}
                    </p>

                    <p>
                        Total: ₹{order.totalAmount}
                    </p>

                    <p>
                        Payment: {order.paymentMethod}
                    </p>

                    <p>
                        Status: {order.orderStatus}
                    </p>
                </>
            )}

            <Link to="/products">
                Continue Shopping
            </Link>

        </div>
    );
};

export default OrderSuccess;