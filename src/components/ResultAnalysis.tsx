"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, RefreshCw, BarChart3, Info, CheckCircle } from 'lucide-react';
import { useInvestigation } from '../hooks/useInvestigation';
import { useAudio } from '../hooks/useAudio';

interface ResultAnalysisProps {
    deduction: any;
    onRestart: () => void;
}

const ResultAnalysis: React.FC<ResultAnalysisProps> = ({ deduction, onRestart }) => {
    const { state } = useInvestigation();
    const { playSFX } = useAudio();

    // Calculate accuracy based on key findings (GSK was indeed skilled and organized)
    const accuracy = Math.min(100, Math.max(0,
        (state.theoryScores.organized > 40 ? 40 : state.theoryScores.organized) +
        (state.theoryScores.skilledBackground > 40 ? 60 : state.theoryScores.skilledBackground)
    ));

    return (
        <div className="results-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 20px 100px 20px',
            height: '100dvh',
            backgroundColor: 'var(--bg-color)',
            backgroundImage: `
                radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,1) 100%),
                url("https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop")
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
            overflowY: 'auto'
        }}>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="panel"
                style={{
                    maxWidth: '1000px',
                    width: '100%',
                    padding: '80px',
                    background: 'rgba(26, 26, 30, 0.98)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 60px 120px rgba(0,0,0,0.9)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    position: 'relative',
                    zIndex: 2,
                    marginBottom: '50px',
                    flexShrink: 0 // Prevent panel from squishing
                }}
            >
                {/* Result Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                    >
                        <Award size={64} color="var(--accent-color)" />
                    </motion.div>
                    <h1 style={{ marginBottom: '10px', fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}>
                        INVESTIGATION <span style={{ color: 'var(--accent-color)' }}>CONCLUDED</span>
                    </h1>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '8px', textTransform: 'uppercase' }}>
                        Final Post-Operational Analysis // Sacramento_Archive
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '80px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '40px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                            <BarChart3 size={20} color="var(--accent-color)" />
                            <h3 style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '2px' }}>
                                Clinical Reasoning Summary
                            </h3>
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '5px' }}>OFFENDER_PROFILE_MODEL:</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                                {deduction.profile === 'skilled' ? 'SKILLED_ORGANIZED_SPEC' : deduction.profile.toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '10px' }}>JUSTIFICATION_LOG:</div>
                            <p style={{ fontSize: '1rem', opacity: 0.8, fontStyle: 'italic', lineHeight: '1.7', fontFamily: "'Courier New', Courier, monospace", color: '#d1d1d6' }}>
                                "{deduction.reasoning}"
                            </p>
                        </div>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        background: 'linear-gradient(180deg, #151518 0%, #0c0c0e 100%)',
                        padding: '50px',
                        borderRadius: '4px',
                        border: '2px solid rgba(188, 47, 50, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px', letterSpacing: '2px' }}>DETECTIVE ACCURACY RATING</div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--accent-color)', lineHeight: 1 }}
                        >
                            {accuracy}%
                        </motion.div>
                        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                            <p style={{ fontSize: '0.8rem', opacity: 0.5, lineHeight: '1.5' }}>
                                Rating derived from cross-correlation of behavioral markers and forensic evidence alignment.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '60px', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                        <Info size={20} color="var(--accent-color)" />
                        <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 900, letterSpacing: '2px' }}>
                            Case Resolution: Historical Fact vs. Analysis
                        </h3>
                    </div>
                    <div style={{ color: '#d1d1d6', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        <p style={{ marginBottom: '20px' }}>
                            The Golden State Killer was identified as <strong style={{ color: '#fff' }}>Joseph James DeAngelo</strong> in 2018.
                            The case was resolved through pioneering forensic genealogy analysis, over 40 years after the initial crimes.
                        </p>
                        <p>
                            DeAngelo was a <strong style={{ color: '#fff' }}>skilled offender</strong> with a deep background in <strong style={{ color: '#fff' }}>law enforcement</strong>.
                            Your investigation {accuracy > 70 ? 'perfectly captured' : 'correctly identified'} the tactical precision and behavioral discipline that
                            allowed him to evade capture for decades.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="button-primary"
                        onClick={() => {
                            playSFX('transition');
                            onRestart();
                        }}
                        style={{ padding: '20px 60px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '15px' }}
                    >
                        <RefreshCw size={20} /> INITIATE NEW DATA STREAM
                    </motion.button>
                </div>
            </motion.div>

            {/* Final Background Quote & Credits */}
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.3 }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px' }}>
                    The evidence never forgets // Sacramento Cold Case Unit
                </div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-color)', fontWeight: 700 }}>
                    Developed by Aditya Raj & Akhil Thakur
                </div>
            </div>
        </div>
    );
};

export default ResultAnalysis;

