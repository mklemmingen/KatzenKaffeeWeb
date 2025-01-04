'use client';

import "../_styles/Header.css";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FaMusic } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { VscTypeHierarchy } from "react-icons/vsc";
import { FaComment } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

// Dynamically import react-youtube to ensure it only loads on the client side
const YouTube =
    dynamic(() =>
        import('react-youtube'), { ssr: false });

function Header() {

    const router = useRouter();
    const playerRef = useRef(null);
    const [isHighContrast, setIsHighContrast] = useState(false);

    const handleToggle = () => {
        setIsHighContrast(!isHighContrast);
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && playerRef.current) {
            playerRef.current.pauseVideo();
            playerRef.current.unMute();
        }
    }, [playerRef]);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isHighContrast) {
            htmlElement.setAttribute('data-theme', 'high-contrast');
        } else {
            htmlElement.removeAttribute('data-theme');
        }
    }, [isHighContrast]);

    const handlePlay = () => {
        if (playerRef.current?.getPlayerState) {
            const state = playerRef.current.getPlayerState();
            if (state !== 1) {
                playerRef.current.playVideo();
            } else {
                playerRef.current.pauseVideo();
            }
        }
        if (playerRef.current?.isMuted && playerRef.current.isMuted()) {
            playerRef.current.unMute();
        } else {
            playerRef.current.mute();
        }
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        playerRef.current.mute(); // Start muted
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="App-header">
                <div className="logo-container">
                    <Image src="/assets/svg/cat-halloween-kitty-svgrepo-com.svg"
                           className="App-logo" alt="logo" onClick={handleLogoClick}
                           width={50} height={50} />
                    <Link href="/" className="App-logo" onClick={handleLogoClick}>
                        KatzenKaffee.de</Link>
                </div>
                <button className="menuToggle" onClick={toggleMenu}>
                  <IoMenu />
                </button>
                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>

                    <div className="button-container">

                        <div className="switch-container">
                            <label className="switch">
                                <input id="contrast-switch" type="checkbox" checked={isHighContrast}
                                       onChange={handleToggle}/>
                                <span className="slider logo-slider">
                                    <MdDarkMode className="slider-icon"/>
                                 </span>
                            </label>
                        </div>

                        <Link href="/comments" className="App-button">
                            <FaComment/></Link>

                        <button className="App-button music-button"
                                onClick={handlePlay}><FaMusic/></button>

                    </div>
                </nav>
                <YouTube
                    videoId="jfKfPfyJRdk"
                    opts={{
                        height: '0',
                        width: '0',
                        playerVars: {
                            autoplay: 1,
                        },
                    }}
                    onReady={onPlayerReady}
                />
        </header>
    );
}

export default Header;