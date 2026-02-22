"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvestigation } from '../hooks/useInvestigation';
import { GSK_CASE } from '../data/cases/gsk';
import { useAudio } from '../hooks/useAudio';
import EvidenceCard from './EvidenceCard';
import Sidebar from './Sidebar';
import StageProgress from './StageProgress';
import TheoryPanel from './TheoryPanel';
import InteractiveMap from './InteractiveMap';
import PatternBoard from './PatternBoard';
import { Briefcase, Map as MapIcon, Share2, ChevronRight, Book } from 'lucide-react';

interface HubProps {
    onFinish: () => void;
}

const Hub: React.FC<HubProps> = ({ onFinish }) => {
    const { state, advanceStage, regressStage, makeDecision } = useInvestigation();
    const { playSFX } = useAudio();
    const [view, setView] = React.useState<'evidence' | 'map' | 'board'>('evidence');
    const currentStage = GSK_CASE.stages[state.currentStageIndex];

    const handleAdvance = () => {
        if (state.currentStageIndex < GSK_CASE.stages.length - 1) {
            playSFX('transition');
            advanceStage();
            setView('evidence');
        } else {
            playSFX('stamp');
            onFinish();
        }
    };

    const handleViewChange = (newView: 'evidence' | 'map' | 'board') => {
        playSFX('paper');
        setView(newView);
    };

    return (
        <div className="hub-container" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 380px',
            gridTemplateRows: 'auto 1fr',
            height: '100dvh', // Use dynamic viewport height
            maxHeight: '100dvh',
            padding: '20px',
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-primary)',
            background: 'var(--desk-texture)',
            overflow: 'hidden',
            gap: '20px',
            boxSizing: 'border-box'
        }}>
            {/* Header & Progress */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ gridColumn: 'span 2', zIndex: 10 }}
            >
                <StageProgress
                    currentStage={currentStage.id}
                    totalStages={GSK_CASE.stages.length}
                    title={currentStage.title}
                    currentView={view}
                    onViewChange={handleViewChange}
                />
            </motion.header>

            {/* Main Investigation Area */}
            <main style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflow: 'hidden',
                minHeight: 0 // CRITICAL: Fix for grid item overflow
            }}>
                <AnimatePresence mode="wait">
                    {view === 'evidence' && (
                        <motion.section
                            key="evidence"
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: -10 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '25px',
                                flex: 1, // Fill available space in main
                                overflowY: 'auto',
                                paddingRight: '15px',
                                paddingBottom: '200px', // Large padding to ensure decision is scrollable
                                minHeight: 0 // CRITICAL: Allow container to be smaller than content
                            }}
                        >
                            <div className="panel" style={{
                                padding: '30px',
                                background: 'linear-gradient(135deg, #18181b 0%, #111114 100%)',
                                borderLeft: '3px solid var(--accent-color)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', opacity: 0.6 }}>
                                    <Briefcase size={16} />
                                    <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px' }}>Incident Summary // {currentStage.title}</span>
                                </div>
                                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#d1d1d6' }}>{currentStage.description}</p>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '25px'
                            }}>
                                {currentStage.clues.map((clue, idx) => (
                                    <motion.div
                                        key={clue.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <EvidenceCard clue={clue} />
                                    </motion.div>
                                ))}
                            </div>

                            {currentStage.decision && !state.decisionsMade[currentStage.decision.id] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: '40px',
                                        marginTop: '40px', // Push down from clues, but not "auto"
                                        border: '1px solid var(--accent-color)',
                                        background: 'rgba(188, 47, 50, 0.05)',
                                        textAlign: 'center',
                                        flexShrink: 0 // Prevent decision panel from collapsing
                                    }}
                                >
                                    <h3 style={{ marginBottom: '30px', fontSize: '1.4rem', fontWeight: 800 }}>{currentStage.decision.question}</h3>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        {currentStage.decision.options.map(option => (
                                            <button
                                                key={option.id}
                                                className="button-primary"
                                                style={{ flex: 1, padding: '20px' }}
                                                onClick={() => {
                                                    playSFX('click');
                                                    makeDecision(currentStage.decision!.id, option.id, option.theoryImpact);
                                                }}
                                            >
                                                {option.text}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStage.decision && state.decisionsMade[currentStage.decision.id] && (
                                <div className="panel" style={{
                                    padding: '25px',
                                    marginTop: 'auto',
                                    background: 'rgba(255,255,255,0.02)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '15px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div className="stamped" style={{ fontSize: '0.6rem', padding: '5px 10px' }}>DECIDED</div>
                                        <p style={{ fontStyle: 'italic', opacity: 0.6, fontSize: '0.9rem' }}>
                                            Operational pivot: "{currentStage.decision.options.find(o => o.id === state.decisionsMade[currentStage.decision!.id])?.text}"
                                        </p>
                                    </div>
                                    <button
                                        className="button-primary"
                                        style={{ background: 'transparent', border: '1px solid var(--accent-color)', fontSize: '0.7rem', padding: '8px 15px' }}
                                        onClick={() => {
                                            playSFX('click');
                                            // Reset the decision for this stage
                                            const { [currentStage.decision!.id]: _, ...remainingDecisions } = state.decisionsMade;
                                            // We need a way to actually reset the score, but for now we'll just allow re-selection
                                            // which will add to the score. Ideally we'd have a better 'recalculate' logic.
                                            makeDecision(currentStage.decision!.id, '', {});
                                        }}
                                    >
                                        CHANGE DECISION
                                    </button>
                                </div>
                            )}
                        </motion.section>
                    )}

                    {view === 'map' && (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{ height: '100%' }}
                        >
                            <InteractiveMap />
                        </motion.div>
                    )}

                    {view === 'board' && (
                        <motion.div
                            key="board"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            style={{ height: '100%' }}
                        >
                            <PatternBoard />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Sidebar (Tactical Panel) */}
            <motion.aside
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    zIndex: 5,
                    height: '100%', // Take full height of grid row
                    overflow: 'hidden', // Contain children
                    minHeight: 0 // Allow shrinking
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '10px',
                    paddingBottom: '20px',
                    minHeight: 0 // CRITICAL: Allow this flex child to scroll
                }}>
                    <div style={{ flexShrink: 0 }}>
                        <TheoryPanel scores={state.theoryScores} />
                    </div>

                    {/* Stage Navigation */}
                    {state.currentStageIndex > 0 && (
                        <div style={{ flexShrink: 0 }}>
                            <button
                                onClick={() => {
                                    playSFX('transition');
                                    regressStage();
                                }}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}
                            >
                                <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> RETURN TO PREVIOUS STAGE
                            </button>
                        </div>
                    )}

                    <div style={{ flex: 1, minHeight: '300px' }}>
                        <Sidebar content={state.notebookContent} />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="button-primary"
                    style={{ width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    onClick={handleAdvance}
                >
                    {state.currentStageIndex < GSK_CASE.stages.length - 1 ? (
                        <>ADVANCE TO STAGE {state.currentStageIndex + 2} <ChevronRight size={18} /></>
                    ) : (
                        <>SUBMIT FINAL DEDUCTION <Briefcase size={18} /></>
                    )}
                </motion.button>
            </motion.aside>
        </div>
    );
};

export default Hub;

