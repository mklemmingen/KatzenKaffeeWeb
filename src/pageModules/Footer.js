import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    const scrollToTop = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="App-footer">
            <p>©Marty&Meinhard, 2024. We love Cats!</p>
            <div className="nav-links">
                <Link to="/" className="App-link" onClick={scrollToTop}>Zurück zur Home-Page</Link>
                <Link to="/datenschutz" className="App-link">Datenschutz</Link>
                <Link to="/impressum" className="App-link">Impressum</Link>
                <Link to="/support" className="App-link">Support</Link>
                <Link to="/credits" className="App-link">Credits</Link>
            </div>
        </footer>
    );
}

export default Footer;