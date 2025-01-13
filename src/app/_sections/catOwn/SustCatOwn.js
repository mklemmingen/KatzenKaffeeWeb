import React from "react";
import Image from 'next/image';
import '../_styles/sustCatOwn.css';
import '../../_sections/_styles/section.css';

function SustCatOwn() {
    return (
        <div className="outer-container-sustCatOwn">
            <div className="full-container-headline-sustCatOwn">
                <Image src='assets/svg/cat-food-svgrepo-com.svg' alt="Icon" width={50} height={50} />
                <h1 className="header">Nachhaltige Ernährung</h1>
            </div>
            <div className="full-container-sustCatOwn">
                <div className="left-container">
                    <p>
                        Nachhaltige Ernährung ist nicht nur für uns Menschen wichtig – auch bei der Fütterung unserer vierbeinigen Freunde sollten wir auf Nachhaltigkeit achten. Der ökologische Fußabdruck lässt sich ähnlich wie bei unserer eigenen Ernährung reduzieren, indem umweltfreundliche, regionale und/oder biologische Produkte verwendet werden. Eine weitere Möglichkeit besteht darin, selbst nahrhafte Mahlzeiten oder Leckerlis für deine Haustiere zuzubereiten, anstatt auf industriell hergestelltes Futter zurückzugreifen. Inspiration für nachhaltige und gesunde Rezepte findest du beispielsweise auf Plattformen wie katzenkontor.de, speziell für unsere flauschigen Begleiter.
                    </p>
                </div>
                <div className="right-container">
                    <Image src="/assets/img/cat_food.jpg" alt="cat" width={400} height={400} />
                </div>
            </div>

            {}
            <h2 className="sub-header">Erfahre mehr über nachhaltige Ernährung</h2>
            <div className="video-container-sustCatOwn">
                <p>Finde heraus, wieso die herkömmlichen Produkte die du im Supermarkt bekommst nicht unbedingt das beste für deine Katze und die Umwelt ist:</p>
                <a 
                    href="https://www.youtube.com/watch?v=exUjjdgx6zg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <button className="video-button-sustCatOwn">Video ansehen</button>
                </a>
            </div>

            {}
            <h2 className="sub-header">Gesunde Rezeptideen für selbstgemachtes Katzenfutter</h2>
            <div className="recipe-text-sustCatOwn">
                <h3>Eier auf Rind, garniert mit Naturjoghurt</h3>
                <p><strong>Du brauchst dafür:</strong></p>
                <ul>
                    <li>200g Rinderhack 🥩</li>
                    <li>2 hart gekochte Eier 🥚</li>
                    <li>Naturjoghurt 🥛</li>
                </ul>
                <p>
                    <strong>Zubereitung:</strong> Die gekochten Eier musst du zuerst einmal kleinschneiden. Das Rinderhack wird ohne Zugabe von Fett und Gewürzen in der Pfanne gegart, 
                    bis es komplett durch ist. Das lässt du dann abkühlen. Danach vermengst du die Eier und das Hack mit ein wenig Naturjoghurt und fertig ist die leckere Mahlzeit.
                </p>
            </div>

            <p>
                Auf den Geschmack gekommen? Ich hoffe nicht du, sondern deine Katze. Wenn du dich inspiriert fühlst, hier findest du noch mehr tolle und gesunde Rezepte:
            </p>
            <a 
                href="https://www.youtube.com/watch?v=dESxUNBYHdQ" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <button className="video-button-sustCatOwn">Video ansehen</button>
            </a>
        </div>
    );
}

export default SustCatOwn;
