import React from 'react';
import { PiYarnFill } from 'react-icons/pi';

const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
        <PiYarnFill
            style={{
                position: 'absolute',
                transform: `translate(${cx - 10}px, ${cy - 10}px)`,
                fontSize: 20,
                color: 'rgba(129, 104, 142, 1)',
            }}
        />
    );
};

export default CustomDot;