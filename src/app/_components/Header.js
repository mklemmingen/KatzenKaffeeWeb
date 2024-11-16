'use client';

import "../_styles/Header.css";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FaMusic } from "react-icons/fa6";

// Dynamically import react-youtube to ensure it only loads on the client side
const YouTube = dynamic(() => import('react-youtube'), { ssr: false });

function Header() {

    const router = useRouter();
    const playerRef = useRef(null);
    const [isHighContrast, setIsHighContrast] = useState(false);

    const handleToggle = () => {
        setIsHighContrast(!isHighContrast);
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    const [formData, setFormData] = useState({ name: '', email: '', experience: '' });
    const [errors, setErrors] = useState({ name: '', email: '', experience: '' });

    async function handleSubmit(formData) {
        try {
            console.log('Submitting experience:', formData);
            const response = await fetch('/api/header/submitExperience', {
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

            // Resets formData
            setFormData({ name: '', email: '', experience: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
            valid = false;
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
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

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (validate()) {
            handleSubmit(formData);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && playerRef.current) {
            playerRef.current.pauseVideo();
            playerRef.current.unMute();
        }
    }, [playerRef]);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isHighContrast) {
            htmlElement.setAttribute('data-theme', 'high-contrast');
        } else {
            htmlElement.removeAttribute('data-theme');
        }
    }, [isHighContrast]);

    const handlePlay = () => {
        if (playerRef.current?.getPlayerState) {
            const state = playerRef.current.getPlayerState();
            if (state !== 1) {
                playerRef.current.playVideo();
            } else {
                playerRef.current.pauseVideo();
            }
        }
        if (playerRef.current?.isMuted && playerRef.current.isMuted()) {
            playerRef.current.unMute();
        } else {
            playerRef.current.mute();
        }
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        playerRef.current.mute(); // Start muted
    };

/*  Responsive Menu:
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
*/

    return (
        <header className="App-header">
            <div className="logo-container">
                <Image src="/assets/svg/cat-halloween-kitty-svgrepo-com.svg" className="App-logo" alt="logo" onClick={handleLogoClick} width={50} height={50} />
                <Link href="/" className="App-logo" onClick={handleLogoClick}>KatzenKaffee.de</Link>
            </div>
            {/* Responsive Menu: <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}> */}
                <div className="button-container">
                    <div>
                        <label htmlFor="contrast-switch">Kontrastmodi</label>
                        <label className="switch">
                            <input id="contrast-switch" type="checkbox" checked={isHighContrast} onChange={handleToggle}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <Link href="/comments" className="App-button">Kommentare</Link>
                    <button className="App-button music-button" onClick={handlePlay}> <FaMusic/> </button>
                    <div className="dropdown">
                        <button className="App-button login-button">Erfahrungen mit Katzen?</button>
                        <div className="dropdown-content">
                            <form onSubmit={handleSubmitForm}>
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
                                <button type="submit">Eingabe Bestätigen</button>
                            </form>
                        </div>
                    </div>
                </div>
            {/* </nav> */}
            <YouTube
                videoId="jfKfPfyJRdk"
                opts={{
                    height: '0',
                    width: '0',
                    playerVars: {
                        autoplay: 1,
                    },
                }}
                onReady={onPlayerReady}
            />
        </header>
    );
}

export default Header;