import React, { useState, useRef, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pageModules/Header';
import Footer from './pageModules/Footer';
import Support from './pages/Support';
import Home from './pages/Home';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import ErrorPage from './pages/ErrorPage';
import YouTubePlayer from './YoutubePlayer';
import './App.css';

// context for the music player and overlay
export const MusicPlayerContext = createContext();
export const OverlayContext = createContext({
    isOverlayOpen: false,
    setOverlayOpen: () => {}
});

const AppContent = () => {
    const [experiences, setExperiences] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const experience = event.target.elements.experience.value;

        fetch('/api/submitExperience', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ experience }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setExperiences(prevExperiences => [...prevExperiences, experience]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div className="App">
            <Header className="header" handleSubmit={handleSubmit} />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home experiences={experiences} setExperiences={setExperiences}
                                                   handleSubmit={handleSubmit} />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/datenschutz" element={<Datenschutz />} />
                    <Route path="/impressum" element={<Impressum />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
            <Footer className="footer" />
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

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.playVideo();
            playerRef.current.unMute();
        }
    }, []);

    return (
        <Router>
            <MusicPlayerContext.Provider value={{ isMusicPlayerOpen, handleMusicPlayerOpen,
                handleMusicPlayerClose, playerRef }}>
                <YouTubePlayer videoId="jfKfPfyJRdk" onReady={(player) => (playerRef.current = player)} />
                <AppContent />
            </MusicPlayerContext.Provider>
        </Router>
    );
};

export default App;
