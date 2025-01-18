"use client";

import React, {useState} from 'react';
import '@/app/support/_styles/Support.css';
import SupportContactForm from '@/app/_components/SupportContactForm';
import ChatBot from "@/app/_components/ChatBot";

function Support() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, message} = formData;

        if (!name || !email || !message) {
            alert('Bitte fülle alle Felder aus.');
            return;
        }

        const mailtoLink = `mailto:schnurren@katzen-cafe.de?subject=Kontaktanfrage von ${name}&body=Name: ${name}%0D%0AE-Mail: ${email}%0D%0ANachricht:%0D${message}`;
        window.location.href = mailtoLink;

        setFormData({name: '', email: '', message: ''});
        setResponseMessage('Danke für deine Nachricht! Wir melden uns bald.');
    };

    return (
        <div className="support-container">
            <ChatBot/>
            <div className="support-text">
                <h1 className="header">Support</h1>
                <p>Willkommen auf unserer Support-Seite! Hier findest du Antworten zu häufig gestellten Fragen und
                    unsere Kontaktdaten.</p>

                <section className="faq">
                    <h2 className="sub-header">Häufig gestellte Fragen</h2>
                    <div className="faq-item">
                        <h3 className="ueberschrift">Was bedeutet nachhaltige Katzenhaltung?</h3>
                        <p>Nachhaltige Katzenhaltung bedeutet, die Bedürfnisse deiner Katze auf eine umweltfreundliche
                            Weise zu erfüllen.</p>
                    </div>
                    <div className="faq-item">
                        <h3 className="ueberschrift">Welche Produkte sind am besten für eine nachhaltige Fütterung?</h3>
                        <p>Für eine nachhaltige Ernährung empfehlen wir Bio-Produkte und Futter mit regionalen
                            Zutaten.</p>
                    </div>
                    <div className="faq-item">
                        <h3 className="ueberschrift">Wie kann ich Kontakt aufnehmen?</h3>
                        <p>Du kannst uns über das Kontaktformular erreichen oder eine E-Mail an schnurren@katzen-cafe.de
                            senden.</p>
                    </div>
                    <div className="faq-item">
                        <div className="ueberschrift">Welches Katzenstreu ist umweltfreundlich?</div>
                        <p>Vermeide Streu aus Ton oder Silikat. Wir empfehlen biologisch abbaubare Optionen wie
                            Holzpellets oder Maiskörner.</p>
                    </div>
                </section>
            </div>
            <div className="contact-number-and-form">
                <section className="contact">
                    <h2 className="header">Kontaktmöglichkeiten</h2>
                    <p>
                        Marty Lauterbach <br/>
                        Alteburgstraße 150, <br/>
                        72762 Reutlingen,<br/>
                        Germany<br/>
                    </p>
                    <ul>
                        <li>
                            <a href="mailto:MKL7543@duck.com">Email: MKL7543@duck.com</a>
                        </li>
                    </ul>
                </section>

                <SupportContactForm/>

                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
        </div>
    );
}

export default Support;