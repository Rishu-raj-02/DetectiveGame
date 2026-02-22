"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { InvestigationState, TheoryScores } from '../types';
import { GSK_CASE } from '../data/cases/gsk';

const INITIAL_THEORY_SCORES: TheoryScores = {
    singleOffender: 0,
    multipleOffender: 0,
    organized: 0,
    random: 0,
    localFamiliarity: 0,
    skilledBackground: 0,
};

const INITIAL_STATE: InvestigationState = {
    currentStageIndex: 0,
    discoveredClueIds: [],
    theoryScores: INITIAL_THEORY_SCORES,
    notebookContent: '',
    boardNodes: [],
    boardEdges: [],
    decisionsMade: {},
};

interface InvestigationContextType {
    state: InvestigationState;
    dispatch: (action: any) => void;
    unlockClue: (clueId: string) => void;
    makeDecision: (decisionId: string, optionId: string, impact: Partial<TheoryScores>) => void;
    updateNotebook: (content: string) => void;
    advanceStage: () => void;
    regressStage: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<InvestigationState>(INITIAL_STATE);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('gsk_investigation_state');
        if (savedState) {
            setState(JSON.parse(savedState));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('gsk_investigation_state', JSON.stringify(state));
        }
    }, [state, isLoaded]);

    const unlockClue = (clueId: string) => {
        if (!state.discoveredClueIds.includes(clueId)) {
            setState(prev => ({
                ...prev,
                discoveredClueIds: [...prev.discoveredClueIds, clueId]
            }));
        }
    };

    const makeDecision = (decisionId: string, optionId: string, impact: Partial<TheoryScores>) => {
        setState(prev => {
            const nextDecisions = { ...prev.decisionsMade, [decisionId]: optionId };

            // Recalculate scores from scratch
            const newScores = { ...INITIAL_THEORY_SCORES };

            // Iterate through every decision made so far
            Object.entries(nextDecisions).forEach(([dId, oId]) => {
                if (!oId) return; // Skip if decision was revoked/cleared

                // Find the stage and option that matches this decision
                GSK_CASE.stages.forEach((stage: any) => {
                    if (stage.decision?.id === dId) {
                        const option = stage.decision.options.find((o: any) => o.id === oId);
                        if (option) {
                            newScores.singleOffender += (option.theoryImpact.singleOffender || 0);
                            newScores.multipleOffender += (option.theoryImpact.multipleOffender || 0);
                            newScores.organized += (option.theoryImpact.organized || 0);
                            newScores.random += (option.theoryImpact.random || 0);
                            newScores.localFamiliarity += (option.theoryImpact.localFamiliarity || 0);
                            newScores.skilledBackground += (option.theoryImpact.skilledBackground || 0);
                        }
                    }
                });
            });

            return {
                ...prev,
                decisionsMade: nextDecisions,
                theoryScores: newScores
            };
        });
    };

    const updateNotebook = (content: string) => {
        setState(prev => ({ ...prev, notebookContent: content }));
    };

    const advanceStage = () => {
        setState(prev => ({ ...prev, currentStageIndex: prev.currentStageIndex + 1 }));
    };

    const regressStage = () => {
        setState(prev => ({
            ...prev,
            currentStageIndex: Math.max(0, prev.currentStageIndex - 1)
        }));
    };

    const dispatch = (action: any) => {
        // Basic dispatch implementation if needed later
    };

    return (
        <InvestigationContext.Provider value={{ state, dispatch, unlockClue, makeDecision, updateNotebook, advanceStage, regressStage }}>
            {isLoaded && children}
        </InvestigationContext.Provider>
    );
};

export const useInvestigation = () => {
    const context = useContext(InvestigationContext);
    if (!context) {
        throw new Error('useInvestigation must be used within an InvestigationProvider');
    }
    return context;
};
