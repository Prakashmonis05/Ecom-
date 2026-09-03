import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <main className="home-page">

        
            {/* ================= HERO ================= */}

            <section className="home-hero">

                <div className="hero-content">

                    <span className="hero-eyebrow">
                        WELCOME TO VEYRO
                    </span>

                    <h1>
                        Everything you need.
                        <br />
                        <span>One place to shop.</span>
                    </h1>

                    <p>
                        Discover products you'll love,
                        explore new finds, and enjoy a
                        simple shopping experience with Veyro.
                    </p>

                    <div className="hero-actions">

                        <Link
                            to="/products"
                            className="hero-shop-btn"
                        >
                            Explore Products
                            <span>→</span>
                        </Link>

                        <Link
                            to="/register"
                            className="hero-create-btn"
                        >
                            Create Account
                        </Link>

                    </div>

                </div>


                {/* ================= PRODUCT VISUAL ================= */}

                <div className="hero-visual">

                    <div className="visual-circle"></div>

                    <div className="visual-card-main">

                        <div className="visual-card-top">
                            <span>VEYRO</span>
                            <span>01</span>
                        </div>

                        <div className="visual-product">
                            <div className="product-orb"></div>

                            <div className="product-line line-one"></div>
                            <div className="product-line line-two"></div>
                            <div className="product-line line-three"></div>
                        </div>

                        <div className="visual-card-bottom">
                            <span>NEW COLLECTION</span>
                            <strong>SHOP NOW →</strong>
                        </div>

                    </div>


                    <div className="floating-tag tag-one">
                        <span>01</span>
                        <p>Discover</p>
                    </div>

                    <div className="floating-tag tag-two">
                        <span>02</span>
                        <p>Choose</p>
                    </div>

                    <div className="floating-tag tag-three">
                        <span>03</span>
                        <p>Shop</p>
                    </div>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="home-footer">

                <span>
                    © {new Date().getFullYear()} VEYRO
                </span>

                <span>
                    Simple. Modern. Yours.
                </span>

            </footer>

        </main>
    );
};

export default Home;