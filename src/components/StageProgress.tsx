"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Map as MapIcon, Share2, FileText, Cpu } from 'lucide-react';

interface StageProgressProps {
    currentStage: number;
    totalStages: number;
    title: string;
    currentView: 'evidence' | 'map' | 'board';
    onViewChange: (view: 'evidence' | 'map' | 'board') => void;
}

const StageProgress: React.FC<StageProgressProps> = ({ currentStage, totalStages, title, currentView, onViewChange }) => {
    const progress = (currentStage / totalStages) * 100;

    const navItems = [
        { id: 'evidence', label: 'EVIDENCE_FILE', icon: FileText, key: 'E' },
        { id: 'map', label: 'GEOSPATIAL_MAP', icon: MapIcon, key: 'M' },
        { id: 'board', label: 'LINKAGE_ANALYSIS', icon: Share2, key: 'L' }
    ] as const;

    return (
        <div className="panel" style={{
            padding: '20px 30px',
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            background: 'linear-gradient(90deg, #151518 0%, #1e1e22 100%)',
            borderBottom: '2px solid rgba(255,255,255,0.05)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            {/* Stage Indicator (Radio Style) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px solid var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(188, 47, 50, 0.1)',
                    boxShadow: '0 0 15px var(--accent-glow)'
                }}>
                    <Radio size={24} color="var(--accent-color)" />
                </div>
                <div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, fontWeight: 800 }}>Tactical Progress</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '1px' }}>
                        STAGE_{currentStage.toString().padStart(2, '0')} // {title}
                    </div>
                </div>
            </div>

            {/* Central Progress Bar Container */}
            <div style={{ flex: 1, padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Cpu size={12} color="var(--accent-color)" />
                        <span style={{ fontSize: '0.6rem', letterSpacing: '1px', opacity: 0.5 }}>COMPLETION_METRIC</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-color)' }}>{Math.round(progress)}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            height: '100%',
                            backgroundColor: 'var(--accent-color)',
                            boxShadow: '0 0 10px var(--accent-glow)'
                        }}
                    />
                </div>
            </div>

            {/* Tactical Navigation */}
            <nav style={{ display: 'flex', gap: '10px' }}>
                {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    const Icon = item.icon;
                    return (
                        <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onViewChange(item.id)}
                            style={{
                                background: isActive ? 'var(--accent-color)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid',
                                borderColor: isActive ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
                                color: isActive ? '#fff' : 'var(--text-secondary)',
                                padding: '10px 20px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Icon size={16} />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>{item.label}</div>
                                <div style={{ fontSize: '0.55rem', opacity: 0.5 }}>CMD: [{item.key}]</div>
                            </div>
                        </motion.button>
                    );
                })}
            </nav>
        </div>
    );
};

export default StageProgress;

