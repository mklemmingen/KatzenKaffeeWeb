import React from 'react';
import './InfoBlock.css';

// to use the History from infoblock
const InfoBlock = ({ iconSrc, headerText, textBlock}) => {

    return (
        <div className={"info-block"}>
            <div className={"icon"}>
                <img src={iconSrc} alt="Icon"/>
            </div>
            <div className={"text-content"}>
                <h2>{headerText}</h2>
                <p>{textBlock}</p>
            </div>
        </div>
    );
};

export default InfoBlock;
