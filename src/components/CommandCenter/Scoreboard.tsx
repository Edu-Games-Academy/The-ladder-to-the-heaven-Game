

import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_COLORS } from '@/data/gameConfig';
import { TeamState } from '@/hooks/useGameState';

interface ScoreboardProps {
    teams: TeamState[];
    currentTeam: number;
}

export default function Scoreboard({ teams, currentTeam }: ScoreboardProps) {
    const formatMoney = (money: number) => {
        return Math.round(money).toLocaleString('vi-VN');
    };

    return (
        <div className="w-full glass-dark rounded-2xl p-4 border-2 border-purple-500/30 shadow-xl no-scrollbar">
            <h2 className="text-xl font-black mb-6 uppercase tracking-widest text-purple-300 text-center">
                Bảng điểm
            </h2>
            <div className="space-y-3 p-1.5">
                {teams.map((team, idx) => (
                    <motion.div
                        key={idx}
                        className={`rounded-xl p-2.5 border transition-all duration-300 ${
                            idx === currentTeam
                            ? 'bg-white/15 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-[1.02]'
                            : 'border-white/10 opacity-80'
                            }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex items-center justify-center gap-5">
                            {/* Team Avatar Badge */}
                            <div
                                className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-lg shadow-lg shrink-0"
                                style={{
                                    backgroundColor: TEAM_COLORS[idx].bg,
                                    borderColor: TEAM_COLORS[idx].border,
                                    color: 'white',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                                }}
                            >
                                {idx + 1}
                            </div>

                            {/* Team Info Container - Using max-width to keep content closer */}
                            <div className="flex-grow flex items-center justify-between max-w-[280px]">
                                <span className="font-bold text-lg text-white/90 truncate max-w-[100px]">
                                    {TEAM_COLORS[idx].name}
                                </span>

                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-2xl font-black text-green-400 tabular-nums">
                                            {formatMoney(team.money)}
                                        </span>
                                        <span className="text-[10px] font-bold text-white/40 uppercase">VNĐ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
