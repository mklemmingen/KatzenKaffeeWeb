import React, { useState, useEffect } from 'react';
import Cat from './Cat';

const CatCafe = () => {
    const [cats, setCats] = useState([
        { x: 0, z: 0 },
        { x: 2, z: 1 },
        { x: 4, z: 2 },
    ]);

    const moveCat = (cat) => {
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
        return { x: cat.x + move.x, z: cat.z + move.z };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCats((prevCats) => prevCats.map((cat) => moveCat(cat)));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            perspective: '1000px',
            backgroundImage: `url(${'./assets/img/virtuellesKatzenCafeHintergrundbild.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            {cats.map((cat, index) => (
                <Cat key={index} src={'./assets/svg/cat-5-svgrepo-com.svg'} position={cat} />
            ))}
        </div>
    );
};

export default CatCafe;

