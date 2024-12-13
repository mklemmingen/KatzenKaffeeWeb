"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import './_styles/comments.css';

const Page = () => {
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', experience: '' });
    const [errors, setErrors] = useState({ name: '', email: '', experience: '' });
    const [message, setMessage] = useState('');
    const images = [
        'bear.png', 'crocodile.png', 'deer.png', 'elephant.png',
        'horse.png', 'lion.png', 'monkey.png', 'rabbit.png', 'tiger.png'
    ];

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                console.log('Fetching experiences...');
                const response = await fetch('/api/comments/getExperiences');
                console.log('Response received:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Data received:', data);
                const experiences = data.map((experience, index) => ({
                    id: `experience-${index}`,
                    name: experience.name,
                    email: experience.email,
                    body: experience.experience,
                    time: experience.time,
                    image: images[Math.floor(Math.random() * images.length)]
                }));
                setComments(experiences);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };

        fetchExperiences().then(r => {
            console.log('Experiences fetched');
        });
    }, []);

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
            valid = false;
        }

        if (formData.email && formData.email !== "anonym" && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            valid = false;
        }

        if(formData.email.length === 0){
            formData.email = "anonym";
        }

        if (!formData.experience) {
            errors.experience = 'Experience is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                console.log('Submitting experience:', formData);
                const response = await fetch('/api/comments/submitExperience', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        experience: formData.experience
                    }),
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Error submitting experience:', errorMessage);
                    throw new Error('Failed to submit experience');
                }

                const result = await response.json();
                console.log('Submission result:', result.message);

                setComments([...comments, {
                    id: `experience-${comments.length}`,
                    name: formData.name,
                    email: formData.email,
                    body: formData.experience,
                    image: images[Math.floor(Math.random() * images.length)]
                }]);

                setFormData({ name: '', email: '', experience: '' });
                setMessage({ type: 'success', text: 'Kommentar erfolgreich eingetragen!' });
            } catch (error) {
                console.error('Error:', error);
                setMessage({ type: 'error', text: 'Kommentar konnte nicht gespeichert werden.' });
            }

            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="aufgabe4-container">
                <ul className="comments-list">
                    <li className="comment-item">
                        <form onSubmit={handleSubmit} className="comment-form">
                            <label className="user-experience-input">
                                <input
                                    type="text"
                                    name="name"
                                    alt="Name Eingabefeld"
                                    className="standard"
                                    placeholder="Geben Sie Ihren Namen ein"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <span className="error">{errors.name}</span>}

                                <input
                                    type="text"
                                    name="email"
                                    alt="Email-Adresse Eingabefeld"
                                    className="standard"
                                    placeholder="Geben Sie Ihre E-Mail-Adresse ein (optional)"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className="error">{errors.email}</span>}

                                <input
                                    type="text"
                                    name="experience"
                                    alt="Erfahrung mit Katzen Eingabefeld"
                                    className="experience"
                                    placeholder="Was ist Ihre Erfahrung mit Katzen?"
                                    value={formData.experience}
                                    onChange={handleChange}
                                />
                                {errors.experience && <span className="error">{errors.experience}</span>}
                            </label>
                            <div className="message-container">
                                <p className={`message ${message.type === 'success' ? 'success-text' : 'error-text'}`}>
                                    {message.text}
                                </p>
                                <button type="submit">Eingabe Bestätigen</button>
                            </div>
                        </form>
                    </li>
                    {comments.slice().reverse().map(comment => (
                        <li key={comment.id} className="comment-item">
                            <Image
                                src={`/assets/animals_images/images/${comment.image}`}
                                alt={comment.image}
                                width={50}
                                height={50}
                            />
                            <h2>{comment.name}</h2>
                            <p><strong>Email:</strong> {comment.email}</p>
                            {comment.time && (
                                <p><strong>Tag:</strong> {new Date(comment.time).toLocaleDateString('en-GB')}</p>
                            )}
                            <p>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Suspense>
    );
};

export default Page;