
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

export interface LadderPosition {
    position: number;
    label: string;
    image: string;
    isCheckpoint: boolean;
    rewards: {
        correct: number;
        incorrect: number;
    };
}
