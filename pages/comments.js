import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/app/styles/Aufgabe4.css';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const images = [
        'bear.png', 'crocodile.png', 'deer.png', 'elephant.png',
        'horse.png', 'lion.png', 'monkey.png', 'rabbit.png', 'tiger.png'
    ];

    useEffect(() => {
        // Fetching experiences from SQLite database of the server
        fetch('/api/getExperiences')
            .then(response => response.json())
            .then(data => {
                const experiences = data.slice(0, 100).map((experience, index) => ({
                    id: `experience-${index}`,
                    name: 'User Experience',
                    email: '',
                    body: experience.experience,
                    image: images[Math.floor(Math.random() * images.length)]
                }));
                setComments(experiences);
            })
            .catch(error => {
                console.error('Error fetching experiences:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch additional 10 comments from the existing structure
        const fetchComments = () => {
            fetch('https://jsonplaceholder.typicode.com/comments')
                .then(response => response.json())
                .then(data => {
                    const additionalComments = data.slice(0, 10).map(comment => ({
                        ...comment,
                        image: images[Math.floor(Math.random() * images.length)]
                    }));
                    setComments(prevComments => [...prevComments, ...additionalComments]);
                });
        };

        fetchComments();
        const interval = setInterval(fetchComments, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="aufgabe4-container">
            <h1>Aufgabe 4: Die ersten hundert Kommentare und zehn zusätzliche Kommentare</h1>
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

export default Comments;
