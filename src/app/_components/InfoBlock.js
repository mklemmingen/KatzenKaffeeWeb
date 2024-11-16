import React from 'react';
import '../_styles/InfoBlock.css';
import Image from 'next/image';
import "../globals.css";

const InfoBlock = ({ iconSrc, headerText, textBlock, targetId }) => {
    const handleButtonClick = () => {
        try {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                targetElement.focus();
                console.log(`Scrolled to element with ID ${targetId}`);
            } else {
                throw new Error(`Element with ID ${targetId} not found`);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="info-block">
            <div className="icon">
                <Image src={iconSrc} alt="Icon" width={20} height={20} />
            </div>
            <div className="text-content">
                <h2>{headerText}</h2>
                <p>{textBlock}</p>
                <button onClick={handleButtonClick}>Zur Kategorie</button>
            </div>
        </div>
    );
};

export default InfoBlock;
