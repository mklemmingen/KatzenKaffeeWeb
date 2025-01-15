'use client';

import "../_styles/Header.css";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaMusic } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaComment } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

function Header() {
    const router = useRouter();
    const audioRef = useRef(null);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggle = () => setIsHighContrast(!isHighContrast);
    const handleLogoClick = () => router.push('/');

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }, [audioRef]);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isHighContrast) {
            htmlElement.setAttribute('data-theme', 'high-contrast');
        } else {
            htmlElement.removeAttribute('data-theme');
        }
    }, [isHighContrast]);

    const handlePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="App-header">
            <div className="logo-container">
                <Image
                    src="/assets/svg/cat-halloween-kitty-svgrepo-com.svg"
                    className="App-logo"
                    alt="logo"
                    onClick={handleLogoClick}
                    width={50}
                    height={50}
                />
                <Link href="/" className="App-logo" onClick={handleLogoClick}>
                    KatzenKaffee.de
                </Link>
            </div>
            <button className="menuToggle" onClick={toggleMenu}>
                <IoMenu />
            </button>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <div className="button-container">
                    <div className="switch-container">
                        <label className="switch">
                            <input
                                id="contrast-switch"
                                type="checkbox"
                                checked={isHighContrast}
                                onChange={handleToggle}
                            />
                            <span className="slider logo-slider">
                                <MdDarkMode className="slider-icon"/>
                            </span>
                        </label>
                    </div>
                    <Link href="/comments" className="App-button">
                        <FaComment />
                    </Link>
                    <button className="App-button music-button" onClick={handlePlay}>
                        <FaMusic />
                    </button>
                </div>
            </nav>
            <audio ref={audioRef} loop>
                <source src="/1 hour of aesthetic & calm lofi music.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </header>
    );
}

export default Header;