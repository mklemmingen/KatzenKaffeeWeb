import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal';
import MusicPlayerModal from '../MusicPlayerModal';

function Header({ playerRef, onMusicPlayerOpen }) {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isMusicPlayerModalOpen, setMusicPlayerModalOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="App-header">
            <div className="logo-container">
                <img src={"assets/svg/cat-halloween-kitty-svgrepo-com.svg"} className="App-logo" alt="logo" />
                <Link to="/" className="App-logo">KatzenKaffee.de</Link>
            </div>
            <div className="nav-links">
                <Link to="/Cafe" className="App-link">Rein in's Cafe</Link>
                <Link to="/learning-corner" className="App-link">Verantwortung übernehmen</Link>
                <Link to="/Support" className="App-link">Support</Link>
            </div>
            <div className="button-container">
                <div className="dropdown">
                    <button className="App-button music-button" onClick={toggleDropdown}>Musik-Player</button>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <MusicPlayerModal
                                isOpen={isMusicPlayerModalOpen}
                                onRequestClose={() => setMusicPlayerModalOpen(false)}
                                playerRef={playerRef}
                            />
                        </div>
                    )}
                </div>
                <button className="App-button login-button" onClick={() => setLoginModalOpen(true)}>Login</button>
                <button className="App-button register-button" onClick={handleRegisterClick}>Register</button>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setLoginModalOpen(false)} />
        </header>
    );
}

export default Header;