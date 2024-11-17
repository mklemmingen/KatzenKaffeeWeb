import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import '../_styles/Introduction.css';
import Image from 'next/image';
import CatAnimation from "@/app/_components/CatAnimation";
import "../globals.css";
import {B612} from "next/dist/compiled/@next/font/dist/google";
import BirdAnimation from "@/app/_components/BirdAnimation";

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

    /*
     <p>
        Katzen sind wunderbare Begleiter und können uns viel Freude bereiten <br/>
        Sie sind Teil unserer Welt und wir sind Teil ihrer Welt. <br/>
        Gemeinsam leben wir in einer riesigen und komplexen Natur. <br/>
        Wie können wir also nachhaltig mit unseren Katzen leben? <br/>
        <br/>
        Sie sind der {visitorCount} Besucher dieser Seite.
        <br/>
        <br/>
        Jetzt lernen, wie man nachhaltig hält! Einfach entlang scrollen
       </p>
     */

    return (
        <div className="introduction">
            <CatAnimation numberOfCats={3}/>
            <BirdAnimation numberOfBirds={3}/>
            <div className="content">
                <div className="intro_header_and_text">
                    <h1>Nachhaltige Katzenhaltung</h1>
                    <h2> Miezen to ↓ the Rescue </h2>
                </div>
            </div>
        </div>
    );
};

export default Introduction;