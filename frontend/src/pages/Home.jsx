import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await api.get(
                    "/products?limit=4"
                );

                setProducts(response.data.products);

            } catch (error) {

                console.error(
                    "Failed to load featured products",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    return (
        <main>

            {/* HERO */}

            <section className="hero-section">

                <div className="container hero-content">

                    <div className="hero-text">

                        <span className="hero-label">
                            DISCOVER YOUR NEXT FAVORITE
                        </span>

                        <h1>
                            Every book is a
                            <span> new journey.</span>
                        </h1>

                        <p>
                            Explore stories, discover new ideas,
                            and find books that stay with you.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/products"
                                className="btn btn-primary"
                            >
                                Explore Books
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-secondary"
                            >
                                Join WordWander
                            </Link>

                        </div>

                    </div>

                    <div className="hero-visual">

                        <div className="book-card book-one">
                            📕
                        </div>

                        <div className="book-card book-two">
                            📗
                        </div>

                        <div className="book-card book-three">
                            📘
                        </div>

                    </div>

                </div>

            </section>


            {/* CATEGORIES */}

            <section className="categories-section">

                <div className="container">

                    <div className="section-header">

                        <div>
                            <span className="section-label">
                                EXPLORE
                            </span>

                            <h2>
                                Browse Categories
                            </h2>
                        </div>

                        <Link to="/products">
                            View All →
                        </Link>

                    </div>


                    <div className="category-grid">

                        <Link
                            to="/products?category=fiction"
                            className="category-card"
                        >
                            <span>📖</span>
                            <h3>Fiction</h3>
                            <p>Stories that take you somewhere new.</p>
                        </Link>


                        <Link
                            to="/products?category=technology"
                            className="category-card"
                        >
                            <span>💻</span>
                            <h3>Technology</h3>
                            <p>Learn about the world of technology.</p>
                        </Link>


                        <Link
                            to="/products?category=business"
                            className="category-card"
                        >
                            <span>📈</span>
                            <h3>Business</h3>
                            <p>Ideas for building and growing.</p>
                        </Link>


                        <Link
                            to="/products?category=self-help"
                            className="category-card"
                        >
                            <span>🧠</span>
                            <h3>Self Help</h3>
                            <p>Books for personal growth.</p>
                        </Link>

                    </div>

                </div>

            </section>


            {/* FEATURED PRODUCTS */}

            <section className="featured-section">

                <div className="container">

                    <div className="section-header">

                        <div>

                            <span className="section-label">
                                HANDPICKED
                            </span>

                            <h2>
                                Featured Books
                            </h2>

                        </div>

                        <Link to="/products">
                            View All →
                        </Link>

                    </div>


                    {loading ? (

                        <p>Loading books...</p>

                    ) : products.length === 0 ? (

                        <p>No books available.</p>

                    ) : (

                        <div className="product-grid">

                            {products.map((product) => (

                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </section>


            {/* WHY WORDWANDER */}

            <section className="why-section">

                <div className="container">

                    <div className="section-header centered">

                        <div>

                            <span className="section-label">
                                WHY WORDWANDER
                            </span>

                            <h2>
                                More than just a bookstore
                            </h2>

                        </div>

                    </div>


                    <div className="features-grid">

                        <div className="feature">

                            <div className="feature-icon">
                                📚
                            </div>

                            <h3>
                                Curated Collection
                            </h3>

                            <p>
                                Discover books selected to give
                                you quality choices.
                            </p>

                        </div>


                        <div className="feature">

                            <div className="feature-icon">
                                🚚
                            </div>

                            <h3>
                                Fast Delivery
                            </h3>

                            <p>
                                Get your favorite books delivered
                                right to your doorstep.
                            </p>

                        </div>


                        <div className="feature">

                            <div className="feature-icon">
                                🔒
                            </div>

                            <h3>
                                Secure Checkout
                            </h3>

                            <p>
                                Your orders and payment information
                                stay protected.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="cta-section">

                <div className="container">

                    <h2>
                        Ready to find your next story?
                    </h2>

                    <p>
                        Start exploring the WordWander collection.
                    </p>

                    <Link
                        to="/products"
                        className="btn btn-primary"
                    >
                        Start Wandering →
                    </Link>

                </div>

            </section>

        </main>
    );
};

export default Home;