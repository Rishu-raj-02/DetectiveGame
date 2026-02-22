"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight, Hash } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface CaseBriefingProps {
    onComplete: () => void;
}

const CaseBriefing: React.FC<CaseBriefingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const { playSFX } = useAudio();

    const briefingText = [
        "Welcome to the Cold Case Task Force. You are tasked with analyzing one of the most complex serial crime cases in California history: the Golden State Killer.",
        "For decades, this offender eluded capture, crossing jurisdictional lines and leaving behind a trail of terror that spanned multiple regions.",
        "Your objective is not just to read reports, but to analyze the behavioral, geographic, and forensic patterns to build a comprehensive offender profile.",
        "As you discover clues, your theory scores will shift. Decisions you make will influence the investigation's focus. Methodical reasoning is your primary tool."
    ];

    const nextStep = () => {
        playSFX('paper');
        if (step < briefingText.length - 1) {
            setStep(step + 1);
        } else {
            playSFX('transition');
            onComplete();
        }
    };

    return (
        <div className="briefing-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '40px',
            background: 'var(--bg-color)',
            position: 'relative'
        }}>
            {/* Cinematic Background elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none', background: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }} />

            <motion.div
                initial={{ rotateX: 20, opacity: 0, scale: 0.9 }}
                animate={{ rotateX: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="panel"
                style={{
                    maxWidth: '800px',
                    width: '100%',
                    padding: '60px',
                    position: 'relative',
                    borderTop: '2px solid var(--accent-color)',
                    background: '#1a1a1e',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
                }}
            >
                {/* File Metadata Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '40px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    paddingBottom: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={18} color="var(--accent-color)" />
                        <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                            DOSSIER_ID: GSK_76_OMEGA
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.4 }}>RESTRICTED ACCESS</span>
                        <Hash size={14} color="var(--text-secondary)" opacity={0.4} />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 style={{
                            marginBottom: '10px',
                            fontSize: '0.9rem',
                            letterSpacing: '5px',
                            textTransform: 'uppercase',
                            color: 'var(--accent-color)'
                        }}>
                            Operational Briefing
                        </h2>

                        <div style={{ marginBottom: '40px', fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                            TOP SECRET // NOFORN
                        </div>

                        <p style={{
                            fontSize: '1.3rem',
                            lineHeight: '1.7',
                            minHeight: '180px',
                            fontFamily: "'Courier New', Courier, monospace",
                            color: '#d1d1d6',
                            letterSpacing: '-0.5px'
                        }}>
                            {briefingText[step]}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {step === briefingText.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="stamped"
                        style={{ position: 'absolute', top: '100px', right: '100px' }}
                    >
                        APPROVED
                    </motion.div>
                )}

                <div style={{
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '30px'
                }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '1px' }}>
                        SECTION {step + 1} // {briefingText.length}
                    </div>

                    <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="button-primary"
                        onClick={nextStep}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        {step === briefingText.length - 1 ? "INITIALIZE FIELD HUB" : "DECODE NEXT SECTION"}
                        <ChevronRight size={18} />
                    </motion.button>
                </div>
            </motion.div>

            {/* Bottom Info */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '40px', opacity: 0.2 }}>
                <div style={{ fontSize: '0.65rem' }}>AUTHORIZED: TASK_FORCE_16</div>
                <div style={{ fontSize: '0.65rem' }}>TIMESTAMP: 19:44:02_UTC</div>
                <div style={{ fontSize: '0.65rem' }}>VULNERABILITY: NONE</div>
            </div>
        </div>
    );
};

export default CaseBriefing;

