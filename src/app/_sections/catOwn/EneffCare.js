import React from "react";
import '../../_sections/_styles/eneffCare.css';
import '../../globals.css';
import Image from "next/image";
function EneffCare() {
    return (
        <div className="outer-container-eneffCare">
            <div className="full-container-headline">
                <Image src='assets/svg/cat-bed-svgrepo-com.svg' alt="Icon" width={50} height={50}/>
                <h1>Energieeffizienz</h1>
                <h2 className="author">Meinhard</h2>
            </div>

            <div className="full-container-eneffCare">
                <div className="left-container-eneffCare">
                    <p>
                        Energieeffiziente Katzenhaltung trägt maßgeblich zum Umweltschutz bei, indem sie den
                        Energieverbrauch im Haushalt reduziert und nachhaltige Praktiken fördert. Es gibt verschiedene
                        Möglichkeiten, die Energieeffizienz zu verbessern, etwa durch die Nutzung energieeffizienter
                        Beleuchtung, Heiz- und Kühlsysteme sowie durch den Kauf umweltfreundlicher Katzenprodukte.
                    </p>

                    {}
                    <h2 className="sub-header">Tipps zur Energieeffizienz</h2>
                    <ul>
                        <li><strong>Energieeffiziente Beleuchtung:</strong> Verwende LED-Lampen in Bereichen, in denen
                            deine Katze sich häufig aufhält. Diese Lampen verbrauchen weniger Energie und haben eine
                            längere Lebensdauer.
                        </li>
                        <li><strong>Heiz- und Kühlsysteme:</strong> Stelle sicher, dass deine Heiz- und Kühlsysteme
                            energieeffizient sind. Eine gut isolierte Wohnung hilft, den Energieverbrauch zu senken und
                            bietet deiner Katze gleichzeitig ein angenehmes Klima.
                        </li>
                        <li><strong>Umweltfreundliche Katzenprodukte:</strong> Achte beim Kauf von Katzenstreu,
                            Spielzeug und Futter auf umweltfreundliche und nachhaltige Produkte. Es gibt viele Optionen,
                            die biologisch abbaubar oder aus recycelten Materialien hergestellt sind.
                        </li>
                    </ul>

                    {}
                    <h2 className="sub-heade">Katzenklappen und Energieeffizienz</h2>
                    <ul>
                        Eine Katzenklappe kann den Energieverbrauch beeinflussen, besonders in gut isolierten Häusern.
                        Moderne Katzenklappen sind so konzipiert, dass sie luftdicht schließen und Wärmeverluste
                        minimieren. Einige Modelle nutzen RFID-Chips oder Bewegungssensoren, um nur für deine Katze zu
                        öffnen, was die Energieeffizienz weiter verbessert.
                    </ul>

                    {}
                    <h2 className="sub-header">Weitere nachhaltige Praktiken</h2>
                    <ul>
                        <li><strong>Recycling und Wiederverwendung:</strong> Verwende alte Kartons und Stoffreste als
                            Spielzeug oder Schlafplätze für deine Katze. Das reduziert Abfall und bietet deiner Katze
                            gleichzeitig Abwechslung.
                        </li>
                        <li><strong>Wasser sparen:</strong> Achte darauf, dass deine Katze immer frisches Wasser hat,
                            aber vermeide unnötigen Wasserverbrauch, indem du z.B. eine Trinkbrunnen mit automatischer
                            Abschaltung verwendest.
                        </li>
                    </ul>
                </div>

                {}
                <div className="right-container-eneffCare">
                    <div className="image-block-eneffCare">
                        <img
                            src="/assets/img/pexels-curly-woman-with-charming-cat-6001208.jpg"
                            alt="Curly woman with a charming cat"
                            className="styled-image"
                        />
                    </div>
                    <div className="image-block-eneffCare">
                        <img
                            src="/assets/img/pexels-wojciech-kumpicki-1084687-2071873.jpg"
                            alt="Cat doing cat things"
                            className="styled-image"
                        />
                    </div>
                    <div className="image-block-eneffCare">
                        <img
                            src="/assets/img/pexels-tubiderler-18896527.jpg"
                            alt="Cat watching out of window"
                            className="styled-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EneffCare;
