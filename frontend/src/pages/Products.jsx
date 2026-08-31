import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
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

    return (
        <div className="products-page">

            <div className="products-header">
                <h1>Products</h1>
            </div>

            <div className="products-filters">

                {/* Search */}
                <form
                    className="filter-search"
                    onSubmit={handleSearch}
                >

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <button type="submit">
                        Search
                    </button>

                </form>

                <div className="filter-row">

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setPage(1);
                        }}
                    >

                        <option value="">
                            All Categories
                        </option>

                        {categories.map((cat) => (

                            <option
                                key={cat._id}
                                value={cat._id}
                            >
                                {cat.name}
                            </option>

                        ))}

                    </select>

                    {/* Price */}
                    <input
                        className="price-input"
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value);
                            setPage(1);
                        }}
                    />

                    <input
                        className="price-input"
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value);
                            setPage(1);
                        }}
                    />

                    {/* Sorting */}
                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            setPage(1);
                        }}
                    >

                        <option value="">
                            Newest
                        </option>

                        <option value="price_asc">
                            Price: Low to High
                        </option>

                        <option value="price_desc">
                            Price: High to Low
                        </option>

                        <option value="name_asc">
                            Name: A-Z
                        </option>

                        <option value="name_desc">
                            Name: Z-A
                        </option>

                    </select>

                    <button
                        className="clear-btn"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

            </div>

            <div className="products-content">

                {loading && (
                    <p className="status-text">Loading products...</p>
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