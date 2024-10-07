import React, { useRef } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId, onReady }) => {
    const playerRef = useRef(null);

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        playerRef.current.mute(); // Start muted
        if (onReady) {
            onReady(playerRef.current);
        }
    };

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

