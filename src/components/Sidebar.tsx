"use client";

import React from 'react';
import { Book, Save } from 'lucide-react';
import { useInvestigation } from '../hooks/useInvestigation';
import { useAudio } from '../hooks/useAudio';

interface SidebarProps {
    content: string;
}

const Sidebar: React.FC<SidebarProps> = ({ content }) => {
    const { updateNotebook } = useInvestigation();
    const { playSFX } = useAudio();

    return (
        <div className="panel" style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#fefefa',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '2px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            position: 'relative'
        }}>
            {/* Spiral Binding Overlay */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '10px',
                bottom: '0',
                width: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                padding: '20px 0',
                zIndex: 2,
                pointerEvents: 'none'
            }}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={{
                        width: '20px',
                        height: '6px',
                        background: 'linear-gradient(90deg, #333 0%, #666 50%, #333 100%)',
                        borderRadius: '10px',
                        boxShadow: '0 2px 2px rgba(0,0,0,0.3)'
                    }} />
                ))}
            </div>

            <div style={{
                padding: '15px 15px 15px 45px',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f4f4f0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Book size={16} />
                    <h3 style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 900 }}>Field Notes</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.5 }}>
                    <Save size={12} />
                    <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>LIVE_LOGGING</span>
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                {/* Lined Paper Pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)',
                    backgroundSize: '100% 1.8rem',
                    pointerEvents: 'none'
                }} />

                {/* Red Margin Line */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '15px',
                    bottom: 0,
                    width: '1px',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    pointerEvents: 'none'
                }} />

                <textarea
                    value={content}
                    onFocus={() => playSFX('paper')}
                    onChange={(e) => updateNotebook(e.target.value)}
                    placeholder="Record hypotheses here..."
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#222',
                        padding: '15px 20px 15px 45px',
                        resize: 'none',
                        fontSize: '1rem',
                        lineHeight: '1.8rem',
                        fontFamily: "'Courier New', Courier, monospace",
                        outline: 'none',
                        fontWeight: 600,
                        zIndex: 1
                    }}
                />
            </div>
        </div>
    );
};

export default Sidebar;

