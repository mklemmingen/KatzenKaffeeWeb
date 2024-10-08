import React, { useState, useRef, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pageModules/Header';
import Footer from './pageModules/Footer';
import Support from './pages/Support';
import Home from './pages/Home';
import Register from './pages/Register';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import ErrorPage from './pages/ErrorPage';
import YouTubePlayer from './YoutubePlayer';
import './App.css';
import useHandleVerantwortungClick from './hooks/useHandleVerantwortungclick';
import Cafe from "./pages/Cafe";

// context for the music player and overlay
export const MusicPlayerContext = createContext();
export const OverlayContext = createContext({
    isOverlayOpen: false,
    setOverlayOpen: () => {}
});

const AppContent = () => {
    return (
        <div className="App">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/datenschutz" element={<Datenschutz />} />
                    <Route path="/impressum" element={<Impressum />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/cafe" element={<Cafe />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

const App = () => {
    const [isMusicPlayerOpen, setMusicPlayerOpen] = useState(false);
    const playerRef = useRef(null);

    const handleMusicPlayerOpen = () => {
        setMusicPlayerOpen(true);
    };

    const handleMusicPlayerClose = () => {
        setMusicPlayerOpen(false);
    };

    return (
        <Router>
            <MusicPlayerContext.Provider value={{ isMusicPlayerOpen, handleMusicPlayerOpen,
                handleMusicPlayerClose, playerRef }}>
                <OverlayContext.Provider value={{useHandleVerantwortungClick}}>
                    <YouTubePlayer videoId="jfKfPfyJRdk" onReady={(player) => (playerRef.current = player)} />
                    <AppContent />
                </OverlayContext.Provider>
            </MusicPlayerContext.Provider>
        </Router>
    );
};

export default App;
