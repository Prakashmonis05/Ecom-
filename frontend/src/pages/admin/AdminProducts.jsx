import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {

        try {

            const response = await api.get("/products");

            setProducts(response.data.products);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (productId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await api.delete(
                `/products/${productId}`
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
                "Failed to delete product"
            );

        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>Manage Products</h1>

            <Link to="/admin/products/create">
                Add New Product
            </Link>

            <hr />

            {products.length === 0 ? (

                <p>No products found.</p>

            ) : (

                products.map((product) => (

                    <div key={product._id}>

                        {product.images?.length > 0 && (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                width="150"
                            />
                        )}

                        <h2>{product.name}</h2>

                        <p>
                            Brand: {product.brand}
                        </p>

                        <p>
                            Category: {product.category}
                        </p>

                        <p>
                            Price: ₹{product.price}
                        </p>

                        <p>
                            Stock: {product.stock}
                        </p>

                        <p>
                            Status:{" "}
                            {product.isActive
                                ? "Active"
                                : "Inactive"}
                        </p>

                        <Link
                            to={`/admin/products/${product._id}/edit`}
                        >
                            Edit
                        </Link>

                        {" "}

                        <button
                            onClick={() =>
                                deleteProduct(product._id)
                            }
                        >
                            Delete
                        </button>

                        <hr />

                    </div>

                ))

            )}

        </div>
    );
};

export default AdminProducts;