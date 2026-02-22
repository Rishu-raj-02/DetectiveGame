"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Real-world crime data often needs high-tension procedural fallbacks
class SynthEngine {
    private ctx: AudioContext | null = null;
    private ambientNodes: AudioNode[] = [];
    private isPlayingAmbient = false;

    private getCtx() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.ctx;
    }

    // High Tension Procedural BGM
    startThrillingAmbient() {
        if (this.isPlayingAmbient) return;
        const ctx = this.getCtx();
        this.isPlayingAmbient = true;

        // 1. Cinematic Low Pad (Dark, moody)
        const pad = ctx.createOscillator();
        const padGain = ctx.createGain();
        pad.type = 'sawtooth';
        pad.frequency.setValueAtTime(55, ctx.currentTime); // Low A

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        filter.Q.value = 5;

        padGain.gain.setValueAtTime(0, ctx.currentTime);
        padGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 4);

        pad.connect(filter);
        filter.connect(padGain);
        padGain.connect(ctx.destination);
        pad.start();
        this.ambientNodes.push(pad, padGain, filter);

        // 2. Pulsing Heartbeat (The "Thrilling" element)
        const createHeartbeat = (time: number) => {
            if (!this.isPlayingAmbient) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(60, time);
            osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.1);

            gain.gain.setValueAtTime(0.1, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + 0.1);

            // Double beat
            const secondBeat = time + 0.15;
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.frequency.setValueAtTime(50, secondBeat);
            osc2.frequency.exponentialRampToValueAtTime(0.01, secondBeat + 0.1);

            gain2.gain.setValueAtTime(0.08, secondBeat);
            gain2.gain.exponentialRampToValueAtTime(0.01, secondBeat + 0.1);

            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(secondBeat);
            osc2.stop(secondBeat + 0.1);

            // Schedule next beat
            setTimeout(() => {
                if (this.isPlayingAmbient) createHeartbeat(ctx.currentTime + 1.2);
            }, 1200);
        };
        createHeartbeat(ctx.currentTime);
    }

    stopAmbient() {
        this.isPlayingAmbient = false;
        this.ambientNodes.forEach(node => {
            try { (node as any).stop?.(); } catch (e) { }
            try { node.disconnect(); } catch (e) { }
        });
        this.ambientNodes = [];
    }

    // SFX Methods
    playClick() {
        const ctx = this.getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }

    playPaper() {
        const ctx = this.getCtx();
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
    }

    playStamp() {
        const ctx = this.getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    }

    playTransition() {
        const ctx = this.getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(40, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
}

interface AudioContextType {
    isMuted: boolean;
    isPlaying: boolean;
    toggleMusic: () => void;
    playSFX: (name: string) => void;
    startMusic: () => void;
}

const AudioContextInstance = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const musicRef = useRef<HTMLAudioElement | null>(null);
    const spriteRef = useRef<HTMLAudioElement | null>(null);
    const synthRef = useRef<SynthEngine>(new SynthEngine());

    // SFX Sprite mapping from sprite.json
    const SFX_SPRITE: { [key: string]: [number, number] } = {
        click: [85000, 183],
        paper: [216000, 313],
        stamp: [169000, 268],
        transition: [242000, 1061]
    };

    useEffect(() => {
        // Thrilling High-Stakes BGM
        const music = new Audio('/assets/audio/thriller_bgm.mp3');
        music.loop = true;
        music.volume = 0.4;
        musicRef.current = music;

        // Sync local isPlaying state with audio element
        const playHandler = () => setIsPlaying(true);
        const pauseHandler = () => setIsPlaying(false);

        music.addEventListener('play', playHandler);
        music.addEventListener('pause', pauseHandler);

        const sprite = new Audio('/assets/audio/sprite.mp3');
        spriteRef.current = sprite;

        return () => {
            music.pause();
            music.removeEventListener('play', playHandler);
            music.removeEventListener('pause', pauseHandler);
            synthRef.current.stopAmbient();
        };
    }, []);

    const startMusic = () => {
        if (!musicRef.current) return;
        musicRef.current.play().catch(() => {
            synthRef.current.startThrillingAmbient();
        });
        setIsMuted(false);
        setIsPlaying(true);
    };

    const toggleMusic = () => {
        if (!musicRef.current) return;

        if (isMuted || !isPlaying) {
            startMusic();
        } else {
            musicRef.current.pause();
            synthRef.current.stopAmbient();
            setIsMuted(true);
            setIsPlaying(false);
        }
    };

    const playSFX = (name: string) => {
        const spriteInfo = SFX_SPRITE[name];
        if (spriteInfo && spriteRef.current) {
            const [start, duration] = spriteInfo;
            const clip = spriteRef.current.cloneNode() as HTMLAudioElement;
            clip.currentTime = start / 1000;
            clip.play().catch(() => {
                // Fallback to synth SFX
                if (name === 'click') synthRef.current.playClick();
                if (name === 'paper') synthRef.current.playPaper();
                if (name === 'stamp') synthRef.current.playStamp();
                if (name === 'transition') synthRef.current.playTransition();
            });
            setTimeout(() => clip.pause(), duration);
        } else {
            // Immediate synth fallback
            if (name === 'click') synthRef.current.playClick();
            if (name === 'paper') synthRef.current.playPaper();
            if (name === 'stamp') synthRef.current.playStamp();
            if (name === 'transition') synthRef.current.playTransition();
        }
    };

    return (
        <AudioContextInstance.Provider value={{ isMuted, isPlaying, toggleMusic, playSFX, startMusic }}>
            {children}
        </AudioContextInstance.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContextInstance);
    if (!context) throw new Error('useAudio must be used within AudioProvider');
    return context;
};
