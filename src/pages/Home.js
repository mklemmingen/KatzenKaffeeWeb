import React, { useEffect } from 'react';
import InfoBlock from "../pageModules/InfoBlock";
import CatAnimation from './CatAnimation';
import './Home.css'; // Ensure you have a CSS file for Home-specific styles
import './CatAnimation.css'; // Ensure you have a CSS file for CatAnimation-specific styles

const Home = ({ experiences, setExperiences, handleSubmit }) => {
    useEffect(() => {
        fetch('/api/getExperiences')
            .then(response => response.json())
            .then(data => {
                setExperiences(data);
            })
            .catch(error => {
                console.error('Error fetching experiences:', error);
            });
    }, [setExperiences]);

    return (
        <div>
            <CatAnimation numberOfCats={10} />
            <div className="container">
                <div className="info-blocks-container">
                    <InfoBlock
                        iconSrc="assets/svg/cat-food-svgrepo-com.svg"
                        headerText="Nachhaltige Ernährung"
                        textBlock="Eine nachhaltige Ernährung für Katzen beginnt mit der Auswahl von Futter,
                          das umweltfreundlich produziert wird. Achten Sie auf Bio-Zutaten und
                          vermeiden Sie Produkte mit unnötigen Zusatzstoffen. Einige Marken bieten
                          sogar Insektenprotein als nachhaltige Alternative zu herkömmlichem Fleisch
                          an. Denken Sie auch daran, lokale Produkte zu bevorzugen, um den CO2-
                          Fußabdruck zu reduzieren."
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-litter-box-svgrepo-com.svg"
                        headerText="Umweltfreundliches Katzenstreu"
                        textBlock="Die Wahl des richtigen Katzenstreus kann einen großen Unterschied
                          machen. Vermeiden Sie Streu aus Ton oder Silikat, da deren Abbau
                          umweltschädlich ist. Stattdessen können Sie auf biologisch abbaubare
                          Optionen wie Holzpellets, Maiskörner oder recyceltes Papier zurückgreifen."
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-travel-bag-svgrepo-com.svg"
                        headerText="Schutz der Vogelwelt"
                        textBlock="Katzen sind natürliche Jäger, und ihre Jagd auf Vögel kann lokale
                          Vogelpopulationen gefährden. Um dies zu verhindern, können Sie Ihrer Katze
                          ein Glöckchen am Halsband anbringen, das die Vögel warnt. Eine weitere
                          Möglichkeit ist es, Ihre Katze in einem gesicherten Außenbereich oder an der
                          Leine nach draußen zu lassen, um ihre Jagdaktivitäten zu kontrollieren."
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-tree-svgrepo-com.svg"
                        headerText="Mentale Gesundheit von Katzen"
                        textBlock="Sorgen Sie für ausreichend Spielzeug und Beschäftigungsmöglichkeiten, um
                          Langeweile zu vermeiden. Ein Kratzbaum, interaktive Spielzeuge und
                          regelmäßige Spielzeiten mit Ihnen können helfen, Ihre Katze geistig fit und
                          glücklich zu halten. Auch das Schaffen von Rückzugsorten, an denen sich Ihre
                          Katze sicher und geborgen fühlt, trägt zur mentalen Gesundheit bei."
                    />
                </div>
            </div>
            <div id="user-experiences">
                {experiences.map((experience, index) => (
                    <textarea
                        key={index}
                        value={experience}
                        readOnly
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;