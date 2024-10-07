// src/components/Cat.js
import React from 'react';
import './Cat.css';

const Cat = ({ src, position }) => {
    const scale = 1 - position.z / 10; // Adjust the scale based on z position
    const left = `${position.x * 10}%`;
    const bottom = `${position.z * 10}%`;
    const transform = `scale(${scale}) translateZ(${position.z * 10}px)`;

    return (
        <img
            src={src}
            alt="Cat"
            style={{
                transform,
                position: 'absolute',
                left,
                bottom,
                transition: 'transform 0.5s, left 0.5s, bottom 0.5s',
            }}
        />
    );
};

export default Cat;



