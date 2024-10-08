import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { OverlayContext } from '../App';

const useHandleVerantwortungClick = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isOverlayOpen, setOverlayOpen } = useContext(OverlayContext);

    const handleVerantwortungClick = () => {
        if (location.pathname === '/') {
            // If current page is home
            if (isOverlayOpen) {
                // If overlay is open, close it
                setOverlayOpen(false);
            } else {
                // Scroll to the 'verantwortung-section'
                document.getElementById('verantwortung-section').scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to home and then focus on textboxes
            navigate('/');
            setTimeout(() => {
                document.getElementById('verantwortung-section').scrollIntoView({ behavior: 'smooth' });
            }, 100); // Delay to ensure navigation completes
        }
    };

    return handleVerantwortungClick;
};

export default useHandleVerantwortungClick;
