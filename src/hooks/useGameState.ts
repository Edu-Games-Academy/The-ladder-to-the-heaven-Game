import { useState, useEffect, useCallback, useRef } from 'react';
import { PRICES, TIMER_DURATIONS, MAX_STAGES, INITIAL_MONEY, NUM_TEAMS, DICE_MIN, DICE_MAX } from '@/data/gameConfig';
import questionsData from '@/data/questions.json';
import stagesData from '@/data/stages.json';

export type GamePhase = 'idle' | 'rolling' | 'answering' | 'showing-answer' | 'ended';

export interface TeamState {
  position: number;
  money: number;
}

export interface GameState {
  currentTeam: number;
  currentQuestion: number;
  currentStage: number;
  teams: TeamState[];
  phase: GamePhase;
  diceValue: number | null;
  timerValue: number;
  showAnswer: boolean;
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    currentTeam: 0,
    currentQuestion: 0,
    currentStage: 0,
    teams: Array(NUM_TEAMS).fill(null).map(() => ({
      position: 0,
      money: INITIAL_MONEY,
    })),
    phase: 'idle',
    diceValue: null,
    timerValue: 0,
    showAnswer: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start timer interval when answering phase begins
  useEffect(() => {
    if (gameState.phase === 'answering' && gameState.currentStage > 0) {

      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (prev.timerValue <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
          return { ...prev, timerValue: prev.timerValue - 1 };
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState.phase, gameState.currentStage]);

  // Move to next round (stage) - defined first to avoid dependency issues
  const moveToNextRound = useCallback((state: GameState): GameState => {
    const nextStage = state.currentStage + 1;

    if (nextStage > MAX_STAGES) {
      return { ...state, phase: 'ended', showAnswer: false };
    }

    const destination = 5 * (nextStage - 1);
    const newTeams = state.teams.map(team => ({
      ...team,
      position: destination,
    }));

    return {
      ...state,
      currentStage: nextStage,
      currentTeam: 0,
      teams: newTeams,
      phase: 'idle',
      diceValue: null,
      showAnswer: false,
    };
  }, []);

  // Move to next player
  const nextPlayer = useCallback(() => {
    setGameState(prev => {
      const nextTeam = (prev.currentTeam + 1) % NUM_TEAMS;
      const finishedRound = nextTeam === 0;

      if (finishedRound) {
        return moveToNextRound(prev);
      }

      return {
        ...prev,
        currentTeam: nextTeam,
        phase: 'idle',
        diceValue: null,
        showAnswer: false,
      };
    });
  }, [moveToNextRound]);

  // Roll dice and move team
  const rollDice = useCallback(() => {
    if (gameState.phase !== 'idle') return;

    const value = Math.floor(Math.random() * (DICE_MAX - DICE_MIN + 1)) + DICE_MIN;

    setGameState(prev => ({
      ...prev,
      phase: 'rolling',
      diceValue: value,
      showAnswer: false,
    }));

    setTimeout(() => {
      setGameState(prev => {
        const newTeams = [...prev.teams];
        newTeams[prev.currentTeam] = {
          ...newTeams[prev.currentTeam],
          position: newTeams[prev.currentTeam].position + value,
        };

        return { ...prev, teams: newTeams };
      });

      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          phase: 'answering',
          timerValue: TIMER_DURATIONS[prev.currentStage - 1] || 0,
        }));
      }, 500 * value + 300);
    }, 100);
  }, [gameState.phase]);

  // Apply price effect based on answer correctness
  const applyPriceEffect = useCallback((isCorrect: boolean) => {
    setGameState(prev => {
      const currentTeamState = prev.teams[prev.currentTeam];
      const price = PRICES[currentTeamState.position];

      if (!price || (!price.correct && !price.incorrect)) {
        return prev;
      }

      const effect = isCorrect ? price.correct : price.incorrect;
      if (effect === undefined) return prev;

      let newMoney = currentTeamState.money;

      if (Math.abs(effect) > 1) {
        newMoney += effect;
      } else {
        newMoney *= effect;
      }

      const newTeams = [...prev.teams];
      newTeams[prev.currentTeam] = {
        ...newTeams[prev.currentTeam],
        money: newMoney,
      };

      return { ...prev, teams: newTeams };
    });
  }, []);

  // Handle correct answer
  const answerCorrect = useCallback(() => {
    if (gameState.phase !== 'answering') return;
    applyPriceEffect(true);
    nextPlayer();
  }, [gameState.phase, applyPriceEffect, nextPlayer]);

  // Handle incorrect answer
  const answerIncorrect = useCallback(() => {
    if (gameState.phase !== 'answering') return;
    applyPriceEffect(false);
    nextPlayer();
  }, [gameState.phase, applyPriceEffect, nextPlayer]);

  // Show answer
  const toggleShowAnswer = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showAnswer: !prev.showAnswer,
    }));
  }, []);

  // Start game (move to stage 1)
  const startGame = useCallback(() => {
    setGameState(prev => {
      if (prev.currentStage !== 0) return prev;
      return moveToNextRound(prev);
    });
  }, [moveToNextRound]);

  // Get current question data
  const getCurrentQuestion = useCallback(() => {
    if (gameState.currentQuestion === 0 || gameState.currentQuestion > questionsData.length) {
      return null;
    }
    return questionsData[gameState.currentQuestion - 1];
  }, [gameState.currentQuestion]);

  // Get current form data
  const getCurrentForm = useCallback(() => {
    if (gameState.currentStage === 0 || gameState.currentStage > stagesData.length) {
      return null;
    }
    return stagesData[gameState.currentStage - 1];
  }, [gameState.currentStage]);

  return {
    gameState,
    rollDice,
    answerCorrect,
    answerIncorrect,
    toggleShowAnswer,
    startGame,
    getCurrentQuestion,
    getCurrentForm,
  };
}
