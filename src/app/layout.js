"use client";

import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Header />
        <ScrollProgress />
        <div id="page-content">
            <main>{children}</main>
        </div>
        <Footer />
        </body>
        </html>
    );
}