import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import '../_styles/BookRecommendation.css';
import Image from 'next/image';
import "../globals.css";

const BookRecommendation = ({imageUrl, bookUrl, title, description}) => {
    const imageRef = useRef(null);
    const neonSignRef = useRef(null);

    const handleMouseMove = (e) => {
        const image = imageRef.current;
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        const image = imageRef.current;
        image.style.transform = 'rotateX(0) rotateY(0)';
    };

    useEffect(() => {
        const neonSign = neonSignRef.current;

        const startGlowAnimation = () => {
            if (neonSign) {
                neonSign.style.animation = 'glow 2s ease-in-out';
                setTimeout(() => {
                    neonSign.style.animation = '';
                }, 10000);
            }
        };

        const randomInterval = () => Math.floor(Math.random() *
            20000);

        const scheduleNextGlow = () => {
            setTimeout(() => {
                startGlowAnimation();
                scheduleNextGlow();
            }, randomInterval());
        };

        scheduleNextGlow();
    }, []);

    return (
        <div className="book-recommendation">
            <div className="neon-sign" ref={neonSignRef}>Empfohlenes Buch</div>
            <h3 className="title"><a href={bookUrl} target="_blank" rel="noopener noreferrer">{title}</a></h3>
            <div className="pic-text-container">
                <div className="book-image-container">
                    <Image
                        src={imageUrl}
                        alt={title}
                        className="book-image"
                        onClick={() => window.open(bookUrl, '_blank', 'noopener noreferrer')}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        ref={imageRef}
                        width={800}
                        height={1212}
                    />
                </div>
                <p className="book-description">{description}</p>
            </div>
        </div>
    );
};

BookRecommendation.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    bookUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default BookRecommendation;