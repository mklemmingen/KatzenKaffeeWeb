import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../pagestyles/MoodBoard.css';

const MoodBoard = ({ imageUrls, imageLinks }) => {
    const [overlay, setOverlay] = useState(null);

    const handleImageClick = (url, link) => {
        setOverlay({ url, link });
    };

    const closeOverlay = () => {
        setOverlay(null);
    };

    useEffect(() => {
        const items = document.querySelectorAll('.mood-board-item');
        const rowCounts = [0, 0, 0];
        items.forEach(item => {
            const minRow = rowCounts.indexOf(Math.min(...rowCounts));
            item.style.gridRow = minRow + 1;
            rowCounts[minRow]++;
        });
    }, []);

    return (
        <div className="mood-board">
            {imageUrls.map((url, index) => (
                <div key={index} className="mood-board-item" onClick={() => handleImageClick(url, imageLinks[index])}>
                    <img src={url} alt={`Mood ${index}`} />
                </div>
            ))}
            {overlay && (
                <div className="overlay" onClick={closeOverlay}>
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <img src={overlay.url} alt="Overlay" />
                        <a href={overlay.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
                        <button onClick={closeOverlay}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

MoodBoard.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MoodBoard;