import React from "react";
import '../_styles/sustCatOwn.css';
import CatAnimation from "@/app/_components/CatAnimation";
import BirdAnimation from "@/app/_components/BirdAnimation";
import Image from 'next/image';


function SustCatOwn() {

    return (
        <div className="outer-container">
            <div className="full-container-headline">
                <Image src='assets/svg/cat-food-svgrepo-com.svg' alt="Icon" width={50} height={50} />
                <h2 className="header">Nachhaltige Ernährung</h2>
            </div>
                <div className="full-container">
                <div className="left-container">
                    <p>Nachhaltige Ernährung ist nicht nur für uns Menschen wichtig – auch bei der Fütterung unserer vierbeinigen Freunde sollten wir auf Nachhaltigkeit achten. Der ökologische Fußabdruck lässt sich ähnlich wie bei unserer eigenen Ernährung reduzieren, indem umweltfreundliche, regionale und/oder biologische Produkte verwendet werden. Eine weitere Möglichkeit besteht darin, selbst nahrhafte Mahlzeiten oder Leckerlis für deine Haustiere zuzubereiten, anstatt auf industriell hergestelltes Futter zurückzugreifen. Inspiration für nachhaltige und gesunde Rezepte findest du beispielsweise auf Plattformen wie katzenkontor.de, speziell für unsere flauschigen Begleiter.</p>
                </div>
                <div className="right-container">
                    <Image src="/assets/img/cat_food.jpg" alt="cat" width={400} height={400} />
                </div>
            </div>
        </div>
    );
}

export default SustCatOwn;