import React, { useState } from "react";
import "../_styles/sustCatOwn.css";
import Image from "next/image";

function SustCatOwn() {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore((prev) => !prev);
    };

    return (
        <div className="outer-cont">
            <div className="full-container-headline">
                <Image src="/assets/svg/cat-food-svgrepo-com.svg" alt="Icon" width={50} height={50} />
                <h2 className="header">Nachhaltige Ernährung</h2>
                <h2> Meinhard </h2>
            </div>
            <div className="full-cont">
                <div className="info-card">
                    <h3 className="card-title">Warum nachhaltig füttern?</h3>
                    <p>
                        Nachhaltige Ernährung ist nicht nur für uns Menschen wichtig – auch bei der Fütterung unserer vierbeinigen Freunde
                        können wir den ökologischen Fußabdruck reduzieren. 
                    </p>
                    <ul className="advantages-list">
                        <li>🌱 Verwendung regionaler Zutaten</li>
                        <li>♻️ Reduzierung von Verpackungsmüll</li>
                        <li>🍲 Hausgemachte Mahlzeiten</li>
                    </ul>
                </div>
                <div className="image-card">
                    <Image src="/assets/img/cat_food.jpg" alt="Cat with food" width={400} height={400} />
                </div>
            </div>
            <div className="tips-cont">
                <h3 className="header">Tipps für nachhaltige Tierernährung</h3>
                <ul className="tips-list">
                    <li>🔍 Kaufe Futter mit biologisch zertifizierten Inhaltsstoffen.</li>
                    <li>📦 Achte auf recyclebare Verpackungen oder bring deinen eigenen Behälter mit.</li>
                    <li>👨‍🍳 Bereite Snacks oder Mahlzeiten selbst zu, z. B. mit gekochtem Fisch oder Huhn.</li>
                </ul>
                {showMore && (
                    <p className="extra-info">
                        Für mehr Inspiration kannst du Plattformen wie <a href="https://katzenkontor.de" target="_blank">katzenkontor.de</a> besuchen.
                        Dort findest du Rezepte und Tipps, die speziell auf Katzen abgestimmt sind!
                    </p>
                )}
                <button className="more-btn" onClick={toggleShowMore}>
                    {showMore ? "Weniger anzeigen" : "Mehr erfahren"}
                </button>
            </div>
        </div>
    );
}

export default SustCatOwn;
