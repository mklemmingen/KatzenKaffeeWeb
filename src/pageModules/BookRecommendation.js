import React from 'react';
import PropTypes from 'prop-types';
import '../pagestyles/BookRecommendation.css';

const BookRecommendation = ({ imageUrl, bookUrl, title, description }) => {
    return (
        <div className="book-recommendation">
            <h3><a href={bookUrl} target="_blank" rel="noopener noreferrer">{title}</a></h3>
            <div className="pic-text-container">
                <img src={imageUrl} alt={title} className="book-image"/>
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