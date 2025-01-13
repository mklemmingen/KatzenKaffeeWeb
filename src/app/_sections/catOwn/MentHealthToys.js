import React from "react";
import MoodBoard from "@/app/_components/MoodBoard";

function MentHealthToys() {
    return (
        <div>
            <h2 className="header">Mentale Gesundheit von Katzen - DIY-/Bio-Spielzeuge!</h2>
            <h2> Marty </h2>
            <p>
                Katzen lieben Abwechslung und Beschäftigung. Ein Kratzbaum und interaktive Spielzeuge
                können helfen, Ihre Katze geistig fit und glücklich zu halten. <br/>
                Regelmäßige Spielzeiten sind wichtig. Sie fördern die Bindung zwischen Ihnen und Ihrer
                Katze und sorgen für körperliche und geistige Auslastung.
            </p>
            <p>
                Rückzugsorte bieten Ihrer Katze Sicherheit und Geborgenheit. Diese Plätze sind wichtig
                für ihre mentale Gesundheit und ermöglichen ihr, sich zu entspannen. <br/>
                Nachhaltige Spielzeuge aus recycelten Materialien oder DIY-Projekte sind eine tolle
                Möglichkeit, die Umwelt zu schonen und Ihre Katze zu unterhalten.
            </p>
            <MoodBoard
                imageUrls={[
                    'https://rawznaturalpetfood.com/wp-content/uploads/Diy-cat-toys-.png',
                    'https://rawznaturalpetfood.com/wp-content/uploads/Homemade-cat-toys--1024x557.png',
                    'https://rawznaturalpetfood.com/wp-content/uploads/Best-homemade-cat-toys--1024x557.png',
                    'https://rawznaturalpetfood.com/wp-content/uploads/Diy-cat-toys-to-keep-them-busy--1024x557.png',
                    'https://rawznaturalpetfood.com/wp-content/uploads/diy-catnip-toys--1024x557.png',
                    'https://rawznaturalpetfood.com/wp-content/uploads/Easy-diy-cat-toys-1024x592.png'
                ]}
                externalLink={'https://rawznaturalpetfood.com/diy-cat-toys/'}
            />
        </div>
    );
}

export default MentHealthToys;