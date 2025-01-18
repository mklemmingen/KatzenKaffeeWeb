import React from 'react';
import 'chart.js/auto';
import '../_styles/Introduction.css';
import "../globals.css";
import {FaComment, FaMap} from "react-icons/fa";
import {MdDarkMode} from "react-icons/md";
import {FaMusic} from "react-icons/fa6";
import { FaCat } from "react-icons/fa";

const Introduction = () => {

    return (
        <div className="introduction">
            <div className="content">
                <div className="intro_header_and_text">
                    <h1>Nachhaltige Katzenhaltung</h1>
                    <h2> ↓ Miezen to the Rescue ↓ </h2>
                </div>
            </div>
            <div className="intro_footer">
                Entdecke , Katzen <span className="highlight">umweltbewusst</span> zu pflegen
                <br/>
                <span>
                    Click diese auf der Webseite verteilten Icons:
                </span>
                <span className="inline-icon-text">
                    <FaMap/>  Spring zu verschiedenen Abschnitten
                </span>
                <br/>
                <span className="inline-icon-text">
                    <FaComment/>  Hinterlasse einen Kommentar
                </span>
                <br/>
                <span className="inline-icon-text">
                    <FaMusic/>  Hör dir Musik an
                </span>
                <br/>
                <span className="inline-icon-text">
                    <MdDarkMode/>  Mach Dark Mode an
                </span >
                <br/>
                <span className="inline-icon-text">
                    <FaCat /> Klick die Katzeeeen neben den Abschnitten!
                </span>
            </div>
        </div>
    );
};

export default Introduction;