"use client";

import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

function toggleTheme(isHighContrast) {
    const htmlElement = document.documentElement;
    if (isHighContrast) {
        htmlElement.setAttribute('data-theme', 'high-contrast');
    } else {
        htmlElement.removeAttribute('data-theme');
    }
    console.log(`Theme toggled to ${isHighContrast ? 'high contrast' : 'normal'}`);
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Header onToggleTheme={toggleTheme} />
        <ScrollProgress />
        <div id="page-content">
            <main>{children}</main>
        </div>
        <Footer />
        </body>
        </html>
    );
}