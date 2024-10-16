import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import '../pagestyles/Introduction.css';

const Introduction = () => {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {

        // COUNTER! ----------------------------------------------
        // Retrieve the current count from local storage
        let count = localStorage.getItem('visitorCount');
        if (!count) {
            count = 0;
        } else {
            count = parseInt(count, 10);
        }
        // Increment the count
        count += 1;
        // Save the new count back to local storage
        localStorage.setItem('visitorCount', count);
        // Update the state
        setVisitorCount(count);
    }, []);

    return (
        <div className="introduction">
            <div className="content">
                <p>
                    <h1>Nachhaltige Katzenhaltung</h1>
                    Katzen sind wunderbare Begleiter, aber es ist wichtig, sie nachhaltig zu halten.
                    Dies bedeutet, auf ihre Gesundheit zu achten, umweltfreundliche Produkte zu verwenden und
                    sicherzustellen, dass sie keine negativen Auswirkungen auf die Umwelt haben.
                    <span>
                        <br/>
                        Sie sind der {visitorCount} Besucher dieser Seite.
                    </span>
                </p>
                <div className="cat-gif">
                    <img src="https://media1.tenor.com/m/u5Hg9SEis_sAAAAC/coffee-vec50.gif" alt="Cat GIF"/>
                    </div>
            </div>
        </div>
    );
};

export default Introduction;