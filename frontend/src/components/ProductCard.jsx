import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

    return (
        <div>

            {product.images?.length > 0 && (
                <img
                    src={product.images[0]}
                    alt={product.name}
                    width="200"
                />
            )}

            <h2>{product.name}</h2>

            <p>{product.brand}</p>

            <p>₹{product.price}</p>

            <p>
                {product.stock > 0
                    ? `In Stock: ${product.stock}`
                    : "Out of Stock"}
            </p>

            <Link to={`/products/${product._id}`}>
                View Product
            </Link>

        </div>
    );
};

export default ProductCard;