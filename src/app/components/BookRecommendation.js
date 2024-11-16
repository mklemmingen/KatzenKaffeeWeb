import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/BookRecommendation.css';
import Image from 'next/image';
import "../globals.css";

const BookRecommendation = ({ imageUrl, bookUrl, title, description }) => {
    const imageRef = useRef(null);

    /*
    Method allows for the creation of a 3D effect on the
    book cover image when the mouse is moved over it.
     */
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

    /*
    Method resets the 3D effect on the book cover image
     */
    const handleMouseLeave = () => {
        const image = imageRef.current;
        image.style.transform = 'rotateX(0) rotateY(0)';
    };

    return (
        <div className="book-recommendation">
            <h3><a href={bookUrl} target="_blank" rel="noopener noreferrer">{title}</a></h3>
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

/*
Define the required properties for the BookRecommendation component
 */
BookRecommendation.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    bookUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default BookRecommendation;