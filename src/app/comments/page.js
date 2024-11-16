"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './_styles/Aufgabe4.css';

const Page = () => {
    const [comments, setComments] = useState([]);
    const [message] = useState(''); // New state variable for success or failure message
    const images = [
        'bear.png', 'crocodile.png', 'deer.png', 'elephant.png',
        'horse.png', 'lion.png', 'monkey.png', 'rabbit.png', 'tiger.png'
    ];

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch('/_api/getExperiences');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const experiences = data.map((experience, index) => ({
                    id: `experience-${index}`,
                    name: experience.name,
                    email: experience.email,
                    body: experience.experience,
                    image: images[Math.floor(Math.random() * images.length)]
                }));
                setComments(experiences);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };

        fetchExperiences();
    }, []);

    return (
        <div className="aufgabe4-container">
            <h1>Aufgabe 4: Die ersten hundert Kommentare und zehn zusätzliche Kommentare</h1>
            {message && (
                <p className={message.type === 'success' ? 'success-text' : 'error-text'}>
                    {message.text}
                </p>
            )}
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <Image
                            src={`/assets/animals_images/images/${comment.image}`}
                            alt={comment.image}
                            width={50}
                            height={50}
                        />
                        <h2>{comment.name}</h2>
                        <p><strong>Email:</strong> {comment.email}</p>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;