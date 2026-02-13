
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentRenderer from './ContentRenderer';

interface QuestionData {
  id: number;
  question: string;
  answer: string;
}

interface FormData {
  stage: number;
  content: string;
}

interface QuestionAreaProps {
  question: QuestionData | null;
  form: FormData | null;
  showAnswer: boolean;
  diceValue: number | null;
  phase: string;
  onRollDice: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
  onToggleAnswer: () => void;
}

export default function QuestionArea({
  question,
  form,
  showAnswer,
  diceValue,
  phase,
  onRollDice,
  onCorrect,
  onIncorrect,
  onToggleAnswer,
}: QuestionAreaProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-between p-4 overflow-hidden relative bg-black/5">
      {/* Scrollable Content Area */}
      <div className="w-full flex-grow flex flex-col items-center justify-start overflow-y-auto no-scrollbar space-y-6 pb-32 pt-2">
        {/* Stage Info */}
        <AnimatePresence>
          {form && (phase === 'idle' || phase === 'answering' || phase === 'rolling') && (
            <motion.div
              className="w-full max-w-4xl glass-dark rounded-xl p-4 border border-purple-500/30 shadow-lg bg-gradient-to-br from-purple-900/10 to-transparent flex-shrink-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-lg font-bold uppercase tracking-widest border border-purple-500/20">
                  Thông tin chặng {form.stage}
                </span>
                <div className="h-px flex-grow bg-gradient-to-r from-purple-500/30 to-transparent" />
              </div>
              <div className="max-h-[200px] overflow-y-auto no-scrollbar">
                <ContentRenderer content={form.content} compact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dice Display */}
        <AnimatePresence>
          {phase === 'rolling' && diceValue && (
            <motion.div
              className="glass-dark rounded-3xl p-8 glow-primary shadow-[0_0_40px_rgba(139,92,246,0.3)] my-8"
              initial={{ scale: 0, rotate: -270 }}
              animate={{ scale: 1.1, rotate: 0 }}
              exit={{ scale: 0, rotate: 270 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="relative w-28 h-28 bg-white rounded-2xl p-1 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
                <img
                  src={`/images/dice/dice_${diceValue}.svg`}
                  alt={`Dice ${diceValue}`}
                  className="object-contain w-full h-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Display */}
        <AnimatePresence mode="wait">
          {question && phase === 'answering' && (
            <motion.div
              key={`question-${question.id}`}
              className="glass-dark rounded-2xl p-8 w-full max-w-4xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/20"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ display: showAnswer ? 'none' : 'block' }}
            >
              <h2 className="text-3xl font-black mb-6 gradient-text flex items-center gap-4">
                <span className="bg-white/10 px-4 py-2 rounded-xl text-lg uppercase tracking-[0.3em] font-bold border border-white/10 shadow-inner">
                  Câu hỏi #{question.id}
                </span>
              </h2>
              <div className="min-w-[300px]">
                <ContentRenderer content={question.question} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Answer Display Overlay - Restricted to Center Area */}
      <AnimatePresence>
        {showAnswer && question && (
          <motion.div
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-dark rounded-3xl w-full max-w-3xl border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.15)] bg-gradient-to-br from-green-900/10 via-black/95 to-black/98 flex flex-col max-h-[85vh] overflow-hidden"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <h3 className="text-2xl font-black text-green-400 flex items-center gap-3">
                  <span className="w-2 h-8 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,1)]" />
                  Đáp án chính xác
                </h3>
                <button
                  onClick={onToggleAnswer}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                >
                  <span className="text-xl text-white/30 group-hover:text-white transition-colors">✕</span>
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-6 no-scrollbar">
                <div className="min-w-[400px] mb-6">
                  <ContentRenderer content={question.answer} />
                </div>
              </div>
              <div className="flex gap-4 p-6 border-t border-white/10 bg-black/60">
                <motion.button
                  onClick={onCorrect}
                  className="flex-1 glass-dark px-6 py-4 rounded-xl font-black text-lg border border-green-500/50 hover:bg-green-500/20 transition-all duration-300 shadow-lg text-green-400"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ✅ CHÍNH XÁC
                </motion.button>
                <motion.button
                  onClick={onIncorrect}
                  className="flex-1 glass-dark px-6 py-4 rounded-xl font-black text-lg border border-red-500/50 hover:bg-red-500/20 transition-all duration-300 shadow-lg text-red-400"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ❌ SAI RỒI
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Action Controls at Bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none pb-4">
        <div className="pointer-events-auto">
          {phase === 'idle' && (
            <motion.button
              onClick={onRollDice}
              className="glass-dark px-12 py-5 rounded-2xl font-black text-2xl hover:glow-primary transition-all duration-300 border-2 border-purple-500/40 shadow-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 group"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <span className="inline-block transition-transform duration-300 group-hover:rotate-12 mr-3 text-3xl">🎲</span>
              TUNG XÚC XẮC
            </motion.button>
          )}

          {phase === 'answering' && !showAnswer && (
            <motion.button
              onClick={onToggleAnswer}
              className="glass-dark px-10 py-5 rounded-2xl font-black text-xl border border-blue-500/40 hover:bg-blue-500/20 transition-all duration-300 shadow-lg text-blue-400"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              📖 XEM ĐÁP ÁN
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
