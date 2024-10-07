import React, { useState, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './pageModules/Header';
import Footer from './pageModules/Footer';
import Support from './pages/Support';
import Cafe from './pages/Cafe';
import LearningCorner from './pages/LearningCorner';
import Home from './pages/Home';
import Register from './pages/Register';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import ErrorPage from './pages/ErrorPage';
import MusicPlayerModal from './MusicPlayerModal';
import YouTubePlayer from './YoutubePlayer';
import './App.css';

// context for the music player
const MusicPlayerContext = createContext();

const AppContent = () => {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/Cafe';
    const { isMusicPlayerOpen, handleMusicPlayerOpen, handleMusicPlayerClose, playerRef } = useContext(MusicPlayerContext);

    return (
        <div className="App">
            {!hideHeaderFooter && <Header playerRef={playerRef} onMusicPlayerOpen={handleMusicPlayerOpen} />}
            <div className="content">
                <Routes>
                    <Route path="/support" element={<Support />} />
                    <Route path="/learning-corner" element={<LearningCorner />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/datenschutz" element={<Datenschutz />} />
                    <Route path="/impressum" element={<Impressum />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/Cafe" element={<Cafe />} />
                </Routes>
            </div>
            {!hideHeaderFooter && <Footer />}
            <MusicPlayerModal
                isOpen={isMusicPlayerOpen}
                onRequestClose={handleMusicPlayerClose}
                playerRef={playerRef}
            />
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
        <MusicPlayerContext.Provider value={{ isMusicPlayerOpen, handleMusicPlayerOpen, handleMusicPlayerClose, playerRef }}>
            <Router>
                <YouTubePlayer videoId="jfKfPfyJRdk" onReady={(player) => (playerRef.current = player)} />
                <AppContent />
            </Router>
        </MusicPlayerContext.Provider>
    );
};

export default App;
