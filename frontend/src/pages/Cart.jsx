import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Cart = () => {

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchCart = async () => {


        try {

            const response = await api.get("/cart");

            setCart(response.data.cart);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load cart"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId, quantity) => {
            console.log("PRODUCT ID RECEIVED:", productId);
    console.log("QUANTITY RECEIVED:", quantity);

        try {

            const response = await api.put(
                `/cart/${productId}`,
                { quantity }
            );

            setCart(response.data.cart);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update cart"
            );

        }

    };

    const removeItem = async (productId) => {

        try {

            const response = await api.delete(
                `/cart/${productId}`
            );

            setCart(response.data.cart);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to remove product"
            );

        }

    };

    if (loading) {
        return <p>Loading cart...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!cart || cart.items.length === 0) {

        return (
            <div>

                <h1>Your Cart</h1>

                <p>Your cart is empty.</p>

                <Link to="/products">
                    Continue Shopping
                </Link>

            </div>
        );

    }

    const totalPrice = cart.items.reduce(
        (total, item) => {
            return total + (
                item.product.price * item.quantity
            );
        },
        0
    );

    return (
        <div>

            <h1>Your Cart</h1>

            {cart.items.map((item) => (

                <div key={item._id}>

                    {item.product.images?.length > 0 && (
                        <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width="150"
                        />
                    )}

                    <h2>
                        {item.product.name}
                    </h2>

                    <p>
                        Price: ₹{item.product.price}
                    </p>

                    <p>
                        Quantity: {item.quantity}
                    </p>

                    <button
                        disabled={item.quantity <= 1}
                        onClick={() =>
                            updateQuantity(
                                item.product._id,
                                item.quantity - 1
                            )
                        }
                    >
                        -
                    </button>

                    <span>
                        {" "}{item.quantity}{" "}
                    </span>

                    <button
                        disabled={
                            item.quantity >= item.product.stock
                        }
                        onClick={() =>
                            updateQuantity(
                                item.product._id,
                                item.quantity + 1
                            )
                        }
                    >
                        +
                    </button>

                    <p>
                        Subtotal: ₹
                        {item.product.price * item.quantity}
                    </p>

                    <button
                        onClick={() =>
                            removeItem(item.product._id)
                        }
                    >
                        Remove
                    </button>


                    <hr />

                </div>

            ))}

            <h2>
                Total: ₹{totalPrice}
            </h2>

            <button onClick={() => navigate("/checkout")}>
                Proceed to Checkout
            </button>

        </div>
    );
};

export default Cart;