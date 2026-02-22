"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Music, Volume2, VolumeX, Eye } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface LandingScreenProps {
    onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
    const { isPlaying, toggleMusic, playSFX, startMusic } = useAudio();

    // Browser auto-play policy workaround: start music on first global interaction
    React.useEffect(() => {
        const handleFirstInteraction = () => {
            if (!isPlaying) {
                startMusic();
            }
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('keydown', handleFirstInteraction);

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
        };
    }, [isPlaying, startMusic]);

    const handleStart = () => {
        playSFX('transition');
        startMusic();
        onStart();
    };

    return (
        <div className="landing-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#050507',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Cinematic Overlays: CRT Scanlines & Grain */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
                    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
                    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
                `,
                backgroundSize: '100% 4px, 3px 100%',
                pointerEvents: 'none',
                zIndex: 4,
                opacity: 0.15
            }} />

            <motion.div
                animate={{ opacity: [0.1, 0.15, 0.12] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
                    opacity: 0.1,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                    zIndex: 3
                }}
            />

            {/* Background Image: Forensic/Dark Scene */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2000&auto=format&fit=crop")`, // Dark archival/desk vibe
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(1) brightness(0.3)',
                zIndex: 0
            }} />

            {/* Blood Spatter Deco */}
            <div style={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle at center, rgba(188, 47, 50, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 1
            }} />

            {/* Audio Toggle */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={toggleMusic}
                style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </motion.button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ zIndex: 1 }}
            >
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Shield size={48} color="var(--accent-color)" strokeWidth={1.5} />
                </div>

                <motion.h1
                    initial={{ letterSpacing: '20px', opacity: 0 }}
                    animate={{ letterSpacing: '4px', opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        fontSize: 'clamp(2rem, 8vw, 5rem)',
                        fontWeight: '900',
                        color: 'var(--text-primary)',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        lineHeight: 1
                    }}
                >
                    GSK <span style={{ color: 'var(--accent-color)' }}>PROJECT</span>
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1.2 }}
                    style={{
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
                        margin: '0 auto 20px auto',
                        maxWidth: '400px'
                    }}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        marginBottom: '50px',
                        fontStyle: 'italic',
                        letterSpacing: '0.5px'
                    }}
                >
                    "The archives hold the secrets. You hold the reasoning."
                </motion.p>

                <motion.button
                    className="button-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    onClick={handleStart}
                    onMouseEnter={() => playSFX('click')}
                    style={{ fontSize: '1.2rem', padding: '18px 50px' }}
                >
                    INITIATE CASE FILE
                </motion.button>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 2.5 }}
                    style={{
                        marginTop: '80px',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    <Eye size={14} /> CLASSIFIED // LEVEL 4 CLEARANCE REQUIRED
                </motion.div>
            </motion.div>

            {/* Corner Decorative Elements */}
            <div style={{ position: 'absolute', bottom: '40px', left: '40px', opacity: 0.1, textAlign: 'left', fontSize: '0.7rem' }}>
                BATCH_ID: 760-44J<br />
                DOC_REF: SACRAMENTO_FILES<br />
                STATUS: UNRESOLVED
            </div>
            <div style={{ position: 'absolute', top: '40px', left: '40px', opacity: 0.1, textAlign: 'left' }}>
                <Shield size={24} />
            </div>
        </div >
    );
};

export default LandingScreen;

