export type ClueTag = 'behavioral' | 'geographic' | 'forensic' | 'operational';

export interface Clue {
    id: string;
    title: string;
    observation: string;
    context: string;
    tags: ClueTag[];
    confidenceImpact: number;
}

export interface DecisionOption {
    id: string;
    text: string;
    feedback: string;
    theoryImpact: Partial<TheoryScores>;
}

export interface Decision {
    id: string;
    question: string;
    options: DecisionOption[];
}

export interface TheoryScores {
    singleOffender: number;
    multipleOffender: number;
    organized: number;
    random: number;
    localFamiliarity: number;
    skilledBackground: number;
}

export interface InvestigationStage {
    id: number;
    title: string;
    description: string;
    clues: Clue[];
    decision?: Decision;
}

export interface Case {
    id: string;
    title: string;
    description: string;
    stages: InvestigationStage[];
}

export interface InvestigationState {
    currentStageIndex: number;
    discoveredClueIds: string[];
    theoryScores: TheoryScores;
    notebookContent: string;
    boardNodes: any[];
    boardEdges: any[];
    decisionsMade: Record<string, string>;
}
