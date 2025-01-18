import React, {useState} from 'react';
import "../globals.css";

function SupportContactForm() {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Fehler: ${response.status} - ${errorText}`);
                setResponseMessage("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
                return;
            }

            const data = await response.json();
            setResponseMessage(data.message);
        } catch (error) {
            console.error("Fehler beim Senden des Formulars:", error);
            setResponseMessage("Es ist ein unerwarteter Fehler aufgetreten.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="support-contact-form">
            <label className="title">Name:</label>
            <input className="contactInput" type="text" name="name" value={formData.name} onChange={handleChange}
                   required/>

            <label className="title">E-Mail:</label>
            <input className="contactInput" type="email" name="email" value={formData.email} onChange={handleChange}
                   required/>

            <label className="title">Nachricht:</label>
            <textarea className="messageInput" name="message" value={formData.message} onChange={handleChange}
                      required></textarea>

            <button type="submit"  className="submit-button" >Senden</button>
            {responseMessage && <p>{responseMessage}</p>}
        </form>
    );
}

export default SupportContactForm;


