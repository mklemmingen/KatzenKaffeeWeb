import React, { useState, useEffect } from 'react';
import Cat from './Cat';

const CatCafe = () => {
    const [cat, setCat] = useState({ x: 0, z: 0 });
    const [catState, setCatState] = useState('idle'); // idle, sleeping, licking, moving, interacting
    const [canInteract, setCanInteract] = useState(true); // Track if the cat can be interacted with

    const moveCat = () => {
        const directions = [
            { x: 0, z: -1 },
            { x: 0, z: 1 },
            { x: -1, z: 0 },
            { x: 1, z: 0 },
        ];
        const validMoves = directions.filter(
            (d) =>
                cat.x + d.x >= 0 &&
                cat.x + d.x < 10 &&
                cat.z + d.z >= 0 &&
                cat.z + d.z < 5
        );
        const move = validMoves[Math.floor(Math.random() * validMoves.length)];
        setCat({ x: cat.x + move.x, z: cat.z + move.z });
        setCatState('moving');
    };

    useEffect(() => {
        const randomTime = Math.random() * 5000 + 2000; // Random time between 2 and 7 seconds
        const timer = setTimeout(() => {
            moveCat();
        }, randomTime);
        return () => clearTimeout(timer);
    }, [cat]);

    const handleCatClick = () => {
        setCatState('interacting');
        setCanInteract(false); // Disable interaction
        // Play meow sound
        const audio = new Audio('assets/snd/meow.mp3');
        audio.play();

        // Re-enable interaction after 5-10 seconds
        const cooldownTime = Math.random() * 5000 + 5000; // Random time between 5 and 10 seconds
        setTimeout(() => {
            setCanInteract(true);
        }, cooldownTime);
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            perspective: '1000px',
            backgroundImage: `url(${'./assets/img/virtuellesKatzenCafeHintergrundbild.jpg'})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Cat position={cat} onClick={handleCatClick} canInteract={canInteract} />
        </div>
    );
};

export default CatCafe;
