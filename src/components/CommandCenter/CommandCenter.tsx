

import React from 'react';
import Scoreboard from './Scoreboard';
import Timer from './Timer';
import { TeamState } from '@/types/game';
import gameSettings from '@/data/gameSettings.json';

interface CommandCenterProps {
    teams: TeamState[];
    currentTeam: number;
    timerValue: number;
    phase: string;
}

export default function CommandCenter({
    teams,
    currentTeam,
    timerValue,
    phase,
}: CommandCenterProps) {
    return (
        <div className="h-full flex flex-col items-center py-3 px-3 space-y-3 overflow-y-auto no-scrollbar bg-black/20" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Scoreboard */}
            <div className="w-full">
                <Scoreboard teams={teams} currentTeam={currentTeam} />
            </div>

            {/* Current Team Indicator */}
            <div className="w-full glass-dark rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="text-center">
                    <div className="text-[15px] text-purple-300 font-bold uppercase tracking-[0.2em] mb-3">Đang đến lượt</div>
                    <div className="flex items-center justify-center gap-4 bg-white/5 py-3 px-6 rounded-xl border border-white/5">
                        <div
                            className="w-8 h-8 rounded-full border-2 border-white/20 shadow-lg shrink-0"
                            style={{
                                backgroundColor: gameSettings.teamColors[currentTeam].bg,
                            }}
                        />
                        <span className="text-3xl font-black text-white tracking-tight">
                            {gameSettings.teamColors[currentTeam].name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Timer Section - Centered in remaining space */}
            <div className="flex-grow flex items-center justify-center w-full min-h-[220px]">
                <Timer value={timerValue} isActive={phase === 'answering'} />
            </div>
        </div>
    );
}
