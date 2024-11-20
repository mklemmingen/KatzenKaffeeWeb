"use client";

import React, { useState } from 'react';
import '@/app/support/_styles/Support.css';
import ChatBot from '@/app/_components/ChatBot';
import SupportContactForm from '@/app/_components/SupportContactForm';

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert('Bitte fülle alle Felder aus.');
      return;
    }

    const mailtoLink = `mailto:schnurren@katzen-cafe.de?subject=Kontaktanfrage von ${name}&body=Name: ${name}%0D%0AE-Mail: ${email}%0D%0ANachricht:%0D${message}`;
    window.location.href = mailtoLink;

    setFormData({ name: '', email: '', message: '' });
    setResponseMessage('Danke für deine Nachricht! Wir melden uns bald.');
  };

  return (
    <div className="support-container">
      <h1>Support</h1>
      <p>Willkommen auf unserer Support-Seite! Hier findest du Antworten zu häufig gestellten Fragen und unsere Kontaktdaten.</p>

      <section className="faq">
        <h2>Häufig gestellte Fragen</h2>
        <div className="faq-item">
          <h3>Was bedeutet nachhaltige Katzenhaltung?</h3>
          <p>Nachhaltige Katzenhaltung bedeutet, die Bedürfnisse deiner Katze auf eine umweltfreundliche Weise zu erfüllen.</p>
        </div>
        <div className="faq-item">
          <h3>Welche Produkte sind am besten für eine nachhaltige Fütterung?</h3>
          <p>Für eine nachhaltige Ernährung empfehlen wir Bio-Produkte und Futter mit regionalen Zutaten. Erfahre mehr <a href="http://localhost:3000">hier</a>.</p>
        </div>
        <div className="faq-item">
          <h3>Wie kann ich Kontakt aufnehmen?</h3>
          <p>Du kannst uns über das Kontaktformular erreichen oder eine E-Mail an schnurren@katzen-cafe.de senden.</p>
        </div>
        <div className="faq-item">
          <h3>Welche Katzenstreu ist umweltfreundlich?</h3>
          <p>Vermeide Streu aus Ton oder Silikat. Wir empfehlen biologisch abbaubare Optionen wie Holzpellets oder Maiskörner. Weitere Informationen findest du <a href="http://localhost:3000">hier</a>.</p>
        </div>
      </section>

      <section className="contact">
        <h2>Kontaktmöglichkeiten</h2>
        <ul>
          <li>
            <a href="mailto:schnurren@katzen-cafe.de">Email: schnurren@katzen-cafe.de</a>
          </li>
          <li>
            <a
              onCopy={(e) => {
                navigator.clipboard.writeText("+49123456789");
                alert('Telefonnummer wurde in die Zwischenablage kopiert.');
              }}
            >
              Telefon: +49 (0) 123 456 789
            </a>
          </li>
        </ul>
      </section>

      <SupportContactForm />
      <ChatBot />

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default Support;
