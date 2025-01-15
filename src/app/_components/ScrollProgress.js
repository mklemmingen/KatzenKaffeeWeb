"use client";

import React, {useEffect, useState} from 'react';
import "../globals.css";

const ScrollProgress = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="scroll-progress">
            Scroll Position: {scrollPosition}
        </div>
    );
};

export default ScrollProgress;
