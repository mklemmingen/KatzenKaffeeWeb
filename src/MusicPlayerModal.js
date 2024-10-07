import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This is important for accessibility

function MusicPlayerModal({isOpen, onRequestClose, playerRef}) {
    const handlePlay = () => {
        if (playerRef && playerRef.current) {
            playerRef.current.playVideo();
        }
    };

    const handlePause = () => {
        if (playerRef && playerRef.current) {
            playerRef.current.pauseVideo();
        }
    };

    const handleMute = () => {
        if (playerRef && playerRef.current) {
            playerRef.current.mute();
        }
    };

    const handleUnmute = () => {
        if (playerRef && playerRef.current) {
            playerRef.current.unMute();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Music Player Modal"
            className="music-player-modal" // Ensure this matches your CSS class
            overlayClassName="Overlay"
        >
            <button onClick={handleMute}>Mute</button>
            <button onClick={handleUnmute}>Unmute</button>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
}

//             <h2>Music Player</h2>
//             <p>Here you can control your music...</p>
//             <button onClick={handlePlay}>Play</button>
//             <button onClick={handlePause}>Pause</button>

export default MusicPlayerModal;

