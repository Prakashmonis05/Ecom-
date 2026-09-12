import React from "react";
import "./LoadingAnimation.css";

export const LoadingSpinner = ({ size = "md", color = "primary" }) => {
    return (
        <div className={`veyro-spinner veyro-spinner-${size} veyro-spinner-${color}`} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

const LoadingAnimation = () => {
    return null;
};

export default LoadingAnimation;
