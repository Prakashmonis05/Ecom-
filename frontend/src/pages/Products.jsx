import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { LoadingSpinner } from "../components/LoadingAnimation";
import "./Products.css";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 10;

    const fetchProducts = async () => {

        try {

            setLoading(true);
            setError("");

            const params = {
                page,
                limit
            };

            if (search) {
                params.search = search;
            }

            if (category) {
                params.category = category;
            }

            if (minPrice) {
                params.minPrice = minPrice;
            }

            if (maxPrice) {
                params.maxPrice = maxPrice;
            }

            if (sort) {
                params.sort = sort;
            }

            const response = await api.get(
                "/products",
                { params }
            );

            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setLoading(false);

        }
    };

    const fetchCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data.categories);

        } catch (error) {

            console.log(
                "Failed to load categories"
            );

        }
    };

    useEffect(() => {

        fetchCategories();

    }, []);

    useEffect(() => {

        fetchProducts();

    }, [
        page,
        category,
        sort,
        minPrice,
        maxPrice
    ]);

    const handleSearch = (e) => {

        e.preventDefault();

        setPage(1);
        fetchProducts();

    };

    const clearFilters = () => {

        setSearch("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSort("");
        setPage(1);

    };

    const [showFilters, setShowFilters] = useState(false);

    const activeFiltersCount = (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + (sort ? 1 : 0);
    const selectedCategoryName = categories.find((c) => c._id === category)?.name || "";

    return (
        <div className="products-page">

            <div className="products-header">
                <h1>Products</h1>
            </div>

            <div className="products-controls">

                {/* Amazon-style Sleek Search & Filter Bar */}
                <div className="amazon-search-row">

                    <form
                        className="amazon-search-bar"
                        onSubmit={handleSearch}
                    >
                        {/* Category Dropdown (Amazon Left Pill) */}
                        <div className="amazon-cat-wrap">
                            <select
                                aria-label="Select Category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setPage(1);
                                }}
                            >
                                <option value="">All</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <svg className="amazon-caret" viewBox="0 0 10 6" fill="none" stroke="currentColor">
                                <path d="M1 1l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        {/* Search Input */}
                        <div className="amazon-input-wrap">
                            <input
                                type="text"
                                placeholder="Search products, brands, titles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    type="button"
                                    className="search-clear-x"
                                    onClick={() => {
                                        setSearch("");
                                        setPage(1);
                                        fetchProducts("");
                                    }}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Amazon Search Button */}
                        <button type="submit" className="amazon-search-btn" aria-label="Search">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="7"/>
                                <line x1="21" y1="21" x2="16" y2="16"/>
                            </svg>
                        </button>
                    </form>

                    {/* Filter Toggle Button */}
                    <button
                        type="button"
                        className={`filter-toggle-btn ${showFilters ? "is-active" : ""}`}
                        onClick={() => setShowFilters((open) => !open)}
                        aria-expanded={showFilters}
                        title="Toggle filters"
                    >
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14"/>
                            <line x1="4" y1="10" x2="4" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="12"/>
                            <line x1="12" y1="8" x2="12" y2="3"/>
                            <line x1="20" y1="21" x2="20" y2="16"/>
                            <line x1="20" y1="12" x2="20" y2="3"/>
                            <line x1="1" y1="14" x2="7" y2="14"/>
                            <line x1="9" y1="8" x2="15" y2="8"/>
                            <line x1="17" y1="16" x2="23" y2="16"/>
                        </svg>
                        <span>Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="filter-count-badge">{activeFiltersCount}</span>
                        )}
                    </button>

                </div>

                {/* Collapsible Filter Panel (Appears only on toggle) */}
                {showFilters && (
                    <div className="filter-drawer-panel">
                        <div className="drawer-header">
                            <span className="drawer-title">Filter & Sort</span>
                            {activeFiltersCount > 0 && (
                                <button type="button" className="drawer-clear-btn" onClick={clearFilters}>
                                    Reset all
                                </button>
                            )}
                        </div>

                        <div className="drawer-grid">
                            {/* Price Range */}
                            <div className="drawer-field">
                                <label>Price Range</label>
                                <div className="price-inputs-group">
                                    <div className="price-input-wrapper">
                                        <span className="currency-prefix">$</span>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={minPrice}
                                            onChange={(e) => {
                                                setMinPrice(e.target.value);
                                                setPage(1);
                                            }}
                                        />
                                    </div>
                                    <span className="price-to">to</span>
                                    <div className="price-input-wrapper">
                                        <span className="currency-prefix">$</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={maxPrice}
                                            onChange={(e) => {
                                                setMaxPrice(e.target.value);
                                                setPage(1);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="drawer-field">
                                <label>Sort By</label>
                                <select
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        setPage(1);
                                    }}
                                >
                                    <option value="">Featured / Newest</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="name_asc">Name: A to Z</option>
                                    <option value="name_desc">Name: Z to A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Active Filter Chips */}
                {(search || category || minPrice || maxPrice || sort) && (
                    <div className="active-chips-bar">
                        <span className="chips-label">Active:</span>
                        {search && (
                            <span className="filter-chip">
                                "{search}"
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setPage(1);
                                        fetchProducts("");
                                    }}
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {category && (
                            <span className="filter-chip">
                                {selectedCategoryName || "Category"}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCategory("");
                                        setPage(1);
                                    }}
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {(minPrice || maxPrice) && (
                            <span className="filter-chip">
                                ${minPrice || "0"} - {maxPrice ? `$${maxPrice}` : "Any"}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMinPrice("");
                                        setMaxPrice("");
                                        setPage(1);
                                    }}
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {sort && (
                            <span className="filter-chip">
                                Sort: {sort === "price_asc" ? "Price Low-High" : sort === "price_desc" ? "Price High-Low" : sort === "name_asc" ? "A-Z" : "Z-A"}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSort("");
                                        setPage(1);
                                    }}
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        <button type="button" className="chip-clear-all" onClick={clearFilters}>
                            Clear all
                        </button>
                    </div>
                )}

            </div>

            <div className="products-content">

                {loading && (
                    <div className="page-loading-wrapper">
                        <LoadingSpinner size="lg" />
                        <p className="page-loading-text">Loading products...</p>
                    </div>
                )}

                {error && (
                    <p className="status-text error-text">{error}</p>
                )}

                {!loading && !error && products.length === 0 && (
                    <p className="status-text">No products found.</p>
                )}

                {!loading && !error && products.length > 0 && (

                    <div className="products-grid">

                        {products.map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        ))}

                    </div>

                )}

            </div>

            {/* Pagination */}

            {!loading && totalPages > 1 && (

                <div className="pagination">

                    <button
                        disabled={page === 1}
                        onClick={() =>
                            setPage((previous) =>
                                previous - 1
                            )
                        }
                    >
                        Previous
                    </button>

                    <span className="pagination-info">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() =>
                            setPage((previous) =>
                                previous + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
};

export default Products;