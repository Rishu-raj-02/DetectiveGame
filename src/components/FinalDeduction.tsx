"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, UserCheck, Edit3, Send } from 'lucide-react';
import { useInvestigation } from '../hooks/useInvestigation';
import { useAudio } from '../hooks/useAudio';

interface FinalDeductionProps {
    onComplete: (deduction: any) => void;
}

const FinalDeduction: React.FC<FinalDeductionProps> = ({ onComplete }) => {
    const { state } = useInvestigation();
    const { playSFX } = useAudio();
    const [profile, setProfile] = useState('');
    const [reasoning, setReasoning] = useState('');

    const handleSubmit = () => {
        playSFX('stamp');
        onComplete({ profile, reasoning });
    };

    return (
        <div className="deduction-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100dvh',
            padding: '40px 20px 100px 20px', // Extra bottom padding for submission
            backgroundColor: 'var(--bg-color)',
            backgroundImage: `
                radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%),
                url("https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=1600&auto=format&fit=crop")
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
            overflowY: 'auto',
            scrollBehavior: 'smooth'
        }}>
            {/* Cinematic background elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none', background: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")', zIndex: 1 }} />

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="panel"
                style={{
                    maxWidth: '850px',
                    width: '100%',
                    padding: '60px',
                    background: 'rgba(26, 26, 30, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderTop: '4px solid var(--accent-color)',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
                    position: 'relative',
                    zIndex: 2,
                    marginBottom: '50px',
                    flexShrink: 0 // Prevent panel from squishing
                }}
            >
                {/* Stamp/Metadata */}
                <div style={{ position: 'absolute', top: '40px', right: '40px', opacity: 0.1 }}>
                    <Shield size={100} strokeWidth={1} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--accent-color)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={20} color="white" />
                    </div>
                    <div>
                        <h2 style={{ textTransform: 'uppercase', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '4px' }}>
                            Final Post-Operational Assessment
                        </h2>
                        <div style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: 800, letterSpacing: '1px' }}>
                            TOP SECRET // CASE_FILE_GSK_76_FINAL
                        </div>
                    </div>
                </div>

                <p style={{ marginBottom: '40px', fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6', color: '#d1d1d6' }}>
                    Evidence stream processing complete. Statistical correlation and behavioral modeling confirm high-confidence profiles. Submit your final determination for executive review.
                </p>

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <UserCheck size={18} color="var(--accent-color)" />
                        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '2px', color: 'var(--text-secondary)' }}>
                            Selected Offender Profile
                        </label>
                    </div>
                    <select
                        value={profile}
                        onChange={(e) => {
                            playSFX('click');
                            setProfile(e.target.value);
                        }}
                        style={{
                            width: '100%',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            padding: '18px',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="" style={{ background: '#1a1a1e' }}>Select analytical model...</option>
                        <option value="skilled" style={{ background: '#1a1a1e' }}>Skilled / Organized (Tactical/Law Enforcement origin)</option>
                        <option value="unskilled" style={{ background: '#1a1a1e' }}>Unskilled / Disorganized (Low-discipline opportunist)</option>
                        <option value="mobile" style={{ background: '#1a1a1e' }}>Mobile / Intelligent (Highly adaptable nomad profile)</option>
                    </select>
                </div>

                <div style={{ marginBottom: '50px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <Edit3 size={18} color="var(--accent-color)" />
                        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '2px', color: 'var(--text-secondary)' }}>
                            Analytical Justification
                        </label>
                    </div>
                    <textarea
                        value={reasoning}
                        onChange={(e) => setReasoning(e.target.value)}
                        placeholder="Detail behavioral markers, geographic anomalies, and forensic links..."
                        style={{
                            width: '100%',
                            height: '180px',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            padding: '20px',
                            borderRadius: '4px',
                            resize: 'none',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            fontFamily: "'Courier New', Courier, monospace",
                            outline: 'none'
                        }}
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="button-primary"
                    onClick={handleSubmit}
                    disabled={!profile || !reasoning}
                    style={{
                        width: '100%',
                        padding: '25px',
                        fontSize: '1.1rem',
                        opacity: (!profile || !reasoning) ? 0.3 : 1,
                        cursor: (!profile || !reasoning) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px'
                    }}
                >
                    <Send size={20} /> AUTHORIZE FINAL FILING
                </motion.button>
            </motion.div>
        </div>
    );
};

export default FinalDeduction;

