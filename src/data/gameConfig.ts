/**
 * Game Configuration
 * Extracted from legacy main.js to maintain 100% logic parity
 */

export interface PriceEffect {
  correct?: number; // y in legacy code
  incorrect?: number; // n in legacy code
}

/**
 * Prices array defines rewards/penalties for each ladder position
 * - If value > 1: additive (team.money += value)
 * - If value < 1: multiplicative (team.money *= value)
 */
export const PRICES: PriceEffect[] = [
  {}, // Position 0: Start (checkpoint, no effect)
  { correct: 1e8, incorrect: 0.5 }, // Position 1: 100M or ×0.5
  { correct: 2e8, incorrect: 0.5 }, // Position 2: 200M or ×0.5
  { correct: 3e8, incorrect: 0.5 }, // Position 3: 300M or ×0.5
  { correct: 4e8, incorrect: 0.5 }, // Position 4: 400M or ×0.5
  {}, // Position 5: Checkpoint (no effect)
  { correct: 5e8, incorrect: 0.25 }, // Position 6: 500M or ×0.25
  { correct: 6e8, incorrect: 0.25 }, // Position 7: 600M or ×0.25
  { correct: 7e8, incorrect: 0.25 }, // Position 8: 700M or ×0.25
  { correct: 8e8, incorrect: 0.25 }, // Position 9: 800M or ×0.25
  {}, // Position 10: Checkpoint (no effect)
  { correct: 20e8, incorrect: -20e8 }, // Position 11: +2B or -2B
  { correct: 22e8, incorrect: -22e8 }, // Position 12: +2.2B or -2.2B
  { correct: 18e8, incorrect: -18e8 }, // Position 13: +1.8B or -1.8B
  { correct: 24e8, incorrect: -24e8 }, // Position 14: +2.4B or -2.4B
  {}, // Position 15: Finish (no effect)
];

/**
 * Timer durations for each stage (in seconds)
 */
export const TIMER_DURATIONS = [60, 90, 90];

/**
 * Game constants
 */
export const MAX_STAGES = 3;
export const INITIAL_MONEY = 1e8; // 100 million VND
export const NUM_TEAMS = 4;
export const DICE_MIN = 1;
export const DICE_MAX = 4;

/**
 * Team colors (matching legacy CSS)
 */
export const TEAM_COLORS = [
  { bg: '#EA4335', border: '#EA4335', name: 'Tổ 1' }, // Google Red
  { bg: '#FBBC05', border: '#FBBC05', name: 'Tổ 2' }, // Google Yellow
  { bg: '#34A853', border: '#34A853', name: 'Tổ 3' }, // Google Green
  { bg: '#4285F4', border: '#4285F4', name: 'Tổ 4' }, // Google Blue
];

/**
 * Checkpoint positions (stages)
 */
export const CHECKPOINTS = [0, 5, 10, 15];
