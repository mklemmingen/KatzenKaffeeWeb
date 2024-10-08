import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useHandleVerantwortungClick from '../hooks/useHandleVerantwortungclick'; // Import the custom hook
import { MusicPlayerContext } from '../App'; // Import the music player context

function Header() {
    const navigate = useNavigate();
    const { handleMusicPlayerOpen, handleMusicPlayerClose, playerRef } = useContext(MusicPlayerContext);
    const handleVerantwortungClick = useHandleVerantwortungClick();

    useEffect(() => {
        if (playerRef && playerRef.current && playerRef.current.pauseVideo && playerRef.current.unMute) {
            playerRef.current.pauseVideo();
            playerRef.current.unMute();
        }
    }, [playerRef]);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleRegisterClick = () => {
        navigate('/register');
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
                <img src={"assets/svg/cat-halloween-kitty-svgrepo-com.svg"} className="App-logo" alt="logo" onClick={handleLogoClick} />
                <Link to="/" className="App-logo" onClick={handleLogoClick}>KatzenKaffee.de</Link>
            </div>
            <div className="nav-links">
                <Link to="/cafe" className="App-link">Rein in's Cafe</Link>
                <button className="App-link" onClick={handleVerantwortungClick}>Verantwortung übernehmen</button>
                <Link to="/Support" className="App-link">Support</Link>
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
                    <button className="App-button login-button">Login</button>
                    <div className="dropdown-content">
                        <form>
                            <label>
                                Username:
                                <input type="text" name="username" />
                            </label>
                            <label>
                                Password:
                                <input type="password" name="password" />
                            </label>
                            <button type="submit">Bestätigen</button>
                        </form>
                    </div>
                </div>
                <button className="App-button register-button" onClick={handleRegisterClick}>Register</button>
            </div>
        </header>
    );
}

export default Header;