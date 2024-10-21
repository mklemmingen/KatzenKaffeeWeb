"use client";

import localFont from "next/font/local";
import "./globals.css";
import { useState, useRef, createContext, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CatAnimation from './components/CatAnimation';
import ScrollProgress from './components/ScrollProgress';
import YouTubePlayer from './components/YouTubePlayer';

// Define your fonts
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// Context for the music player
export const MusicPlayerContext = createContext();

export default function RootLayout({ children }) {
    const [isMusicPlayerOpen, setMusicPlayerOpen] = useState(false);
    const playerRef = useRef(null);

    const handleMusicPlayerOpen = () => {
        setMusicPlayerOpen(true);
    };

    const handleMusicPlayerClose = () => {
        setMusicPlayerOpen(false);
    };

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.playVideo();
            playerRef.current.unMute();
        }
    }, []);

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MusicPlayerContext.Provider value={{ isMusicPlayerOpen, handleMusicPlayerOpen, handleMusicPlayerClose, playerRef }}>
            <YouTubePlayer videoId="jfKfPfyJRdk" onReady={(player) => (playerRef.current = player)} />
            <Header />
            <ScrollProgress />
            <CatAnimation />
            <main>{children}</main>
            <Footer />
        </MusicPlayerContext.Provider>
        </body>
        </html>
    );
}