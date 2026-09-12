import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

 const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
        const response = await api.get("/users/profile", {
            headers: {
                Authorization: `Bearer ${newToken}`
            }
        });

        setUser(response.data.user);

        return response.data.user;

    } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        throw error;
    }
};

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const getProfile = async () => {

        try {

            const response = await api.get("/users/profile");

            setUser(response.data.user);

        } catch (error) {

            console.log("Failed to load profile");

            logout();

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (token) {
            getProfile();
        } else {
            setLoading(false);
        }

    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};