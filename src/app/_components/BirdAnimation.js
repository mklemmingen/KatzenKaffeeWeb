"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../_styles/BirdAnimation.css';
import "../globals.css"

const birdSprites = {
    blueJay: '/assets/birds/spritesheet_blue jay.png',
    cardinal: '/assets/birds/spritesheet_cardinal.png',
    cedarWaxwing: '/assets/birds/spritesheet_cedar waxwing.png',
    chickadee: '/assets/birds/spritesheet_chickadee.png',
    crow: '/assets/birds/spritesheet_crow.png',
    houseFinch: '/assets/birds/spritesheet_house finch.png',
    hummingbird: '/assets/birds/spritesheet_hummingbird.png',
    magpie: '/assets/birds/spritesheet_magpie.png',
    redRobin: '/assets/birds/spritesheet_red robin.png',
    stellersJay: '/assets/birds/spritesheet_steller\'s jay.png',
    whiteDove: '/assets/birds/spritesheet_white dove.png',
    woodThrush: '/assets/birds/spritesheet_wood thrush.png'
};

const categories = {
    flying: 4,
    walking: 2,
    sitting: 3,
    damage: 1
};

const speeds = {
    flying: 3,
    walking: 1,
    sitting: 0
};

const getFrameStyle = (sprite, category, frame, isMirrored, x, y) => {
    const frameSize = 16;
    const row = categories[category];
    return {
        backgroundImage: `url(${sprite})`,
        backgroundPosition: `-${frame * frameSize}px -${row * frameSize}px`,
        width: `${frameSize}px`,
        height: `${frameSize}px`,
        transform: `${isMirrored ? 'scaleX(-1)' : 'none'} scale(2)`,
        transformOrigin: 'center center',
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute'
    };
};

const BirdAnimation = ({ numberOfBirds }) => {
    const [birds, setBirds] = useState([]);
    const frameRate = 8;
    const frameDuration = 1000 / frameRate;
    const lastFrameTime = useRef(0);

    useEffect(() => {
        const birdKeys = Object.keys(birdSprites);
        const selectedBirds = Array.from({ length: numberOfBirds }, () => ({
            type: birdKeys[Math.floor(Math.random() * birdKeys.length)],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            targetX: Math.random() * window.innerWidth,
            targetY: Math.random() * window.innerHeight,
            category: 'flying',
            frame: 0,
            speed: speeds['flying'],
            stateTimer: Math.random() * 5000 + 5000,
            isMirrored: true
        }));
        setBirds(selectedBirds);
    }, [numberOfBirds]);

    const chooseNewTarget = useCallback((bird) => {
        bird.targetX = Math.random() * window.innerWidth;
        bird.targetY = Math.random() * window.innerHeight;
        bird.stateTimer = Math.random() * 5000 + 5000; // Reset state timer
    }, []);

    const animate = useCallback((timestamp) => {
        if (timestamp - lastFrameTime.current < frameDuration) {
            requestAnimationFrame(animate);
            return;
        }
        lastFrameTime.current = timestamp;

        setBirds((prevBirds) => prevBirds.map((bird) => {
            const distanceX = bird.targetX - bird.x;
            const distanceY = bird.targetY - bird.y;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance > 10) {
                const angle = Math.atan2(distanceY, distanceX);
                bird.isMirrored = distanceX < 0; // Mirror if moving westwards
                bird.x += Math.cos(angle) * bird.speed;
                bird.y += Math.sin(angle) * bird.speed;
            } else if (bird.category !== 'sitting') {
                bird.category = 'sitting';
                bird.speed = speeds['sitting'];
                bird.stateTimer = Math.random() * 5000;
            }

            bird.stateTimer -= frameDuration;
            if (bird.stateTimer <= 0) {
                chooseNewTarget(bird);
            }

            // Update frame for flying animation
            if (bird.category === 'flying') {
                bird.frame = (bird.frame + 1) % 4; // Assuming there are 4 frames for flying
            }

            return { ...bird };
        }));

        requestAnimationFrame(animate);
    }, [frameDuration, chooseNewTarget]);

    useEffect(() => {
        requestAnimationFrame(animate);
    }, [animate]);

    return (
        <div className="bird-animation-container">
            {birds.map((bird, index) => {
                const sprite = birdSprites[bird.type];
                const style = getFrameStyle(sprite, bird.category, bird.frame, bird.isMirrored, bird.x, bird.y);
                return <div key={index} style={style} className="bird-animation-frame"></div>;
            })}
        </div>
    );
};

BirdAnimation.propTypes = {
    numberOfBirds: PropTypes.number.isRequired
};

export default BirdAnimation;