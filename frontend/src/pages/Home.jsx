import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <main className="home-page">

            {/* ================= HERO ================= */}
            <section className="home-hero">

                <div className="hero-content">

                    <div className="hero-badge-row">
                        <span className="hero-eyebrow">
                            CURATED LUXURY & LIFESTYLE
                        </span>
                        <div className="hero-rating-pill">
                            <span className="star-icon">★</span>
                            <strong>4.9/5</strong>
                            <span>(2,500+ Reviews)</span>
                        </div>
                    </div>

                    <h1>
                        Elevate your lifestyle.
                        <br />
                        <span>Curated for perfection.</span>
                    </h1>

                    <p>
                        Discover an exclusive collection of premium essentials, luxury fashion,
                        and timeless pieces crafted to redefine your everyday experience.
                    </p>

                    <div className="hero-actions">
                        <Link
                            to="/products"
                            className="hero-shop-btn"
                        >
                            <span>Explore Catalog</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>

                        <Link
                            to="/register"
                            className="hero-create-btn"
                        >
                            Join Veyro Circle
                        </Link>
                    </div>

                    {/* Hero Stats */}
                    <div className="hero-stats">
                        <div className="hero-stat-item">
                            <strong>10k+</strong>
                            <span>Products</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="hero-stat-item">
                            <strong>100%</strong>
                            <span>Authentic</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="hero-stat-item">
                            <strong>24/7</strong>
                            <span>Concierge</span>
                        </div>
                    </div>

                </div>

                {/* ================= PRODUCT VISUAL ================= */}
                <div className="hero-visual">

                    <div className="visual-circle"></div>
                    <div className="visual-circle visual-circle-secondary"></div>

                    <div className="visual-card-main">

                        <div className="visual-card-top">
                            <div className="visual-card-badge">
                                <span className="badge-dot"></span>
                                <span>NEW ARRIVAL</span>
                            </div>
                            <span className="edition-tag">LIMITED ED.</span>
                        </div>

                        <div className="visual-product">
                            <div className="product-orb">
                                <span className="orb-shine"></span>
                            </div>

                            <div className="product-line line-one"></div>
                            <div className="product-line line-two"></div>
                            <div className="product-line line-three"></div>
                        </div>

                        <div className="visual-card-bottom">
                            <div>
                                <span className="collection-sub">PREMIUM AUTUMN</span>
                                <strong>Veyro Signature 01</strong>
                            </div>
                            <Link to="/products" className="visual-shop-link">
                                <span>SHOP</span>
                                <span>→</span>
                            </Link>
                        </div>

                    </div>

                    {/* Floating Badges */}
                    <div className="floating-tag tag-one">
                        <span className="tag-icon">✦</span>
                        <div>
                            <strong>Curated</strong>
                            <p>Handpicked luxury</p>
                        </div>
                    </div>

                    <div className="floating-tag tag-two">
                        <span className="tag-icon">🛡</span>
                        <div>
                            <strong>Verified</strong>
                            <p>100% Genuine</p>
                        </div>
                    </div>

                    <div className="floating-tag tag-three">
                        <span className="tag-icon">⚡</span>
                        <div>
                            <strong>Fast Delivery</strong>
                            <p>Priority Express</p>
                        </div>
                    </div>

                </div>

            </section>

            {/* ================= VALUE PROPOSITION STRIP ================= */}
            <section className="home-features-strip">
                <div className="features-container">

                    <div className="feature-item">
                        <div className="feature-icon-box">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                        </div>
                        <div>
                            <h3>Complimentary Shipping</h3>
                            <p>On all orders with priority doorstep tracking</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-box">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3>Encrypted Checkout</h3>
                            <p>Bank-grade SSL protection for all payments</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-box">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                            </svg>
                        </div>
                        <div>
                            <h3>Effortless Returns</h3>
                            <p>Hassle-free 7-day exchange or refund policy</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-box">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3>Dedicated Support</h3>
                            <p>24/7 concierge assistance for our patrons</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="home-footer">
                <div className="footer-container">
                    <div className="footer-brand-side">
                        <span className="footer-logo">VEYRO</span>
                        <p className="footer-tagline">Curated Luxury & Lifestyle Essentials.</p>
                    </div>

                    <div className="footer-links">
                        <Link to="/products">Catalog</Link>
                        <Link to="/login">Sign In</Link>
                        <Link to="/register">Create Account</Link>
                    </div>

                    <div className="footer-bottom-line">
                        <span>© {new Date().getFullYear()} VEYRO Inc. All rights reserved.</span>
                        <span>Designed with precision.</span>
                    </div>
                </div>
            </footer>

        </main>
    );
};

export default Home;