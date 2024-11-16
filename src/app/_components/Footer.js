'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "../globals.css";

function Footer() {
    const router = useRouter();

    const scrollToTop = () => {
        if (router.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="App-footer">
            <p>©Marty&Meinhard&Michael, 2024. We love Cats!</p>
            <div className="nav-links">
                <div onClick={scrollToTop}>
                    <Link href="/" className="App-link">Zurück zur Home-Page</Link>
                </div>
                <Link href="/datenschutz" className="App-link">Datenschutz</Link>
                <Link href="/impressum" className="App-link">Impressum</Link>
                <Link href="/support" className="App-link">Support</Link>
                <Link href="/credits" className="App-link">Credits</Link>
            </div>
        </footer>
    );
}

export default Footer;
