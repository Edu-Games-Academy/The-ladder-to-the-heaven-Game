
import React from 'react';
import { motion } from 'framer-motion';

interface DiceProps {
    value: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const DOT_POSITIONS: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
};

export default function Dice({ value, size = 'md' }: DiceProps) {
    const sizeClasses = {
        sm: 'w-12 h-12 p-2 gap-1 rounded-lg',
        md: 'w-20 h-20 p-3 gap-2 rounded-xl',
        lg: 'w-28 h-28 p-4 gap-3 rounded-2xl',
        xl: 'w-40 h-40 p-6 gap-4 rounded-3xl',
    };

    const dotSizes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4 shadow-[0_2px_4px_rgba(0,0,0,0.2)]',
        xl: 'w-6 h-6 shadow-[0_4px_8px_rgba(0,0,0,0.3)]',
    };

    const dots = DOT_POSITIONS[value] || [];

    return (
        <motion.div
            className={`${sizeClasses[size]} bg-white shadow-[0_10px_20px_rgba(0,0,0,0.2),inset_0_-2px_6px_rgba(0,0,0,0.1)] grid grid-cols-3 grid-rows-3 relative`}
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            whileHover={{ y: -5, rotate: 5 }}
        >
            {[...Array(9)].map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                    {dots.includes(i) && (
                        <motion.div
                            layoutId={`dot-${i}`}
                            className={`${dotSizes[size]} bg-gray-900 rounded-full bg-gradient-to-br from-gray-800 to-black`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: i * 0.02 }}
                        />
                    )}
                </div>
            ))}

            {/* Subtle shine effect */}
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
        </motion.div>
    );
}
