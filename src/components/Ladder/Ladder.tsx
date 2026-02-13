
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LADDER_POSITIONS } from '@/data/ladderPositions';
import { TeamState } from '@/hooks/useGameState';
import { TEAM_COLORS } from '@/data/gameConfig';
import { getAssetPath } from '@/utils/assetPath';

interface LadderProps {
    teams: TeamState[];
    currentTeam: number;
}

export default function Ladder({ teams, currentTeam }: LadderProps) {
    const activePosition = teams[currentTeam]?.position || 0;

    // Auto-scroll to active team position using scrollIntoView for better accuracy
    useEffect(() => {
        const element = document.getElementById(`ladder-pos-${activePosition}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [activePosition]);

    return (
        <div
            className="h-screen overflow-y-auto p-2 relative no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="flex flex-col-reverse gap-3 pb-32">
                {LADDER_POSITIONS.map((pos) => (
                    <div
                        key={pos.position}
                        id={`ladder-pos-${pos.position}`}
                        className="relative group scroll-mt-20"
                    >
                        <motion.div
                            className={`glass-dark rounded-xl overflow-hidden border transition-all duration-300 ${pos.isCheckpoint
                                ? 'border-purple-500/50 glow-primary/20 bg-purple-900/10'
                                : 'border-white/10 hover:border-white/30'
                                } ${activePosition === pos.position ? 'ring-2 ring-yellow-400/50' : ''}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: pos.position * 0.03 }}
                        >
                            <div className="relative h-28 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                                <img
                                    src={getAssetPath(pos.image)}
                                    alt={pos.label}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>

                            <div className="absolute bottom-1 left-2 z-10">
                                <span className={`text-[15px] font-bold uppercase tracking-tighter ${pos.isCheckpoint ? 'text-purple-300' : 'text-white/60'
                                    }`}>
                                    {pos.label}
                                </span>
                            </div>

                            {/* Team Avatars Grid inside Card */}
                            <div className="absolute top-1 right-1 flex flex-wrap justify-end gap-1 max-w-[60px]">
                                {teams.map((team, idx) =>
                                    team.position === pos.position ? (
                                        <motion.div
                                            key={idx}
                                            className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center font-black text-[10px] shadow-xl"
                                            style={{
                                                backgroundColor: TEAM_COLORS[idx].bg,
                                                color: 'white',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                            }}
                                            layoutId={`team-${idx}`}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        >
                                            {idx + 1}
                                        </motion.div>
                                    ) : null
                                )}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
