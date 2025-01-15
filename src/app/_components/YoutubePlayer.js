import React, {useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import "../globals.css";

// Dynamically import react-youtube to ensure it only loads on the client side
const YouTube = dynamic(() => import('react-youtube'), {ssr: false});

const YouTubePlayer = ({videoId, onReady}) => {
    const playerRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        playerRef.current.mute(); // Start muted
        if (onReady) {
            onReady(playerRef.current);
        }
    };

    if (!isClient) {
        return null; // Renders nothing of it on the server
    }

    return (
        <YouTube
            videoId={videoId}
            opts={{
                height: '0',
                width: '0',
                playerVars: {
                    autoplay: 1,
                },
            }}
            onReady={onPlayerReady}
        />
    );
};

export default YouTubePlayer;

