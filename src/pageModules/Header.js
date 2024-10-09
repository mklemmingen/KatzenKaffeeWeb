import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MusicPlayerContext } from '../App'; // Import the music player context

function Header({ handleSubmit }) { // Accept handleSubmit as a prop
    const navigate = useNavigate();
    const { handleMusicPlayerOpen, handleMusicPlayerClose, playerRef } = useContext(MusicPlayerContext);

    useEffect(() => {
        if (playerRef && playerRef.current && playerRef.current.pauseVideo && playerRef.current.unMute) {
            playerRef.current.pauseVideo();
            playerRef.current.unMute();
        }
    }, [playerRef]);

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

    return (
        <header className="App-header">
            <div className="logo-container">
                <img src={"assets/svg/cat-halloween-kitty-svgrepo-com.svg"} className="App-logo" alt="logo"
                     onClick={handleLogoClick}/>
                <Link to="/" className="App-logo" onClick={handleLogoClick}>KatzenKaffee.de</Link>
            </div>
            <div className="welcome-note">
                <p>
                    Entspannen, Musik hören, Zeit mit Katzen verbringen und schauen, wie man das Nachhaltig macht.
                </p>
            </div>
            <div className="button-container">
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