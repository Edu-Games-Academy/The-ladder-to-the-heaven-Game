

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
    value: number;
    isActive: boolean;
}

export default function Timer({ value, isActive }: TimerProps) {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        setDisplayValue(value);
    }, [value]);

    if (!isActive || value === 0) return null;

    const getColor = () => {
        if (displayValue > 30) return 'from-green-500 to-emerald-500';
        if (displayValue > 10) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-rose-500';
    };

    const shouldPulse = displayValue <= 10;

    return (
        <motion.div
            className={`relative w-48 h-48 rounded-full glass-dark border-4 flex items-center justify-center ${shouldPulse ? 'animate-pulse-glow' : ''
                }`}
            style={{
                borderImage: `linear-gradient(135deg, ${getColor()}) 1`,
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
        >
            {/* Circular Progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                />
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 1 }}
                    animate={{ pathLength: displayValue / 90 }}
                    transition={{ duration: 0.5 }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Timer Value */}
            <motion.div
                className="text-6xl font-bold gradient-text z-10"
                key={displayValue}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {displayValue}
            </motion.div>
        </motion.div>
    );
}
