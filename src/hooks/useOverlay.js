import { useState, useContext } from 'react';
import { OverlayContext } from '../App';

const useOverlay = () => {
    const { isOverlayOpen, setOverlayOpen } = useContext(OverlayContext);

    const toggleOverlay = () => {
        setOverlayOpen(!isOverlayOpen);
    };

    return { isOverlayOpen, toggleOverlay };
};

export default useOverlay;
