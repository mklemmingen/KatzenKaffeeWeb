"use client";

import localFont from "next/font/local";
import "./globals.css";
import { useState, useRef, createContext, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CatAnimation from './components/CatAnimation';
import ScrollProgress from './components/ScrollProgress';
import YouTubePlayer from './components/YouTubePlayer';

// Define your fonts
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({ children }) {

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <ScrollProgress />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}