import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MusicPlayerContext } from '../App';

function Header({ handleSubmit, onToggleTheme }) { // Accept handleSubmit as a prop
    const navigate = useNavigate();
    const { handleMusicPlayerOpen, handleMusicPlayerClose, playerRef } = useContext(MusicPlayerContext);
    const [isHighContrast, setIsHighContrast] = useState(false);

    useEffect(() => {
        if (playerRef && playerRef.current && playerRef.current.pauseVideo && playerRef.current.unMute) {
            playerRef.current.pauseVideo();
            playerRef.current.unMute();
        }
    }, [playerRef]);

    const handleToggle = () => {
        setIsHighContrast(!isHighContrast);
        onToggleTheme(!isHighContrast);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handlePlay = () => {
        if (playerRef && playerRef.current && playerRef.current.getPlayerState) {
            const state = playerRef.current.getPlayerState();
            if (state !== 1) { // 1 is the state for playing
                playerRef.current.playVideo();
            }
        }
    };

    const handlePause = () => {
        if (playerRef && playerRef.current && playerRef.current.getPlayerState) {
            const state = playerRef.current.getPlayerState();
            if (state === 1) { // 1 is the state for playing
                playerRef.current.pauseVideo();
            }
        }
    };

    const handleMute = () => {
        if (playerRef && playerRef.current && playerRef.current.isMuted && !playerRef.current.isMuted()) {
            playerRef.current.mute();
        }
    };

    const handleUnmute = () => {
        if (playerRef && playerRef.current && playerRef.current.isMuted && playerRef.current.isMuted()) {
            playerRef.current.unMute();
        }
    };

    const quotes = [
        "In ancient times Cats were worshipped as Gods; they have not forgotten this. - Terry Pratchett",
        "Time spent with cats is never wasted. - Sigmund Freud",
        "Cats rule the world. - Jim Davis",
        "A cat has absolute emotional honesty. - Ernest Hemingway",
        "The smallest feline is a masterpiece. - Leonardo da Vinci",
        "Cats are connoisseurs of comfort. - James Herriot",
        "A meow massages the heart. - Stuart McMillan",
        "Cats choose us; we don't own them. - Kristin Cast",
        "A cat is a puzzle for which there is no solution. - Hazel Nicholson",
        "Cats leave paw prints in your heart, forever and always."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <header className="App-header">
            <div className="logo-container">
                <img src={"assets/svg/cat-halloween-kitty-svgrepo-com.svg"} className="App-logo" alt="logo"
                     onClick={handleLogoClick}/>
                <Link to="/" className="App-logo" onClick={handleLogoClick}>KatzenKaffee.de</Link>
            </div>
            <div className="welcome-note">
                <p>
                    <p>{randomQuote}</p>
                </p>
            </div>
            <div className="button-container">
                <Link to="/abgabe4" className={"App-button"}> Kommentare </Link>
                <div>
                    <label htmlFor="contrast-switch">Kontrastmodi</label>
                    <label className="switch">
                        <input id="contrast-switch" type= "checkbox" checked={isHighContrast} onChange={handleToggle}/>
                        <span className="slider"></span>
                    </label>
                </div>
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
        </header>
    );
}

export default Header;