import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminCategories.css";

const AdminCategories = () => {

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: ""
    });

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data.categories);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load categories"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    const resetForm = () => {

        setFormData({
            name: "",
            description: "",
            image: ""
        });

        setEditingId(null);
        setError("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");

        try {

            if (editingId) {

                const response = await api.put(
                    `/categories/${editingId}`,
                    formData
                );

                alert(
                    response.data.message ||
                    "Category updated successfully"
                );

            } else {

                const response = await api.post(
                    "/categories",
                    formData
                );

                alert(
                    response.data.message ||
                    "Category created successfully"
                );

            }

            resetForm();

            fetchCategories();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to save category"
            );

        } finally {

            setSaving(false);

        }
    };

    const editCategory = (category) => {

        setEditingId(category._id);

        setFormData({
            name: category.name || "",
            description: category.description || "",
            image: category.image || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const deleteCategory = async (categoryId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await api.delete(
                `/categories/${categoryId}`
            );

            alert(response.data.message);

            setCategories((previousCategories) =>
                previousCategories.filter(
                    (category) =>
                        category._id !== categoryId
                )
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }
    };

    if (loading) {
        return <p>Loading categories...</p>;
    }

   return (
    <div className="admin-page categories-page">

        <div className="admin-page__header">
            <div>
                <span className="admin-page__eyebrow">
                    CATALOG
                </span>

                <h1 className="admin-page__title">
                    Manage Categories
                </h1>

                <p className="admin-page__description">
                    Create, update and organize your product categories.
                </p>
            </div>
        </div>

        {error && (
            <div className="admin-alert admin-alert--error">
                {error}
            </div>
        )}

        <div className="categories-layout">

            {/* FORM */}

            <section className="category-form-card">

                <div className="category-form-card__header">

                    <div>
                        <span className="category-form-card__label">
                            {editingId ? "EDIT CATEGORY" : "NEW CATEGORY"}
                        </span>

                        <h2>
                            {editingId
                                ? "Update Category"
                                : "Add Category"}
                        </h2>
                    </div>

                    {editingId && (
                        <button
                            type="button"
                            className="category-cancel-icon"
                            onClick={resetForm}
                            title="Cancel editing"
                        >
                            ×
                        </button>
                    )}

                </div>

                <form
                    className="category-form"
                    onSubmit={handleSubmit}
                >

                    <div className="category-form__field">

                        <label htmlFor="category-name">
                            Category Name
                        </label>

                        <input
                            id="category-name"
                            type="text"
                            name="name"
                            placeholder="e.g. Electronics"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="category-form__field">

                        <label htmlFor="category-description">
                            Description
                        </label>

                        <textarea
                            id="category-description"
                            name="description"
                            placeholder="Describe this category..."
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                        />

                    </div>

                    <div className="category-form__field">

                        <label htmlFor="category-image">
                            Image URL
                        </label>

                        <input
                            id="category-image"
                            type="url"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                        />

                    </div>

                    {formData.image && (
                        <div className="category-image-preview">

                            <img
                                src={formData.image}
                                alt="Category preview"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />

                        </div>
                    )}

                    <div className="category-form__actions">

                        <button
                            className="button button-primary"
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Category"
                                    : "Add Category"}
                        </button>

                        {editingId && (
                            <button
                                className="button button-secondary"
                                type="button"
                                onClick={resetForm}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </section>


            {/* CATEGORY LIST */}

            <section className="categories-list-section">

                <div className="categories-list-header">

                    <div>
                        <span className="category-form-card__label">
                            CATEGORIES
                        </span>

                        <h2>
                            Your Categories
                        </h2>
                    </div>

                    <span className="category-count">
                        {categories.length}
                    </span>

                </div>

                {categories.length === 0 ? (

                    <div className="categories-empty">

                        <div className="categories-empty__icon">
                            +
                        </div>

                        <h3>
                            No categories yet
                        </h3>

                        <p>
                            Create your first category using the form.
                        </p>

                    </div>

                ) : (

                    <div className="categories-grid">

                        {categories.map((category) => (

                            <article
                                className="category-card"
                                key={category._id}
                            >

                                <div className="category-card__image">

                                    {category.image ? (

                                        <img
                                            src={category.image}
                                            alt={category.name}
                                        />

                                    ) : (

                                        <span>
                                            {category.name
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </span>

                                    )}

                                </div>

                                <div className="category-card__content">

                                    <h3>
                                        {category.name}
                                    </h3>

                                    <p>
                                        {category.description ||
                                            "No description provided."}
                                    </p>

                                    <div className="category-card__actions">

                                        <button
                                            className="category-action category-action--edit"
                                            onClick={() =>
                                                editCategory(category)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="category-action category-action--delete"
                                            onClick={() =>
                                                deleteCategory(
                                                    category._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </div>

    </div>
);
};

export default AdminCategories;