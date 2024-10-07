import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="App-footer">
            <p>© Studis, 2024. We love Cats!</p>
            <div className="nav-links">
                <Link to="/datenschutz" className="App-link">Datenschutz</Link>
                <Link to="/impressum" className="App-link">Impressum</Link>
                <Link to="/support" className="App-link">Support</Link>
            </div>
        </footer>
    );
}

export default Footer;