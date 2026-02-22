"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Crosshair, X, FileText, Calendar, Users } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { crimes, Crime } from '../data/crimes';

const InteractiveMap: React.FC = () => {
    const { playSFX } = useAudio();
    const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);

    const handlePinClick = (crime: Crime) => {
        playSFX('click');
        setSelectedCrime(crime);
    };

    return (
        <div className="panel" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            overflow: 'hidden',
            background: '#d4c4a8', // Parchment base
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2), 0 20px 50px rgba(0,0,0,0.5)',
            border: 'none',
            position: 'relative'
        }}>
            {/* Map Texture Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-map.png")',
                opacity: 0.6,
                pointerEvents: 'none'
            }} />

            {/* Burnt Edges Effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                boxShadow: 'inset 0 0 100px #3d2b1f',
                pointerEvents: 'none',
                opacity: 0.6,
                zIndex: 2
            }} />

            {/* Coffee Stain Effect */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '15%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle at center, rgba(92, 64, 51, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                zIndex: 1,
                border: '2px solid rgba(92, 64, 51, 0.05)'
            }} />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                zIndex: 1,
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                paddingBottom: '15px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Navigation size={18} color="#5c4033" />
                    <h3 style={{
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        fontWeight: 900,
                        color: '#3d2b1f',
                        letterSpacing: '3px'
                    }}>
                        Geospatial Archive // HISTORICAL_DATA
                    </h3>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#5c4033', fontWeight: 700, opacity: 0.6 }}>
                    GRID_REF: CALIFORNIA_DISTRICT_1978_1986
                </div>
            </div>

            <div style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '2px',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
            }}>
                {/* SVG Map of California (Stylized Sketch) */}
                <svg width="100%" height="100%" viewBox="0 0 400 600" style={{ opacity: 0.3 }}>
                    <path
                        d="M150 50 L180 80 L190 150 L220 200 L250 300 L260 400 L240 500 L180 550 L100 500 L80 400 L70 300 L80 150 L110 80 Z"
                        fill="none"
                        stroke="#5c4033"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                    />
                    <text x="140" y="100" fontSize="12" fill="#5c4033" fontWeight="bold">SACRAMENTO</text>
                    <text x="110" y="250" fontSize="12" fill="#5c4033" fontWeight="bold">SAN FRANCISCO</text>
                    <text x="180" y="450" fontSize="12" fill="#5c4033" fontWeight="bold">LOS ANGELES</text>
                </svg>

                {/* Real Case Markers */}
                {crimes.map((crime, i) => (
                    <motion.div
                        key={crime.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        style={{ position: 'absolute', top: crime.coordinates.y, left: crime.coordinates.x, textAlign: 'center', cursor: 'pointer' }}
                        onClick={() => handlePinClick(crime)}
                    >
                        <MapPin
                            size={selectedCrime?.id === crime.id ? 30 : 24}
                            color={selectedCrime?.id === crime.id ? "var(--accent-color)" : "#7a5230"}
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                        />
                        <div style={{
                            fontSize: '0.45rem',
                            color: '#3d2b1f',
                            fontWeight: 900,
                            marginTop: '2px',
                            textTransform: 'uppercase',
                            background: 'rgba(255,255,255,0.7)',
                            padding: '1px 3px',
                            borderRadius: '2px',
                            maxWidth: '70px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {crime.city}
                        </div>
                    </motion.div>
                ))}

                {/* Case Detail Overlay */}
                <AnimatePresence>
                    {selectedCrime && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: '320px',
                                background: '#f5efde', // Manila folder color
                                boxShadow: '-10px 0 30px rgba(0,0,0,0.3)',
                                padding: '30px',
                                borderLeft: '3px solid #7a5230',
                                zIndex: 10,
                                overflowY: 'auto'
                            }}
                        >
                            <button
                                onClick={() => setSelectedCrime(null)}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#7a5230'
                                }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ marginBottom: '25px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '15px' }}>
                                <h4 style={{ color: '#3d2b1f', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
                                    Case File #{selectedCrime.id}
                                </h4>
                                <div style={{ fontSize: '0.7rem', color: '#7a5230', opacity: 0.7 }}>PROCESSED_ON: 2026_02_21</div>
                            </div>

                            <div style={{ display: 'grid', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '15px' }}>
                                    <Calendar size={16} color="#7a5230" style={{ marginTop: '3px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#7a5230', textTransform: 'uppercase' }}>Date of Occurrence</div>
                                        <div style={{ fontSize: '0.9rem', color: '#3d2b1f', fontFamily: 'serif' }}>{selectedCrime.date}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'start', gap: '15px' }}>
                                    <Users size={16} color="#7a5230" style={{ marginTop: '3px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#7a5230', textTransform: 'uppercase' }}>Identified Victims</div>
                                        <div style={{ fontSize: '0.9rem', color: '#3d2b1f', fontFamily: 'serif' }}>{selectedCrime.victims}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'start', gap: '15px' }}>
                                    <MapPin size={16} color="#7a5230" style={{ marginTop: '3px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#7a5230', textTransform: 'uppercase' }}>Location Details</div>
                                        <div style={{ fontSize: '0.9rem', color: '#3d2b1f', fontFamily: 'serif' }}>{selectedCrime.location}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'start', gap: '15px' }}>
                                    <FileText size={16} color="#7a5230" style={{ marginTop: '3px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#7a5230', textTransform: 'uppercase' }}>Evidence & Clues</div>
                                        <div style={{ fontSize: '0.85rem', color: '#3d2b1f', fontFamily: 'serif', lineHeight: 1.5 }}>
                                            {selectedCrime.details}
                                        </div>
                                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                            {selectedCrime.clues.map((clue, i) => (
                                                <span key={i} style={{
                                                    fontSize: '0.6rem',
                                                    background: '#e8dfc7',
                                                    padding: '2px 6px',
                                                    borderRadius: '3px',
                                                    border: '1px solid #7a5230',
                                                    color: '#7a5230'
                                                }}>
                                                    {clue}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '40px',
                                padding: '15px',
                                background: 'rgba(0,0,0,0.05)',
                                border: '1px dashed #7a5230',
                                fontSize: '0.65rem',
                                color: '#7a5230'
                            }}>
                                <strong>REACTION_ADVISORY:</strong> Perpetrator matches EAR/ONS MO profile. Heightened aggression noted in later cases.
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HUD Overlay */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', textAlign: 'right', opacity: 0.5 }}>
                    <Crosshair size={40} color="#5c4033" strokeWidth={1} />
                </div>
            </div>

            <div style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#5c4033', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-color)', borderRadius: '50%' }} /> High Activity
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#5c4033', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: 'rgba(92, 64, 51, 0.4)', borderRadius: '50%' }} /> Verified Record
                    </div>
                </div>
                <div style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '0.7rem',
                    color: '#5c4033',
                    opacity: 0.6
                }}>
                    REF_MAP_CALIFORNIA // COLD_CASE_ARCHIVE
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;

