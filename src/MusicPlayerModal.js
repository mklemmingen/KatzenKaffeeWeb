import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This is important for accessibility

function MusicPlayerModal({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Music Player Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Music Player</h2>
            <p>Here you can control your music...</p>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
}

export default MusicPlayerModal;
