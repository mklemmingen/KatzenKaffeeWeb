import React, { useState, useEffect } from 'react';
import './Cat.css';

const Cat = ({ position, onClick, canInteract }) => {
    const [state, setState] = useState('idle'); // idle, sleeping, licking, moving, interacting

    useEffect(() => {
        if (state === 'moving') {
            const timer = setTimeout(() => setState('idle'), 1000); // Move for 1 second
            return () => clearTimeout(timer);
        }
    }, [state]);

    const getGif = () => {
        switch (state) {
            case 'sleeping':
                return 'assets/gifs/cat-sleeping.gif';
            case 'licking':
                return 'assets/gifs/cat-licking.gif';
            case 'moving':
                return 'assets/gifs/cat-moving.gif';
            case 'interacting':
                return 'assets/gifs/cat-interacting.gif';
            default:
                return 'assets/gifs/cat-idle.gif';
        }
    };

    const scale = 1 - position.z / 10; // Adjust the scale based on z position
    const left = `${position.x * 10}%`;
    const bottom = `${position.z * 10}%`;
    const transform = `scale(${scale}) translateZ(${position.z * 10}px)`;

    return (
        <img
            src={getGif()}
            alt="Cat"
            style={{
                transform,
                position: 'absolute',
                left,
                bottom,
                transition: 'transform 0.5s, left 0.5s, bottom 0.5s',
                cursor: canInteract ? 'pointer' : 'default',
                opacity: canInteract ? 1 : 0.5, // Visual feedback for non-interactable state
            }}
            onClick={() => {
                if (canInteract) {
                    setState('interacting');
                    onClick();
                }
            }}
            onAnimationEnd={() => setState('idle')}
        />
    );
};

export default Cat;