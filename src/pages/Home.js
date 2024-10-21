import React, { useEffect } from 'react';
import InfoBlock from "../pageModules/InfoBlock";
import '../pagestyles/Home.css';
import '../pagestyles/CatAnimation.css';
import CatBirdImpact from "../pageModules/CatBirdImpact";
import BookRecommendation from '../pageModules/BookRecommendation';
import MoodBoard from "../pageModules/MoodBoard";
import Introduction from "../pageModules/Introduction";
import BirdAnimation from "../pageModules/BirdAnimation";
import CatAnimation from "../pageModules/CatAnimation";


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

    // Button that can be added to the page anywhere, that alignes center and throws the view back onto
    // "start"
    const BackToStartButton = () => {
        return (
            <button
                className="back-to-start-button"
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                Zurück zum Anfang
            </button>
        );
    };

    return (
        <div>
            <Introduction id="start"/>
            <div className="container">
                <div className="info-blocks-container">
                    <InfoBlock
                        iconSrc="assets/svg/cat-food-svgrepo-com.svg"
                        headerText="Nachhaltige Ernährung"
                        textBlock=""
                        /*
                        Eine nachhaltige Ernährung für Katzen beginnt mit der Auswahl von Futter,
                          das umweltfreundlich produziert wird. Achten Sie auf Bio-Zutaten und
                          vermeiden Sie Produkte mit unnötigen Zusatzstoffen. Einige Marken bieten
                          sogar Insektenprotein als nachhaltige Alternative zu herkömmlichem Fleisch
                          an. Denken Sie auch daran, lokale Produkte zu bevorzugen, um den CO2-
                          Fußabdruck zu reduzieren.
                         */
                        targetId={'sustainable-diet'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-litter-box-svgrepo-com.svg"
                        headerText="Umweltfreundliches Katzenstreu"
                        textBlock=""
                        /*
                        Die Wahl des richtigen Katzenstreus kann einen großen Unterschied
                          machen. Vermeiden Sie Streu aus Ton oder Silikat, da deren Abbau
                          umweltschädlich ist. Stattdessen können Sie auf biologisch abbaubare
                          Optionen wie Holzpellets, Maiskörner oder recyceltes Papier zurückgreifen.
                         */
                        targetId={'cat-litter'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-travel-bag-svgrepo-com.svg"
                        headerText="Schutz der Vogelwelt"
                        textBlock=""
                        /*
                        Katzen sind natürliche Jäger, und ihre Jagd auf Vögel kann lokale
                          Vogelpopulationen gefährden. Um dies zu verhindern, können Sie Ihrer Katze
                          ein Glöckchen am Halsband anbringen, das die Vögel warnt. Eine weitere
                          Möglichkeit ist es, Ihre Katze in einem gesicherten Außenbereich oder an der
                          Leine nach draußen zu lassen, um ihre Jagdaktivitäten zu kontrollieren.
                         */
                        targetId={'bird-protection'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-tree-svgrepo-com.svg"
                        headerText="Mentale Gesundheit & Spielzeug"
                        textBlock=""
                        /*
                        Sorgen Sie für ausreichend Spielzeug und Beschäftigungsmöglichkeiten,
                        um Langeweile zu vermeiden. Ein Kratzbaum, interaktive Spielzeuge und regelmäßige Spielzeiten
                        mit Ihnen können helfen, Ihre Katze geistig fit und glücklich zu halten. Auch das Schaffen
                        von Rückzugsorten, an denen sich Ihre Katze sicher und geborgen fühlt, trägt zur mentalen
                        Gesundheit bei. Spielzeuge aus recycelten Materialien oder
                        DIY-Projekte zu erstellen, schont die Umwelt
                         */
                        targetId={'mental-health'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-bed-svgrepo-com.svg"
                        headerText="Energie-effiziente Pflege"
                        textBlock=""
                        targetId={'energy-efficient-cat-care'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-litter-sand-svgrepo-com.svg"
                        headerText="Tierheime unterstützen"
                        textBlock=""
                        targetId={'shelter-support'}
                    />
                </div>
            </div>
            <div id={'sustainable-diet'} className="section">
                <div className="section-content">
                    <h2>Nachhaltige Ernährung</h2>
                    <p>
                        Eine nachhaltige Ernährung für Katzen beginnt mit der Auswahl von Futter, das umweltfreundlich
                        produziert wird.
                        Achten Sie auf Bio-Zutaten und vermeiden Sie Produkte mit unnötigen Zusatzstoffen.
                        Einige Marken bieten sogar Insektenprotein als nachhaltige Alternative zu herkömmlichem Fleisch
                        an.
                        Denken Sie auch daran, lokale Produkte zu bevorzugen, um den CO2-Fußabdruck zu reduzieren.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                        no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <BackToStartButton/>
                </div>
            </div>
            <div id={'cat-litter'} className="section">
                <div className="section-content">
                    <h2>Umweltfreundliches Katzenstreu</h2>
                    <p>
                        Die Wahl des richtigen Katzenstreus kann einen großen Unterschied machen
                        Vermeiden Sie Streu aus Ton oder Silikat, da deren Abbau umweltschädlich ist.
                        Stattdessen können Sie auf biologisch abbaubare Optionen wie Holzpellets,
                        Maiskörner oder recyceltes Papier zurückgreifen.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                        no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <BackToStartButton/>
                </div>
            </div>
            <div id={'bird-protection'} className="section">
                <div className="section-content">
                    <h2>Schutz der Vogelwelt</h2>
                    <p>
                        Katzen sind von Natur aus Jäger. Ihr Jagdinstinkt ist tief verwurzelt und sie können ihn nicht
                        einfach abstellen. Leider führt dies dazu, dass sie viele Vögel fangen und töten. Studien
                        zeigen, dass Katzen jedes Jahr <strong>1,3–4 Milliarden Vögel</strong> und <strong>6,3–22,3
                        Milliarden Säugetiere</strong> allein in den USA töten.
                    </p>
                    <p>
                        Hauskatzen (Felis catus) sind weltweit verbreitet und gelten als Raubtiere. Dabei gehören sie,
                        da Sie an den meisten Orten nicht von Natur aus schon da waren, zu den <strong>100
                        schlimmsten invasiven Arten der Welt</strong>. Freilaufende Katzen haben so zum Beispiel
                        bereits zum Aussterben von <strong>33 Vogel-, Säugetier- und Reptilienarten</strong> auf
                        Inseln beigetragen. Auch auf dem Festland können sie die Populationen von Vögeln und
                        Säugetieren stark verringern.
                    </p>
                    <p>
                        In Deutschland gibt es Gesetze und Initiativen, um die Anzahl der streunenden Katzen zu
                        kontrollieren. Eine wichtige Maßnahme ist die <strong>Kastrationspflicht</strong>. Das bedeutet,
                        dass Katzen, die draußen herumlaufen, kastriert werden müssen, damit sie sich nicht weiter
                        vermehren. Diese Regelung gibt es in vielen Städten und Gemeinden.
                    </p>
                    <p>
                        Außerdem gibt es Projekte wie <strong>Catch-Neuter-Return (CNR)</strong>. Dabei werden
                        streunende Katzen eingefangen, kastriert und dann wieder freigelassen. So wird verhindert, dass
                        sie sich weiter vermehren und die Zahl der Streuner wächst.
                    </p>
                    <h3>Tipps für ein nachhaltiges Miteinander</h3>
                    <ul>
                        <li>Bringen Sie Ihrer Katze ein Glöckchen am Halsband an, um Vögel zu warnen.</li>
                        <li>Lassen Sie Ihre Katze in einem gesicherten Außenbereich oder an der Leine nach draußen.</li>
                        <li>Das Adoptieren von ehamaligern Streunern in Tierheimen sorgt dafür, dass noch
                            mehr Streuner dort aufgenommen werden können
                        </li>
                    </ul>
                    <h3>Wohnungskatze vs. Freigängerkatze</h3>
                    <p>
                        Es gibt einen großen Unterschied zwischen Wohnungskatzen und Freigängerkatzen. Wohnungskatzen
                        bleiben immer drinnen und haben weniger Möglichkeiten, Vögel und andere Tiere zu jagen. Sie sind
                        sicherer vor Gefahren wie Autos und anderen Tieren, aber sie brauchen viel Beschäftigung und
                        Spielzeug, um glücklich und gesund zu bleiben.
                    </p>
                    <p>
                        Freigängerkatzen dürfen nach draußen und können ihre natürlichen Instinkte ausleben. Das
                        bedeutet aber auch, dass sie Vögel und andere kleine Tiere jagen. Außerdem sind sie draußen
                        vielen Gefahren ausgesetzt. Es ist wichtig, dass Katzenbesitzer die Vor- und Nachteile beider
                        Haltungsformen abwägen und Maßnahmen ergreifen, um die Umwelt zu schützen.
                    </p>
                    <BookRecommendation
                        imageUrl="https://directory.doabooks.org/bitstream/handle/20.500.12854/113510/9781557538888.jpg?sequence=1&isAllowed=y"
                        bookUrl="https://directory.doabooks.org/handle/20.500.12854/113510"
                        title="Cats and Conservationists: Die Debatte darüber, wem die Natur gehört"
                        description="Cats and Conservationists ist die erste Analyse der Debatte über freilaufende Katzen. Das Buch beleuchtet den Konflikt zwischen Naturschützern und Katzenliebhabern, die sich über die Schäden durch die Katzen und die besten Vorgehensweisen uneinig sind. Es zeigt, wie wir Wissenschaft interpretieren und unterschiedliche Perspektiven einbeziehen können, um konstruktive Dialoge zu fördern. Das Buch zielt darauf ab, die Zusammenarbeit zwischen Wissenschaftlern, Politikern, Naturschützern und Tierschutzorganisationen zu erleichtern, um freilaufende Katzen zu managen und den von ihnen verursachten Schaden zu minimieren."
                    />
                    <BackToStartButton/>
                </div>
                <div className="chart-container">
                    <CatBirdImpact className="diagram"/>
                </div>
                <div className="animation-container">
                    <div className="bird-animation-container">
                        <BirdAnimation numberOfBirds={8}/>
                    </div>
                    <CatAnimation numberOfCats={2} className="little-hunters"/>
                </div>
                <div id="mental-health" className="section">
                    <div className="section-content">
                        <h2>Mentale Gesundheit von Katzen -> DIY-/Bio-Spielzeuge!</h2>
                        <p>
                            Katzen lieben Abwechslung und Beschäftigung. Ein Kratzbaum und interaktive Spielzeuge
                            können
                            helfen, Ihre Katze geistig fit und glücklich zu halten. <br/>
                            Regelmäßige Spielzeiten sind wichtig. Sie fördern die Bindung zwischen Ihnen und Ihrer
                            Katze
                            und
                            sorgen für körperliche und geistige Auslastung.
                        </p>
                        <p>
                            Rückzugsorte bieten Ihrer Katze Sicherheit und Geborgenheit. Diese Plätze sind wichtig
                            für
                            ihre
                            mentale Gesundheit und ermöglichen ihr, sich zu entspannen. <br/>
                            Nachhaltige Spielzeuge aus recycelten Materialien oder DIY-Projekte sind eine tolle
                            Möglichkeit,
                            die Umwelt zu schonen und Ihre Katze zu unterhalten.
                        </p>
                        <MoodBoard
                            imageUrls={[
                                'assets/img/CatToy1.webp',
                                'assets/img/CatToy2.webp',
                                'assets/img/CatToy3.webp',
                                'assets/img/CatToy4.webp',
                                'assets/img/CatToy6.webp',
                                'assets/img/CatToy7.webp'
                            ]}
                            externalLink={
                                'https://rawznaturalpetfood.com/diy-cat-toys/'
                            }
                        />
                        <BackToStartButton/>
                    </div>
                </div>
                <div id="energy-efficient-cat-care" className="section">
                    <div className="section-content">
                        <h2>Energie-effiziente Pflege</h2>
                        <p>
                            TODO
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                            rebum.
                            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </p>
                        <BackToStartButton/>
                    </div>
                </div>
                <div id="shelter-support" className="section">
                    <div className="section-content">
                        <h2> Tierheime unterstützen -> Katzen aus der Natur raus</h2>
                        <p>
                            TODO
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                            rebum.
                            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </p>
                        <BackToStartButton/>
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
                    <BackToStartButton/>
                </div>
            </div>
        </div>
    );
};

export default Home;