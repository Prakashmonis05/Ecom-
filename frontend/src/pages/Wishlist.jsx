import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Wishlist = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchWishlist = async () => {

        try {

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
                <p>Your wishlist is empty.</p>
            ) : (

                <div>

                    {products.map((product) => (

                        <div key={product._id}>

                            {product.images?.length > 0 && (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    width="200"
                                />
                            )}

                            <h2>{product.name}</h2>

                            <p>
                                ₹{product.price}
                            </p>

                            <p>
                                {product.stock > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </p>

                            <Link
                                to={`/products/${product._id}`}
                            >
                                View Product
                            </Link>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Wishlist;