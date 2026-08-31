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

                setProducts(response.data.products || []);

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
        <main className="home-page">

            {/* ================= HERO ================= */}

            <section className="home-hero">

                <div className="home-container">

                    <div className="hero-content">

                        <div className="hero-copy">

                            <span className="hero-eyebrow">
                                WELCOME TO VEYRO
                            </span>

                            <h1>
                                Everything you want.
                                <span> All in one place.</span>
                            </h1>

                            <p>
                                Discover products you'll love,
                                compare your options, and shop
                                everything you need from Veyro.
                            </p>

                            <div className="hero-actions">

                                <Link
                                    to="/products"
                                    className="home-btn home-btn-dark"
                                >
                                    Shop Now
                                    <span>→</span>
                                </Link>

                                <Link
                                    to="/products"
                                    className="home-btn home-btn-outline"
                                >
                                    Explore Products
                                </Link>

                            </div>

                        </div>


                        {/* Hero Product Showcase */}

                        <div className="hero-showcase">

                            <div className="hero-product hero-product-one">
                                <span>NEW</span>
                                <div className="hero-product-shape shape-one">
                                    VEYRO
                                </div>
                            </div>

                            <div className="hero-product hero-product-two">
                                <div className="hero-product-shape shape-two">
                                    V
                                </div>
                            </div>

                            <div className="hero-product hero-product-three">
                                <div className="hero-product-shape shape-three">
                                    VEYRO
                                </div>
                            </div>

                            <div className="hero-floating-card">
                                <strong>10K+</strong>
                                <span>Products</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= BENEFITS ================= */}

            <section className="benefits-section">

                <div className="home-container">

                    <div className="benefits-grid">

                        <div className="benefit-item">

                            <div className="benefit-icon">
                                ✓
                            </div>

                            <div>
                                <h3>Quality Products</h3>
                                <p>Products worth buying</p>
                            </div>

                        </div>


                        <div className="benefit-item">

                            <div className="benefit-icon">
                                →
                            </div>

                            <div>
                                <h3>Fast Delivery</h3>
                                <p>Delivered to your doorstep</p>
                            </div>

                        </div>


                        <div className="benefit-item">

                            <div className="benefit-icon">
                                ♢
                            </div>

                            <div>
                                <h3>Secure Payments</h3>
                                <p>Safe and reliable checkout</p>
                            </div>

                        </div>


                        <div className="benefit-item">

                            <div className="benefit-icon">
                                ↺
                            </div>

                            <div>
                                <h3>Easy Returns</h3>
                                <p>Simple return process</p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CATEGORIES ================= */}

            <section className="categories-section">

                <div className="home-container">

                    <div className="section-heading">

                        <div>
                            <span className="section-eyebrow">
                                SHOP BY CATEGORY
                            </span>

                            <h2>
                                What are you looking for?
                            </h2>
                        </div>

                        <Link to="/products">
                            View all →
                        </Link>

                    </div>


                    <div className="category-grid">

                        <Link
                            to="/products?category=electronics"
                            className="category-card category-electronics"
                        >

                            <div className="category-content">

                                <span className="category-number">
                                    01
                                </span>

                                <h3>
                                    Electronics
                                </h3>

                                <p>
                                    Gadgets, devices and accessories
                                </p>

                                <span className="category-link">
                                    Shop now →
                                </span>

                            </div>

                            <div className="category-visual">
                                <div className="category-device">
                                    ◫
                                </div>
                            </div>

                        </Link>


                        <Link
                            to="/products?category=fashion"
                            className="category-card category-fashion"
                        >

                            <div className="category-content">

                                <span className="category-number">
                                    02
                                </span>

                                <h3>
                                    Fashion
                                </h3>

                                <p>
                                    Style, clothing and accessories
                                </p>

                                <span className="category-link">
                                    Shop now →
                                </span>

                            </div>

                            <div className="category-visual">
                                <div className="category-fashion-shape">
                                    V
                                </div>
                            </div>

                        </Link>


                        <Link
                            to="/products?category=home"
                            className="category-card category-home"
                        >

                            <div className="category-content">

                                <span className="category-number">
                                    03
                                </span>

                                <h3>
                                    Home & Living
                                </h3>

                                <p>
                                    Make your space feel better
                                </p>

                                <span className="category-link">
                                    Shop now →
                                </span>

                            </div>

                            <div className="category-visual">
                                <div className="category-home-shape">
                                    □
                                </div>
                            </div>

                        </Link>


                        <Link
                            to="/products?category=accessories"
                            className="category-card category-accessories"
                        >

                            <div className="category-content">

                                <span className="category-number">
                                    04
                                </span>

                                <h3>
                                    Accessories
                                </h3>

                                <p>
                                    The finishing touches you need
                                </p>

                                <span className="category-link">
                                    Shop now →
                                </span>

                            </div>

                            <div className="category-visual">
                                <div className="category-accessory-shape">
                                    ○
                                </div>
                            </div>

                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= FEATURED PRODUCTS ================= */}

            <section className="featured-section">

                <div className="home-container">

                    <div className="section-heading">

                        <div>

                            <span className="section-eyebrow">
                                FEATURED
                            </span>

                            <h2>
                                Popular right now
                            </h2>

                        </div>

                        <Link to="/products">
                            View all products →
                        </Link>

                    </div>


                    {loading ? (

                        <div className="home-loading">
                            <div className="loading-spinner"></div>
                            <p>Loading products...</p>
                        </div>

                    ) : products.length === 0 ? (

                        <div className="home-empty">
                            <h3>
                                No products available
                            </h3>

                            <p>
                                New products will appear here.
                            </p>
                        </div>

                    ) : (

                        <div className="home-product-grid">

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


            {/* ================= DEAL BANNER ================= */}

            <section className="deal-section">

                <div className="home-container">

                    <div className="deal-banner">

                        <div className="deal-copy">

                            <span>
                                VEYRO SPECIAL
                            </span>

                            <h2>
                                Great products.
                                <br />
                                Better prices.
                            </h2>

                            <p>
                                Discover products worth adding
                                to your cart.
                            </p>

                            <Link
                                to="/products"
                                className="home-btn home-btn-white"
                            >
                                Shop Deals →
                            </Link>

                        </div>


                        <div className="deal-visual">

                            <div className="deal-circle circle-one"></div>
                            <div className="deal-circle circle-two"></div>

                            <div className="deal-card">
                                <small>VEYRO</small>
                                <strong>
                                    DEAL
                                </strong>
                                <span>
                                    EVERY DAY
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= WHY VEYRO ================= */}

            <section className="why-section">

                <div className="home-container">

                    <div className="why-layout">

                        <div className="why-heading">

                            <span className="section-eyebrow">
                                WHY VEYRO
                            </span>

                            <h2>
                                Shopping should
                                <span> be simple.</span>
                            </h2>

                            <p>
                                Veyro brings products, prices and
                                convenience together in one place.
                            </p>

                        </div>


                        <div className="why-features">

                            <div className="why-feature">

                                <span>01</span>

                                <div>
                                    <h3>
                                        Curated Products
                                    </h3>

                                    <p>
                                        Find useful products without
                                        endless searching.
                                    </p>
                                </div>

                            </div>


                            <div className="why-feature">

                                <span>02</span>

                                <div>
                                    <h3>
                                        Simple Shopping
                                    </h3>

                                    <p>
                                        Browse, choose, add to cart
                                        and checkout without friction.
                                    </p>
                                </div>

                            </div>


                            <div className="why-feature">

                                <span>03</span>

                                <div>
                                    <h3>
                                        Customer First
                                    </h3>

                                    <p>
                                        A shopping experience designed
                                        around the customer.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FINAL CTA ================= */}

            <section className="final-cta">

                <div className="home-container">

                    <span className="section-eyebrow">
                        READY TO SHOP?
                    </span>

                    <h2>
                        Find something
                        <br />
                        you'll love.
                    </h2>

                    <Link
                        to="/products"
                        className="home-btn home-btn-white"
                    >
                        Start Shopping →
                    </Link>

                </div>

            </section>

        </main>
    );
};

export default Home;