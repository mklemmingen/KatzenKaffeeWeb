import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import '../_styles/MoodBoard.css';
import Image from 'next/image';
import "../globals.css";

const MoodBoard = ({imageUrls, externalLink}) => {
    useEffect(() => {
        const images = document.querySelectorAll('.mood-board-item img');
        images.forEach(img => {
            img.onload = () => {
                img.classList.add('loaded');
            };
        });
    }, []);

    return (
        <section className="mood-board-section">
            <div className="mood-board">
                {imageUrls.map((url, index) => (
                    <div key={index} className="mood-board-item">
                        <Image src={url} alt={`Moodboard-Bild ${index}`} width={300} height={100}/>
                    </div>
                ))}
                <a href={externalLink} target="_blank" rel="noopener noreferrer" className="external-link-button">
                    DIY-Tutorial (Link zu Extern 11/10/24)
                </a>
            </div>
        </section>
    );
};

MoodBoard.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    externalLink: PropTypes.string.isRequired,
};

export default MoodBoard;