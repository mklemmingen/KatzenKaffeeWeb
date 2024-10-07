import React, { useState } from 'react';
import LoginModal from '../LoginModal';
import MusicPlayerModal from '../MusicPlayerModal';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isMusicPlayerModalOpen, setMusicPlayerModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <header className="App-header">
            <div className="logo-container">
                <img src={"assets/svg/cat-halloween-kitty-svgrepo-com.svg"} className="App-logo" alt="logo" />
                <a href="/" className="App-logo">KatzenKaffee.de</a>
            </div>
            <div className="nav-links">
                <a href="/Cafe" className="App-link">Rein in's Cafe</a>
                <a href="/learning-corner" className="App-link">Verantwortung übernehmen</a>
                <a href="/Support" className="App-link">Support</a>
            </div>
            <div className="button-container">
                <button className="App-button music-button" onClick={() => setMusicPlayerModalOpen(true)}>Musik-Player</button>
                <button className="App-button login-button" onClick={() => setLoginModalOpen(true)}>Login</button>
                <button className="App-button register-button" onClick={handleRegisterClick}>Register</button>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setLoginModalOpen(false)} />
            <MusicPlayerModal isOpen={isMusicPlayerModalOpen} onRequestClose={() => setMusicPlayerModalOpen(false)} />
        </header>
    );
}

export default Header;
