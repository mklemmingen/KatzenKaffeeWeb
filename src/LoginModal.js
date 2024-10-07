import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This is important for accessibility

function LoginModal({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Login Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
}

export default LoginModal;
