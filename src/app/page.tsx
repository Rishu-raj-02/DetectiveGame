"use client";

import { useInvestigation } from "@/hooks/useInvestigation";
import LandingScreen from "../components/LandingScreen";
import Hub from "../components/Hub";
import CaseBriefing from "../components/CaseBriefing";
import FinalDeduction from "../components/FinalDeduction";
import ResultAnalysis from "../components/ResultAnalysis";
import { useState } from "react";

export default function Home() {
    const { state } = useInvestigation();
    const [gameState, setGameState] = useState<'landing' | 'briefing' | 'hub' | 'deduction' | 'results'>('landing');
    const [finalDeduction, setFinalDeduction] = useState<any>(null);

    const startInvestigation = () => {
        setGameState('briefing');
    };

    const finishBriefing = () => {
        setGameState('hub');
    };

    const goToDeduction = () => {
        setGameState('deduction');
    };

    const handleDeductionSubmit = (deduction: any) => {
        setFinalDeduction(deduction);
        setGameState('results');
    };

    const restart = () => {
        localStorage.removeItem('gsk_investigation_state');
        window.location.reload();
    };

    return (
        <main style={{ minHeight: '100vh' }}>
            {gameState === 'landing' && <LandingScreen onStart={startInvestigation} />}
            {gameState === 'briefing' && <CaseBriefing onComplete={finishBriefing} />}
            {gameState === 'hub' && <Hub onFinish={goToDeduction} />}
            {gameState === 'deduction' && <FinalDeduction onComplete={handleDeductionSubmit} />}
            {gameState === 'results' && <ResultAnalysis deduction={finalDeduction} onRestart={restart} />}
        </main>
    );
}
