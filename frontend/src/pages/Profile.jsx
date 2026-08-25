import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Profile = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProfile = async () => {

        try {

            const response = await api.get("/users/profile");

            setProfile(response.data.user);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>My Profile</h1>

            <p>
                Name: {profile?.name}
            </p>

            <p>
                Email: {profile?.email}
            </p>

            <p>
                Role: {profile?.role}
            </p>

            <Link to="/change-password">
                Change Password
            </Link>

        </div>
    );
};

export default Profile;