import React from 'react';
import {useNavigate} from 'react-router-dom';
import './InfoBlock.css';

// to use the History from infoblock
const InfoBlock = ({ iconSrc, headerText, textBlock, route }) => {
    const navigate = useNavigate();


// to handle clicks in onEvent Listeners
    const handleClick = () => {
        navigate(route);
    };

    return (
        <div className={"info-block"}>
            <div className={"icon"}>
                <img src={iconSrc} alt="Icon"/>
            </div>
            <div className={"text-content"}>
                <h2>{headerText}</h2>
                <p>{textBlock}</p>
                <button onClick={handleClick}>Mehr Erfahren!</button>
            </div>
        </div>
    );
};

export default InfoBlock;
