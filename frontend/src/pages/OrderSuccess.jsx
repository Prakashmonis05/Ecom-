import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {

    const location = useLocation();

    const order = location.state?.order;

    if (!order) {
        return (
            <main className="order-success-page">

                <div className="order-not-found">

                    <div className="order-not-found-icon">
                        !
                    </div>

                    <h1>
                        Order Not Found
                    </h1>

                    <p>
                        We couldn't find the order details.
                    </p>

                    <Link
                        to="/orders"
                        className="order-primary-btn"
                    >
                        View My Orders
                    </Link>

                </div>

            </main>
        );
    }

    return (
        <main className="order-success-page">

            <div className="order-success-container">

                {/* Success Icon */}

                <div className="success-icon">

                    <span>✓</span>

                </div>


                {/* Heading */}

                <div className="success-heading">

                    <span className="success-label">
                        ORDER CONFIRMED
                    </span>

                    <h1>
                        Order placed successfully!
                    </h1>

                    <p>
                        Thank you for shopping with Veyro.
                        Your order has been received and is being processed.
                    </p>

                </div>


                {/* Order Card */}

                <div className="order-summary-card">

                    <div className="order-summary-header">

                        <div>

                            <span className="summary-label">
                                ORDER ID
                            </span>

                            <strong>
                                #{order._id}
                            </strong>

                        </div>

                        <span className="order-status">
                            {order.orderStatus}
                        </span>

                    </div>


                    <div className="summary-divider"></div>


                    <div className="order-summary-grid">

                        <div className="summary-item">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{order.totalAmount}
                            </strong>

                        </div>


                        <div className="summary-item">

                            <span>
                                Payment Method
                            </span>

                            <strong>
                                {order.paymentMethod ||
                                    "Cash on Delivery"}
                            </strong>

                        </div>


                        <div className="summary-item">

                            <span>
                                Order Status
                            </span>

                            <strong className="status-text">
                                {order.orderStatus}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* What's Next */}

                <div className="next-section">

                    <h2>
                        What happens next?
                    </h2>

                    <div className="next-steps">

                        <div className="next-step">

                            <div className="step-number">
                                01
                            </div>

                            <div>
                                <h3>
                                    Order confirmed
                                </h3>

                                <p>
                                    We've received your order and will start processing it.
                                </p>
                            </div>

                        </div>


                        <div className="next-step">

                            <div className="step-number">
                                02
                            </div>

                            <div>
                                <h3>
                                    Preparing your order
                                </h3>

                                <p>
                                    Your items will be packed and prepared for delivery.
                                </p>
                            </div>

                        </div>


                        <div className="next-step">

                            <div className="step-number">
                                03
                            </div>

                            <div>
                                <h3>
                                    Delivered to you
                                </h3>

                                <p>
                                    Your order will arrive at your delivery address.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Actions */}

                <div className="order-success-actions">

                    <Link
                        to={`/orders/${order._id}`}
                        className="order-primary-btn"
                    >
                        View Order
                    </Link>

                    <Link
                        to="/products"
                        className="order-secondary-btn"
                    >
                        Continue Shopping
                    </Link>

                </div>


                <p className="order-footer-note">
                    Need help with your order?
                    <Link to="/contact">
                        Contact Veyro Support
                    </Link>
                </p>

            </div>

        </main>
    );
};

export default OrderSuccess;