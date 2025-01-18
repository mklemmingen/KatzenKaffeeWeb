import React from 'react';
import Image from 'next/image';

function _error() {
    return (
        <div>
            <Image src="assets/img/404.jpg" alt="404 Error"/>
        </div>
    );
}

export default _error;