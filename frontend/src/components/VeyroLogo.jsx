const VeyroLogo = ({ className = "", size = 38 }) => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Veyro Logo"
        >
            <defs>
                {/* Background Squircle Gradient */}
                <linearGradient id="veyroBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18261e" />
                    <stop offset="50%" stopColor="#22362b" />
                    <stop offset="100%" stopColor="#121e17" />
                </linearGradient>

                {/* Left Facet Gradient */}
                <linearGradient id="veyroFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#d5e2da" />
                </linearGradient>

                {/* Right Facet Gradient */}
                <linearGradient id="veyroFacetRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#86b297" />
                    <stop offset="100%" stopColor="#436a53" />
                </linearGradient>

                {/* Accent Pip Gradient */}
                <linearGradient id="veyroPip" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                {/* Subtle Glow Filter */}
                <filter id="veyroShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" floodColor="#0d1712" />
                </filter>
            </defs>

            {/* Squircle Badge */}
            <rect
                x="1"
                y="1"
                width="42"
                height="42"
                rx="12"
                fill="url(#veyroBgGrad)"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.2"
                filter="url(#veyroShadow)"
            />

            {/* Inner Subtle Border */}
            <rect
                x="3"
                y="3"
                width="38"
                height="38"
                rx="10"
                fill="none"
                stroke="rgba(52, 211, 153, 0.15)"
                strokeWidth="0.8"
            />

            {/* Stylized Architectural 'V' Left Wing */}
            <path
                d="M11 12L22 32L17.5 32L8 14.5L11 12Z"
                fill="url(#veyroFacetLeft)"
            />

            {/* Stylized Architectural 'V' Right Wing */}
            <path
                d="M33 12L22 32L26.5 32L36 14.5L33 12Z"
                fill="url(#veyroFacetRight)"
            />

            {/* Center Prism Gem */}
            <path
                d="M22 18L26 25L22 31.5L18 25L22 18Z"
                fill="#ffffff"
                opacity="0.95"
            />

            {/* Emerald Diamond Accent Crown */}
            <circle
                cx="22"
                cy="10.5"
                r="2"
                fill="url(#veyroPip)"
            />
        </svg>
    );
};

export default VeyroLogo;
