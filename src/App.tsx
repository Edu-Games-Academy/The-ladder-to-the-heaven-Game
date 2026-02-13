import React, { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import Ladder from './components/Ladder/Ladder';
import QuestionArea from './components/QuestionArea/QuestionArea';
import CommandCenter from './components/CommandCenter/CommandCenter';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const {
        gameState,
        rollDice,
        answerCorrect,
        answerIncorrect,
        toggleShowAnswer,
        startGame,
        getCurrentQuestion,
        getCurrentForm,
    } = useGameState();

    // Auto-start game on mount
    useEffect(() => {
        if (gameState.currentStage === 0) {
            startGame();
        }
    }, [gameState.currentStage, startGame]);

    const currentQuestion = getCurrentQuestion();
    const currentForm = getCurrentForm();

    return (
        <div className="min-h-screen bg-black text-white antialiased">
            <main className="h-screen w-screen overflow-hidden">
                {/* 3-Panel Layout */}
                <div className="grid grid-cols-[200px_1fr_400px] h-full">
                    {/* Left Panel: Ladder */}
                    <div className="border-r border-white/10">
                        <Ladder teams={gameState.teams} currentTeam={gameState.currentTeam} />
                    </div>

                    {/* Center Panel: Question Area */}
                    <div className="relative">
                        <QuestionArea
                            question={currentQuestion}
                            form={currentForm}
                            showAnswer={gameState.showAnswer}
                            diceValue={gameState.diceValue}
                            phase={gameState.phase}
                            onRollDice={rollDice}
                            onCorrect={answerCorrect}
                            onIncorrect={answerIncorrect}
                            onToggleAnswer={toggleShowAnswer}
                        />
                    </div>

                    {/* Right Panel: Command Center */}
                    <div className="border-l border-white/10">
                        <CommandCenter
                            teams={gameState.teams}
                            currentTeam={gameState.currentTeam}
                            timerValue={gameState.timerValue}
                            phase={gameState.phase}
                        />
                    </div>
                </div>

                {/* Game End Overlay */}
                <AnimatePresence>
                    {gameState.phase === 'ended' && (
                        <motion.div
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="glass-dark rounded-3xl p-12 max-w-2xl text-center border-2 border-purple-500 glow-primary"
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <h1 className="text-5xl font-bold mb-8 gradient-text">
                                    🎉 Kết thúc trò chơi!
                                </h1>
                                <div className="space-y-4">
                                    {gameState.teams
                                        .map((team, idx) => ({ ...team, idx }))
                                        .sort((a, b) => b.money - a.money)
                                        .map((team, rank) => (
                                            <motion.div
                                                key={team.idx}
                                                className="glass rounded-xl p-4 flex items-center justify-between"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: rank * 0.2 }}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="text-3xl font-bold">
                                                        {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : '🏅'}
                                                    </div>
                                                    <div className="text-xl font-semibold">
                                                        Tổ {team.idx + 1}
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-bold text-green-400">
                                                    {Math.round(team.money).toLocaleString('vi-VN')} VNĐ
                                                </div>
                                            </motion.div>
                                        ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
