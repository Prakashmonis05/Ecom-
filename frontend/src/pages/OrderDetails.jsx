import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import "./OrderDetails.css";

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

        return (
            <main className="order-details-page">

                <div className="order-details-loading">

                    <div className="order-spinner"></div>

                    <p>
                        Loading order...
                    </p>

                </div>

            </main>
        );

    }


    if (error) {

        return (
            <main className="order-details-page">

                <div className="order-details-message">

                    <div className="message-icon">
                        !
                    </div>

                    <h2>
                        Unable to load order
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/orders"
                        className="order-details-primary-btn"
                    >
                        Back to My Orders
                    </Link>

                </div>

            </main>
        );

    }


    if (!order) {

        return (
            <main className="order-details-page">

                <div className="order-details-message">

                    <div className="message-icon">
                        ?
                    </div>

                    <h2>
                        Order not found
                    </h2>

                    <p>
                        This order may no longer be available.
                    </p>

                    <Link
                        to="/orders"
                        className="order-details-primary-btn"
                    >
                        View My Orders
                    </Link>

                </div>

            </main>
        );

    }


    const isCancelled =
        order.orderStatus === "cancelled";

    const isDelivered =
        order.orderStatus === "delivered";


    return (
        <main className="order-details-page">

            <div className="order-details-container">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="order-details-header">

                    <div>

                        <Link
                            to="/orders"
                            className="back-orders"
                        >
                            ← Back to My Orders
                        </Link>

                        <h1>
                            Order Details
                        </h1>

                        <p>
                            Order #{order._id}
                        </p>

                    </div>


                    <div className={`order-status-large ${
                        isCancelled
                            ? "status-cancelled"
                            : isDelivered
                                ? "status-delivered"
                                : "status-active"
                    }`}>

                        {order.orderStatus}

                    </div>

                </div>


                {/* =================================
                    ORDER INFO
                ================================= */}

                <div className="order-info-card">

                    <div className="order-info-item">

                        <span>
                            ORDER DATE
                        </span>

                        <strong>
                            {new Date(
                                order.createdAt
                            ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })}
                        </strong>

                    </div>


                    <div className="order-info-item">

                        <span>
                            PAYMENT
                        </span>

                        <strong>
                            {order.paymentMethod ||
                                "Cash on Delivery"}
                        </strong>

                    </div>


                    <div className="order-info-item">

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            ₹{order.totalAmount}
                        </strong>

                    </div>

                </div>


                {/* =================================
                    ORDER PROGRESS
                ================================= */}

                {!isCancelled && (

                    <section className="order-progress-card">

                        <div className="section-title">

                            <div>

                                <span>
                                    ORDER TRACKING
                                </span>

                                <h2>
                                    {isDelivered
                                        ? "Your order has arrived"
                                        : "Your order is on its way"}
                                </h2>

                            </div>

                        </div>


                        <div className="progress-track">

                            <div className="progress-step completed">

                                <div className="progress-circle">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Confirmed
                                    </strong>

                                    <span>
                                        Order received
                                    </span>
                                </div>

                            </div>


                            <div className={`progress-line ${
                                [
                                    "processing",
                                    "shipped",
                                    "delivered"
                                ].includes(order.orderStatus)
                                    ? "line-active"
                                    : ""
                            }`}></div>


                            <div className={`progress-step ${
                                [
                                    "processing",
                                    "shipped",
                                    "delivered"
                                ].includes(order.orderStatus)
                                    ? "completed"
                                    : ""
                            }`}>

                                <div className="progress-circle">
                                    {
                                        [
                                            "processing",
                                            "shipped",
                                            "delivered"
                                        ].includes(order.orderStatus)
                                            ? "✓"
                                            : "2"
                                    }
                                </div>

                                <div>
                                    <strong>
                                        Processing
                                    </strong>

                                    <span>
                                        Preparing order
                                    </span>
                                </div>

                            </div>


                            <div className={`progress-line ${
                                [
                                    "shipped",
                                    "delivered"
                                ].includes(order.orderStatus)
                                    ? "line-active"
                                    : ""
                            }`}></div>


                            <div className={`progress-step ${
                                [
                                    "shipped",
                                    "delivered"
                                ].includes(order.orderStatus)
                                    ? "completed"
                                    : ""
                            }`}>

                                <div className="progress-circle">
                                    {
                                        [
                                            "shipped",
                                            "delivered"
                                        ].includes(order.orderStatus)
                                            ? "✓"
                                            : "3"
                                    }
                                </div>

                                <div>
                                    <strong>
                                        Shipped
                                    </strong>

                                    <span>
                                        On the way
                                    </span>
                                </div>

                            </div>


                            <div className={`progress-line ${
                                isDelivered
                                    ? "line-active"
                                    : ""
                            }`}></div>


                            <div className={`progress-step ${
                                isDelivered
                                    ? "completed"
                                    : ""
                            }`}>

                                <div className="progress-circle">
                                    {isDelivered ? "✓" : "4"}
                                </div>

                                <div>
                                    <strong>
                                        Delivered
                                    </strong>

                                    <span>
                                        Arrived safely
                                    </span>
                                </div>

                            </div>

                        </div>

                    </section>

                )}


                {/* =================================
                    CANCELLED
                ================================= */}

                {isCancelled && (

                    <div className="cancelled-card">

                        <div className="cancelled-icon">
                            ×
                        </div>

                        <div>

                            <h3>
                                Order cancelled
                            </h3>

                            <p>
                                This order has been cancelled successfully.
                            </p>

                        </div>

                    </div>

                )}


                {/* =================================
                    MAIN CONTENT
                ================================= */}

                <div className="order-content-grid">


                    {/* ITEMS */}

                    <section className="order-items-card">

                        <div className="card-heading">

                            <h2>
                                Items in your order
                            </h2>

                            <span>
                                {order.items.length}{" "}
                                {order.items.length === 1
                                    ? "item"
                                    : "items"}
                            </span>

                        </div>


                        <div className="order-items">

                            {order.items.map((item) => (

                                <div
                                    className="order-item"
                                    key={item._id}
                                >

                                    <div className="order-item-image">

                                        {item.product?.images?.length > 0 ? (

                                            <img
                                                src={
                                                    item.product.images[0]
                                                }
                                                alt={
                                                    item.product.name
                                                }
                                            />

                                        ) : (

                                            <span>
                                                No Image
                                            </span>

                                        )}

                                    </div>


                                    <div className="order-item-info">

                                        <h3>
                                            {item.product?.name ||
                                                "Product"}
                                        </h3>

                                        {item.product?.brand && (
                                            <p>
                                                {item.product.brand}
                                            </p>
                                        )}

                                        <span>
                                            ₹{item.price} ×{" "}
                                            {item.quantity}
                                        </span>

                                    </div>


                                    <strong className="item-subtotal">
                                        ₹
                                        {item.price *
                                            item.quantity}
                                    </strong>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* RIGHT SIDE */}

                    <div className="order-sidebar">


                        {/* SHIPPING */}

                        <section className="shipping-card">

                            <div className="card-heading">

                                <h2>
                                    Shipping Address
                                </h2>

                            </div>


                            <div className="shipping-address">

                                <strong>
                                    {order.shippingAddress?.name}
                                </strong>

                                <p>
                                    {order.shippingAddress?.phone}
                                </p>

                                <p>
                                    {order.shippingAddress?.address}
                                </p>

                                <p>
                                    {order.shippingAddress?.city},{" "}
                                    {order.shippingAddress?.state}
                                </p>

                                <p>
                                    {order.shippingAddress?.pincode}
                                </p>

                            </div>

                        </section>


                        {/* TOTAL */}

                        <section className="price-summary-card">

                            <div className="card-heading">

                                <h2>
                                    Order Summary
                                </h2>

                            </div>


                            <div className="price-row">

                                <span>
                                    Items
                                </span>

                                <span>
                                    ₹{order.totalAmount}
                                </span>

                            </div>


                            <div className="price-row">

                                <span>
                                    Delivery
                                </span>

                                <span className="free">
                                    FREE
                                </span>

                            </div>


                            <div className="price-divider"></div>


                            <div className="price-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{order.totalAmount}
                                </strong>

                            </div>

                        </section>

                    </div>

                </div>


                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="order-actions">

                    {!isCancelled && !isDelivered && (

                        <button
                            className="cancel-order-btn"
                            onClick={handleCancelOrder}
                            disabled={cancelling}
                        >
                            {cancelling
                                ? "Cancelling..."
                                : "Cancel Order"}
                        </button>

                    )}

                    <Link
                        to="/products"
                        className="continue-shopping-btn"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </main>
    );
};

export default OrderDetails;