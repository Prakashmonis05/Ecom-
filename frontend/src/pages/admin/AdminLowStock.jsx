import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminLowStock = () => {

    const [products, setProducts] = useState([]);
    const [threshold, setThreshold] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLowStockProducts = async () => {

        setLoading(true);
        setError("");

        try {

            const response = await api.get(
                `/admin/products/low-stock?threshold=${threshold}`
            );

            setProducts(response.data.products);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load low-stock products"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchLowStockProducts();
    }, [threshold]);

    return (
        <div>

            <h1>Low Stock Products</h1>

            <p>
                Products with stock less than or equal to the selected
                threshold.
            </p>

            <label>
                Stock Threshold:
            </label>

            <input
                type="number"
                min="0"
                value={threshold}
                onChange={(e) =>
                    setThreshold(Number(e.target.value))
                }
            />

            <br />
            <br />

            {loading && (
                <p>Loading low-stock products...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && !error && products.length === 0 && (
                <p>
                    No low-stock products found.
                </p>
            )}

            {!loading && !error && products.length > 0 && (

                <div>

                    <h2>
                        {products.length} Low Stock Product(s)
                    </h2>

                    {products.map((product) => (

                        <div key={product._id}>

                            {product.images?.length > 0 && (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    width="120"
                                />
                            )}

                            <h2>
                                {product.name}
                            </h2>

                            <p>
                                Brand: {product.brand}
                            </p>

                            <p>
                                Price: ₹{product.price}
                            </p>

                            <p>
                                Stock: {product.stock}
                            </p>

                            {product.stock === 0 && (
                                <strong>
                                    OUT OF STOCK
                                </strong>
                            )}

                            {product.stock > 0 && (
                                <strong>
                                    LOW STOCK
                                </strong>
                            )}

                            <br />
                            <br />

                            <Link
                                to={`/admin/products/${product._id}/edit`}
                            >
                                Update Stock
                            </Link>

                            <hr />

                        </div>

                    ))}

                </div>

            )}

            <br />

            <Link to="/admin/products">
                Manage Products
            </Link>

            <br />

            <Link to="/admin/dashboard">
                Back to Dashboard
            </Link>

        </div>
    );
};

export default AdminLowStock;