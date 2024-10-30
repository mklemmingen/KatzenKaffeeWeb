'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import "../globals.css";

// Dynamically import react-youtube to ensure it only loads on the client side
const YouTube = dynamic(() => import('react-youtube'), { ssr: false });

function Header({ handleSubmit, onToggleTheme }) {
    const router = useRouter();
    const playerRef = useRef(null);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [randomQuote, setRandomQuote] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && playerRef.current) {
            playerRef.current.pauseVideo();
            playerRef.current.unMute();
        }
    }, [playerRef]);

    useEffect(() => {
        const quotes = [
            "A cat has absolute emotional honesty. - Ernest Hemingway",
            "The smallest feline is a masterpiece. - Leonardo da Vinci",
            "Cats are connoisseurs of comfort. - James Herriot",
            "A meow massages the heart. - Stuart McMillan",
            "Cats choose us; we don't own them. - Kristin Cast",
        ];
        setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const handleToggle = () => {
        setIsHighContrast(!isHighContrast);
        onToggleTheme(!isHighContrast);
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    const handlePlay = () => {
        if (playerRef.current?.getPlayerState) {
            const state = playerRef.current.getPlayerState();
            if (state !== 1) { // 1 is the state for playing
                playerRef.current.playVideo();
            }
        }
    };

    const handlePause = () => {
        if (playerRef.current?.getPlayerState) {
            const state = playerRef.current.getPlayerState();
            if (state === 1) { // 1 is the state for playing
                playerRef.current.pauseVideo();
            }
        }
    };

    const handleMute = () => {
        if (playerRef.current?.isMuted && !playerRef.current.isMuted()) {
            playerRef.current.mute();
        }
    };

    const handleUnmute = () => {
        if (playerRef.current?.isMuted && playerRef.current.isMuted()) {
            playerRef.current.unMute();
        }
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        playerRef.current.mute(); // Start muted
    };

    /*
    Currently removed:
    <div className="welcome-note">
        <p>{randomQuote}</p>
    </div>
     */

    return (
        <header className="App-header">
            <div className="logo-container">
                <Image src="/assets/svg/cat-halloween-kitty-svgrepo-com.svg" className="App-logo" alt="logo" onClick={handleLogoClick} width={50} height={50} />
                <Link href="/" className="App-logo" onClick={handleLogoClick}>KatzenKaffee.de</Link>
            </div>
            <div className="button-container">
                <div>
                    <label htmlFor="contrast-switch">Kontrastmodi</label>
                    <label className="switch">
                        <input id="contrast-switch" type="checkbox" checked={isHighContrast} onChange={handleToggle}/>
                        <span className="slider"></span>
                    </label>
                </div>
                <Link href="/comments" className="App-button">Kommentare</Link>
                <div className="dropdown">
                    <button className="App-button music-button">Musik-Player</button>
                    <div className="dropdown-content">
                        <button onClick={handlePlay}>Play</button>
                        <button onClick={handlePause}>Pause</button>
                        <button onClick={handleMute}>Mute</button>
                        <button onClick={handleUnmute}>Unmute</button>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="App-button login-button">Erfahrungen mit Katzen?</button>
                    <div className="dropdown-content">
                        <form onSubmit={handleSubmit}>
                            <label>
                                <p>Teile hier deine Erfahrung, wenn du willst, und wir zeigen Sie allen Besuchern</p>
                                <input type="text" name="experience"/>
                            </label>
                            <button type="submit">Eingabe Bestätigen</button>
                        </form>
                    </div>
                </div>
            </div>
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