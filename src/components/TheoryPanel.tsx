"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, Waves } from 'lucide-react';
import { TheoryScores } from '../types';

interface TheoryPanelProps {
    scores: TheoryScores;
}

const TheoryPanel: React.FC<TheoryPanelProps> = ({ scores }) => {
    const renderScore = (label: string, value: number, Icon: React.ElementType, color: string) => {
        const displayValue = Math.min(Math.max(value, 0), 100);

        return (
            <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon size={14} color={color} opacity={0.7} />
                        <span style={{
                            fontSize: '0.65rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: 700,
                            opacity: 0.6
                        }}>
                            {label}
                        </span>
                    </div>
                    <span style={{
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        color: color
                    }}>
                        {value}%
                    </span>
                </div>
                {/* Tactical Progress Bar */}
                <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${displayValue}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            height: '100%',
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}44`
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="panel" style={{
            padding: '25px',
            background: 'linear-gradient(180deg, #1a1a1e 0%, #121215 100%)',
            borderRight: '2px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '25px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '15px'
            }}>
                <Activity size={18} color="var(--accent-color)" />
                <h3 style={{
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    letterSpacing: '3px',
                    fontWeight: 900
                }}>
                    Probability Metrics
                </h3>
            </div>

            {renderScore('Single Offender', scores.singleOffender, Target, '#bc2f32')}
            {renderScore('Organized Profile', scores.organized, Activity, '#4a90e2')}
            {renderScore('Local Familiarity', scores.localFamiliarity, Waves, '#f5a623')}
            {renderScore('Skilled Background', scores.skilledBackground, Zap, '#7ed321')}

            <div style={{
                marginTop: '25px',
                padding: '15px',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '4px',
                fontSize: '0.65rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.4',
                borderTop: '1px dotted rgba(255,255,255,0.1)'
            }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 800 }}>[SYSTEM_NOTE]</span> Probability values shift dynamically based on evidence processing and investigator hypothesis selection.
            </div>
        </div>
    );
};

export default TheoryPanel;

