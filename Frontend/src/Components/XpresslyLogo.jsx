/**
 * XpresslyLogo Component
 * 
 * Customizable logo component for the Xpressly ride-sharing application.
 * Supports different variants (default, text, icon) and styling options.
 * Features gradient designs and animated elements for modern appearance.
 */

import React from 'react'

const XpresslyLogo = ({
    className = "w-10 h-10", // CSS classes for styling and sizing
    variant = "default", // Logo variant: "default", "text", or "icon"
    showText = false // Whether to display text alongside the logo
}) => {
    // Render logo with text variant
    if (variant === "text" || showText) {
        return (
            <div className={`flex items-center ${className}`}>
                <div className="w-10 h-10 relative">
                    <svg
                        viewBox="0 0 48 48"
                        className="w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="xpresslyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                            </linearGradient>
                            <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#F0F0F0', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        {/* Main Circle */}
                        <circle
                            cx="24"
                            cy="24"
                            r="22"
                            fill="url(#xpresslyGradient)"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                        />

                        {/* Speed Lines for Motion Effect */}
                        <path
                            d="M8 20 L16 20"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                        <path
                            d="M6 24 L14 24"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.4"
                        />
                        <path
                            d="M8 28 L16 28"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.6"
                        />

                        {/* Stylized X */}
                        <path
                            d="M18 18 L30 30 M30 18 L18 30"
                            stroke="url(#xGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Accent Dots */}
                        <circle cx="36" cy="12" r="2" fill="#10B981" />
                        <circle cx="39" cy="15" r="1.5" fill="#3B82F6" />
                    </svg>
                </div>

                {/* Text Logo */}
                {showText && (
                    <div className="ml-3">
                        <span className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
                                X
                            </span>
                            <span className="text-gray-800">pressly</span>
                        </span>
                    </div>
                )}
            </div>
        )
    }

    // Icon only variant
    return (
        <div className={className}>
            <svg
                viewBox="0 0 48 48"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background Circle with Gradient */}
                <defs>
                    <linearGradient id="xpresslyMainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="xMainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F0F0F0', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.2" />
                    </filter>
                </defs>

                {/* Main Circle with Shadow */}
                <circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="url(#xpresslyMainGradient)"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    filter="url(#shadow)"
                />

                {/* Speed Lines for Motion Effect */}
                <path
                    d="M8 20 L16 20"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                />
                <path
                    d="M6 24 L14 24"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.4"
                />
                <path
                    d="M8 28 L16 28"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                />

                {/* Stylized X */}
                <path
                    d="M18 18 L30 30 M30 18 L18 30"
                    stroke="url(#xMainGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Accent Dots */}
                <circle cx="36" cy="12" r="2" fill="#10B981" />
                <circle cx="39" cy="15" r="1.5" fill="#3B82F6" />
            </svg>
        </div>
    )
}

export default XpresslyLogo
