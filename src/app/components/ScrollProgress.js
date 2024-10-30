import React, { useEffect, useState } from 'react';
import "../globals.css";

const ScrollProgress = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setScrollPosition(scrollPercent);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="scroll-progress-container">
            <div className="scroll-progress-bar" style={{ width: `${scrollPosition}%` }}></div>
        </div>
    );
};

export default ScrollProgress;
