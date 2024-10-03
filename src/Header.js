import React from 'react';
import logo from './logo.svg';

function Header() {
    return (
        <header className="App-header">
            <div className="logo-container">
                <img src={logo} className="App-logo" alt="logo" />
                <a href="/" className="App-link">MeinKatzenKaffe.de</a>
            </div>
            <div className="nav-links">
                <a href="/cafe" className="App-link">Rein in's Cafe</a>
                <a href="/music-player" className="App-link">Musik-Player</a>
                <a href="/learning-corner" className="App-link">Die Lern-Ecke: Verantwortung übernehmen</a>
                <a href="/support" className="App-link">Support</a>
            </div>
            <div className="button-container">
                <button className="App-button">Login</button>
                <button className="App-button">Register</button>
            </div>
        </header>
    );
}

export default Header;
