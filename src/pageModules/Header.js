import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MusicPlayerContext } from '../App'; // Import the music player context

function Header() {
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

    // Future method to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Implement the logic to transfer the answer to the backend database
        // and add this information to a textbox at the bottom of the Home component.
        // Example path: POST request to /api/submitExperience
        // fetch('/api/submitExperience', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ experience: event.target.elements.value }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Handle the response data
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
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
