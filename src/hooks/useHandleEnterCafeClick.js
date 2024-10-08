import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OverlayContext } from '../App';

const useHandleEnterCafeClick = () => {
    const { setOverlayOpen } = useContext(OverlayContext);
    const navigate = useNavigate();

    const handleEnterCafeClick = () => {
        setOverlayOpen(true);
        navigate('/');
    };

    return handleEnterCafeClick;
};

export default useHandleEnterCafeClick;