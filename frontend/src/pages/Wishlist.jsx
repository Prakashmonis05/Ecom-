import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Wishlist = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchWishlist = async () => {

        try {

            setLoading(true);

            const response = await api.get("/wishlist");

            setProducts(response.data.products);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load wishlist"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {

        try {

            const response = await api.post(
                `/wishlist/${productId}`
            );

            alert(response.data.message);

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product._id !== productId
                )
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to remove from wishlist"
            );

        }
    };

    const addToCart = async (productId, stock) => {

        if (stock <= 0) {
            alert("Product is out of stock");
            return;
        }

        try {

            const response = await api.post(
                "/cart",
                {
                    productId,
                    quantity: 1
                }
            );

            alert(response.data.message);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        }
    };

    if (loading) {
        return <p>Loading wishlist...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>My Wishlist</h1>

            {products.length === 0 ? (

                <div>

                    <p>
                        Your wishlist is empty.
                    </p>

                    <Link to="/products">
                        Browse Products
                    </Link>

                </div>

            ) : (

                <div>

                    {products.map((product) => (

                        <div key={product._id}>

                            {product.images?.length > 0 ? (

                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    width="200"
                                />

                            ) : (

                                <p>No Image</p>

                            )}

                            <h2>
                                {product.name}
                            </h2>

                            <p>
                                Brand: {product.brand}
                            </p>

                            <p>
                                Category:{" "}
                                {product.category?.name}
                            </p>

                            <h3>
                                ₹{product.price}
                            </h3>

                            <p>
                                {product.stock > 0
                                    ? `In Stock: ${product.stock}`
                                    : "Out of Stock"}
                            </p>

                            <Link
                                to={`/products/${product._id}`}
                            >
                                View Product
                            </Link>

                            <br />
                            <br />

                            <button
                                onClick={() =>
                                    addToCart(
                                        product._id,
                                        product.stock
                                    )
                                }
                                disabled={product.stock <= 0}
                            >
                                {product.stock <= 0
                                    ? "Out of Stock"
                                    : "Add to Cart"}
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                    removeFromWishlist(
                                        product._id
                                    )
                                }
                            >
                                Remove
                            </button>

                            <hr />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Wishlist;