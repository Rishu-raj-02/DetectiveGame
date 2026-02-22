"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Lock, Tag, Info } from 'lucide-react';
import { Clue } from '../types';
import { useInvestigation } from '../hooks/useInvestigation';
import { useAudio } from '../hooks/useAudio';

interface EvidenceCardProps {
    clue: Clue;
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({ clue }) => {
    const { state, unlockClue } = useInvestigation();
    const { playSFX } = useAudio();
    const isDiscovered = state.discoveredClueIds.includes(clue.id);

    const handleUnlock = () => {
        if (!isDiscovered) {
            playSFX('paper');
            unlockClue(clue.id);
        }
    };

    return (
        <motion.div
            whileHover={isDiscovered ? { rotate: -1, scale: 1.02 } : { scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUnlock}
            className="panel"
            style={{
                padding: '0',
                cursor: 'pointer',
                background: isDiscovered ? '#fff' : '#1e1e22',
                color: isDiscovered ? '#1a1a1a' : 'inherit',
                border: isDiscovered ? '20px solid #fff' : '1px solid var(--panel-border)',
                borderBottomWidth: isDiscovered ? '60px' : '1px',
                boxShadow: isDiscovered
                    ? '0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.1)'
                    : 'none',
                transition: 'background 0.3s ease, border 0.3s ease',
                position: 'relative',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Header / ID */}
            <div style={{
                padding: isDiscovered ? '0' : '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: isDiscovered ? 'none' : '1px solid rgba(255,255,255,0.05)',
                marginBottom: isDiscovered ? '10px' : '0'
            }}>
                <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    color: isDiscovered ? 'rgba(0,0,0,0.3)' : 'var(--text-secondary)'
                }}>
                    REF: {clue.id.toUpperCase()}
                </span>
                {isDiscovered && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {clue.tags.map(tag => (
                            <span key={tag} style={{
                                fontSize: '0.55rem',
                                padding: '2px 6px',
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '2px',
                                textTransform: 'uppercase'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div style={{
                padding: isDiscovered ? '5px 0' : '20px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isDiscovered ? 'flex-start' : 'center',
                alignItems: isDiscovered ? 'flex-start' : 'center'
            }}>
                {isDiscovered ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ width: '100%' }}
                    >
                        {/* Forensic Evidence Photo */}
                        <div style={{
                            width: '100%',
                            height: '160px',
                            background: '#111',
                            backgroundImage: `url("https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&auto=format&fit=crop")`, // DNA/Forensic vibe
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '2px',
                            marginBottom: '15px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            filter: 'sepia(0.3) contrast(1.2) brightness(0.8)'
                        }} />

                        <h4 style={{
                            marginBottom: '10px',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            fontWeight: 900,
                            letterSpacing: '-0.5px'
                        }}>
                            {clue.title}
                        </h4>

                        <p style={{
                            fontSize: '0.85rem',
                            lineHeight: '1.5',
                            marginBottom: '15px',
                            opacity: 0.8
                        }}>
                            {clue.observation}
                        </p>

                        <div style={{
                            fontSize: '0.75rem',
                            padding: '10px',
                            backgroundColor: 'rgba(188, 47, 50, 0.05)',
                            borderLeft: '2px solid var(--accent-color)',
                            fontStyle: 'italic',
                            color: '#444'
                        }}>
                            {clue.context}
                        </div>
                    </motion.div>
                ) : (
                    <div style={{ textAlign: 'center', opacity: 0.3 }}>
                        <Lock size={32} style={{ marginBottom: '10px' }} />
                        <div style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>CLASSIFIED EVIDENCE</div>
                    </div>
                )}
            </div>

            {/* Polaroid Footer Label (only if discovered) */}
            {isDiscovered && (
                <div style={{
                    position: 'absolute',
                    bottom: '-45px',
                    left: '0',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    opacity: 0.6,
                    color: '#1a1a1a',
                    padding: '0 10px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    SCENE_LOG_{clue.id.toUpperCase()} // P_CLUSTER
                </div>
            )}
        </motion.div>
    );
};

export default EvidenceCard;

