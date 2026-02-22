"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Share2, Scissors, Paperclip, Pin, Plus, Link as LinkIcon, Trash2, Image as ImageIcon } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface Note {
    id: string;
    title: string;
    text: string;
    x: number;
    y: number;
    rotate: number;
    type: 'note' | 'photo' | 'evidence';
    imageUrl?: string;
}

interface Thread {
    id: string;
    from: string;
    to: string;
}

const PatternBoard: React.FC = () => {
    const { playSFX } = useAudio();
    const boardRef = useRef<HTMLDivElement>(null);

    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            title: 'DNA_REPORT',
            text: 'Significant correlation between behavioral markers found in 1978 and 1986 cases.',
            x: 100,
            y: 100,
            rotate: -3,
            type: 'note'
        },
        {
            id: '2',
            title: 'MO_PATTERN',
            text: 'Consistent use of diamond knots; implies nautical background.',
            x: 450,
            y: 150,
            rotate: 2,
            type: 'evidence'
        },
        {
            id: '3',
            title: 'SUSPECT_SKETCH',
            text: 'Composite based on witness descriptions from Davis 1978.',
            x: 200,
            y: 350,
            rotate: -5,
            type: 'photo',
            imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop' // Serious sketch/paper vibe
        }
    ]);

    const [threads, setThreads] = useState<Thread[]>([
        { id: 't1', from: '1', to: '2' },
        { id: 't2', from: '2', to: '3' }
    ]);

    const [linkingFrom, setLinkingFrom] = useState<string | null>(null);

    const addNote = (type: 'note' | 'photo' | 'evidence' = 'note') => {
        playSFX('paper');
        const newNote: Note = {
            id: Date.now().toString(),
            title: type === 'note' ? 'NEW_FRAGMENT' : type === 'photo' ? 'PHOTO_ATTACHMENT' : 'EVIDENCE_TAG',
            text: 'Enter investigation details...',
            x: 100 + Math.random() * 200,
            y: 100 + Math.random() * 200,
            rotate: (Math.random() - 0.5) * 15,
            type
        };
        setNotes(prev => [...prev, newNote]);
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    };

    const deleteNote = (id: string) => {
        playSFX('click');
        setNotes(prev => prev.filter(n => n.id !== id));
        setThreads(prev => prev.filter(t => t.from !== id && t.to !== id));
    };

    const handleLinkClick = (id: string) => {
        playSFX('click');
        if (!linkingFrom) {
            setLinkingFrom(id);
        } else if (linkingFrom === id) {
            setLinkingFrom(null);
        } else {
            const exists = threads.some(t => (t.from === linkingFrom && t.to === id) || (t.from === id && t.to === linkingFrom));
            if (!exists) {
                setThreads(prev => [...prev, { id: `t-${Date.now()}`, from: linkingFrom, to: id }]);
            }
            setLinkingFrom(null);
        }
    };

    return (
        <div className="panel board-frame" style={{
            height: '100%', // Explicit height fix
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            overflow: 'hidden',
            background: '#2d1b0d',
            backgroundImage: `
                url("https://www.transparenttextures.com/patterns/cork-board.png"),
                radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)
            `,
            boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9), 0 20px 80px rgba(0,0,0,0.9)',
            border: '20px solid #140a05',
            position: 'relative',
            borderRadius: '4px'
        }}>
            {/* Header / Toolbar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                zIndex: 1000,
                padding: '12px 20px',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '6px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Share2 size={18} color="var(--accent-color)" />
                    <h3 style={{
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        color: '#fff',
                        letterSpacing: '4px',
                        margin: 0
                    }}>
                        ASSOCIATIVE ANALYSIS // BOARD_01
                    </h3>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => addNote('note')} className="btn-primary-mini" style={{ background: '#bc2f32' }}>
                        <Plus size={14} /> NOTE
                    </button>
                    <button onClick={() => addNote('photo')} className="btn-primary-mini" style={{ background: '#5c4033' }}>
                        <ImageIcon size={14} /> PHOTO
                    </button>
                    <button onClick={() => addNote('evidence')} className="btn-primary-mini" style={{ background: '#2e3d30' }}>
                        <Scissors size={14} /> EVIDENCE
                    </button>
                </div>
            </div>

            <div
                ref={boardRef}
                style={{
                    flex: 1,
                    position: 'relative',
                    zIndex: 1,
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '4px'
                }}
            >
                {/* SVG Thread Layer */}
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                    <defs>
                        <filter id="stringShadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.6" />
                        </filter>
                    </defs>
                    {threads.map(thread => {
                        const fromNote = notes.find(n => n.id === thread.from);
                        const toNote = notes.find(n => n.id === thread.to);
                        if (!fromNote || !toNote) return null;

                        return (
                            <motion.line
                                key={thread.id}
                                x1={fromNote.x + 100}
                                y1={fromNote.y + 10}
                                x2={toNote.x + 100}
                                y2={toNote.y + 10}
                                stroke="#bc2f32"
                                strokeWidth="3"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.8 }}
                                style={{ filter: 'url(#stringShadow)' }}
                            />
                        );
                    })}
                </svg>

                {/* Draggable Fragments */}
                <AnimatePresence>
                    {notes.map((note) => (
                        <motion.div
                            key={note.id}
                            drag
                            dragMomentum={false}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, x: note.x, y: note.y, rotate: note.rotate }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileDrag={{ zIndex: 500, scale: 1.05 }}
                            onDragEnd={(e, info) => {
                                playSFX('paper');
                                updateNote(note.id, { x: note.x + info.offset.x, y: note.y + info.offset.y });
                            }}
                            style={{
                                position: 'absolute',
                                width: note.type === 'photo' ? '220px' : '200px',
                                background: note.type === 'photo' ? '#fff' : note.type === 'evidence' ? '#e0d8c3' : '#fff9e6',
                                padding: note.type === 'photo' ? '12px 12px 40px 12px' : '20px',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)',
                                cursor: 'grab',
                                zIndex: linkingFrom === note.id ? 600 : 20,
                                border: '1px solid rgba(0,0,0,0.1)'
                            }}
                        >
                            {/* The "Pin" */}
                            <div
                                onClick={() => handleLinkClick(note.id)}
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '18px',
                                    height: '18px',
                                    background: linkingFrom === note.id ? '#fff' : 'radial-gradient(circle at 30% 30%, #ff4d4d, #990000)',
                                    borderRadius: '50%',
                                    boxShadow: '0 3px 6px rgba(0,0,0,0.6)',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                    border: linkingFrom === note.id ? '2px solid #bc2f32' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {linkingFrom === note.id && <LinkIcon size={12} color="#bc2f32" />}
                            </div>

                            {note.type === 'photo' ? (
                                <>
                                    <div style={{
                                        width: '100%',
                                        height: '180px',
                                        background: '#222',
                                        backgroundImage: note.imageUrl ? `url(${note.imageUrl})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        marginBottom: '10px'
                                    }} />
                                    <input
                                        value={note.title}
                                        onChange={(e) => updateNote(note.id, { title: e.target.value })}
                                        className="board-input-title"
                                        style={{ textAlign: 'center', color: '#555' }}
                                    />
                                </>
                            ) : (
                                <>
                                    <input
                                        value={note.title}
                                        onChange={(e) => updateNote(note.id, { title: e.target.value })}
                                        className="board-input-title"
                                    />
                                    <textarea
                                        value={note.text}
                                        onChange={(e) => updateNote(note.id, { text: e.target.value })}
                                        className="board-input-text"
                                    />
                                </>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <button onClick={() => deleteNote(note.id)} style={{ opacity: 0.3, background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {notes.length === 0 && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.1,
                        color: '#fff'
                    }}>
                        <Pin size={64} style={{ marginBottom: '20px' }} />
                        <h2 style={{ fontSize: '2rem', letterSpacing: '10px', fontWeight: 900 }}>WORKSPACE CLEAR</h2>
                        <p style={{ letterSpacing: '2px' }}>ADD FRAGMENTS TO BEGIN ANALYSIS</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .btn-primary-mini {
                    border: none;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.2s;
                    box-shadow: 0 4px 0 rgba(0,0,0,0.3);
                }
                .btn-primary-mini:hover {
                    filter: brightness(1.2);
                    transform: translateY(-1px);
                }
                .board-input-title {
                    width: 100%;
                    background: none;
                    border: none;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 0.7rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                    outline: none;
                    color: #2d1b0d;
                }
                .board-input-text {
                    width: 100%;
                    background: none;
                    border: none;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 0.75rem;
                    line-height: 1.4;
                    resize: none;
                    height: 100px;
                    color: #333;
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default PatternBoard;

