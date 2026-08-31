import { useEffect, useState } from "react";
import api from "../../services/api";

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
        <div>

            <h1>Manage Categories</h1>

            {error && (
                <p>{error}</p>
            )}

            <h2>
                {editingId
                    ? "Edit Category"
                    : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <textarea
                    name="description"
                    placeholder="Category Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="image"
                    placeholder="Category Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button
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
                    <>
                        {" "}

                        <button
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    </>
                )}

            </form>

            <hr />

            <h2>Categories</h2>

            {categories.length === 0 ? (

                <p>No categories found.</p>

            ) : (

                categories.map((category) => (

                    <div key={category._id}>

                        <h3>
                            {category.name}
                        </h3>

                        <p>
                            {category.description}
                        </p>

                        {category.image && (
                            <img
                                src={category.image}
                                alt={category.name}
                                width="150"
                            />
                        )}

                        <br />
                        <br />

                        <button
                            onClick={() =>
                                editCategory(category)
                            }
                        >
                            Edit
                        </button>

                        {" "}

                        <button
                            onClick={() =>
                                deleteCategory(
                                    category._id
                                )
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

export default AdminCategories;