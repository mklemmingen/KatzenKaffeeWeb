import React, { useEffect } from 'react';
import InfoBlock from "../pageModules/InfoBlock";
import '../pagestyles/Home.css';
import '../pagestyles/CatAnimation.css';
import CatBirdImpact from "../pageModules/CatBirdImpact";
import BookRecommendation from '../pageModules/BookRecommendation';
import MoodBoard from "../pageModules/MoodBoard";


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
                        targetId={'sustainable-diet'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-litter-box-svgrepo-com.svg"
                        headerText="Umweltfreundliches Katzenstreu"
                        textBlock="Die Wahl des richtigen Katzenstreus kann einen großen Unterschied
                          machen. Vermeiden Sie Streu aus Ton oder Silikat, da deren Abbau
                          umweltschädlich ist. Stattdessen können Sie auf biologisch abbaubare
                          Optionen wie Holzpellets, Maiskörner oder recyceltes Papier zurückgreifen."
                        targetId={'cat-litter'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-travel-bag-svgrepo-com.svg"
                        headerText="Schutz der Vogelwelt"
                        textBlock="Katzen sind natürliche Jäger, und ihre Jagd auf Vögel kann lokale
                          Vogelpopulationen gefährden. Um dies zu verhindern, können Sie Ihrer Katze
                          ein Glöckchen am Halsband anbringen, das die Vögel warnt. Eine weitere
                          Möglichkeit ist es, Ihre Katze in einem gesicherten Außenbereich oder an der
                          Leine nach draußen zu lassen, um ihre Jagdaktivitäten zu kontrollieren."
                        targetId={'bird-protection'}
                    />
                    <InfoBlock
                        iconSrc="assets/svg/cat-tree-svgrepo-com.svg"
                        headerText="Mentale Gesundheit & Spielzeug"
                        textBlock="Sorgen Sie für ausreichend Spielzeug und Beschäftigungsmöglichkeiten,
                        um Langeweile zu vermeiden. Ein Kratzbaum, interaktive Spielzeuge und regelmäßige Spielzeiten
                        mit Ihnen können helfen, Ihre Katze geistig fit und glücklich zu halten. Auch das Schaffen
                        von Rückzugsorten, an denen sich Ihre Katze sicher und geborgen fühlt, trägt zur mentalen
                        Gesundheit bei. Erwägen Sie zudem, nachhaltige Spielzeuge aus recycelten Materialien oder
                        DIY-Projekte zu erstellen, um die Umwelt zu schonen und gleichzeitig Ihre Katze zu unterhalten."
                        targetId={'mental-health'}
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
                </div>
            </div>
            <div id={'bird-protection'} className="section">
                <div className="section-content">
                    <h2>Schutz der Vogelwelt</h2>
                    <p>
                        Katzen sind natürliche Jäger und ihre Jagd auf Vögel kann lokale Vogelpopulationen gefährden.
                        Studien zeigen, dass Katzen jährlich 1,3–4 Milliarden Vögel und 6,3–22,3 Milliarden Säugetiere
                        allein in den USA töten (Loss et al. 2013, Nature Communications).
                    </p>
                    <p>
                        Hauskatzen (Felis catus) sind weltweit eingeführte Raubtiere und gehören zu den 100 schlimmsten
                        invasiven Arten der Welt.
                        Freilaufende Katzen haben zum Aussterben von 33 modernen Vogel-, Säugetier- und Reptilienarten
                        beigetragen.
                        Es gibt Hinweise darauf, dass Katzen auch auf dem Festland die Populationen von Vögeln und
                        Säugetieren lokal reduzieren und einen erheblichen Anteil an der Gesamtmortalität von Wildtieren
                        verursachen.
                    </p>
                    <p>
                        Trotz dieser schädlichen Auswirkungen werden die Richtlinien für das Management von
                        freilaufenden Katzenpopulationen und die Regulierung des Verhaltens von Haustierbesitzern eher
                        durch Tierschutzfragen als durch ökologische Auswirkungen bestimmt.
                        Projekte zur Verwaltung freilaufender Katzen, wie z.B. Trap-Neuter-Return (TNR)-Kolonien, sind
                        potenziell schädlich für Wildtierpopulationen und werden oft ohne Berücksichtigung
                        wissenschaftlicher Beweise durchgeführt.
                    </p>
                    <p>
                        Ein Hauptgrund für den derzeit nicht-wissenschaftlichen Ansatz zur Verwaltung freilaufender
                        Katzen ist, dass die Gesamtmortalität durch Katzenprädation oft als vernachlässigbar im
                        Vergleich zu anderen anthropogenen Bedrohungen angesehen wird.
                        Die Bewertung der Bedeutung einer Mortalitätsquelle für den Naturschutz erfordert jedoch die
                        Identifizierung der getöteten Arten und die Schätzung der Gesamtzahl der Todesfälle.
                    </p>
                    <p>
                        Schätzungen der jährlichen Vogelsterblichkeit in den USA durch Prädation durch alle Katzen,
                        einschließlich sowohl in Besitz befindliche als auch wilder Katzen, liegen in den Hunderten von
                        Millionen.
                        Diese Größenordnung würde Katzen zu den Hauptquellen der anthropogenen Vogelsterblichkeit
                        zählen; jedoch wird angenommen, dass Kollisionen mit Fenstern und Gebäuden noch größere
                        Sterblichkeit verursachen.
                    </p>
                    <p className="source-buffer">
                        Quelle: <a href="https://www.nature.com/articles/ncomms2380?WT.mc_id=FBK_NCOMMS#abstract"
                                   target="_blank" rel="noopener noreferrer">Nature Communications</a>
                    </p>
                    <h3>Tipps zum Schutz der Vogelwelt</h3>
                    <ul>
                        <li>Bringen Sie Ihrer Katze ein Glöckchen am Halsband an, um Vögel zu warnen.</li>
                        <li>Lassen Sie Ihre Katze in einem gesicherten Außenbereich oder an der Leine nach draußen.</li>
                        <li>Fördern Sie das Bewusstsein für die ökologischen Auswirkungen von freilaufenden Katzen.</li>
                    </ul>
                    <BookRecommendation
                        imageUrl="https://directory.doabooks.org/bitstream/handle/20.500.12854/113510/9781557538888.jpg?sequence=1&isAllowed=y"
                        bookUrl="https://directory.doabooks.org/handle/20.500.12854/113510"
                        title="Cats and Conservationists: Die Debatte darüber, wem die Natur gehört"
                        description="Cats and Conservationists ist die erste multidisziplinäre Analyse
                        der hitzigen Debatte über freilaufende Katzen. Das Buch, das in Englisch verfasst ist,
                        beleuchtet den Konflikt zwischen Naturschützern und Katzenliebhabern, die sich sowohl
                        über die ökologischen Schäden durch die Katzen als auch über die besten Vorgehensweisen
                        uneinig sind. Diese leidenschaftliche und lebhafte Auseinandersetzung wirft auch
                        größere Fragen auf, wie wir Wissenschaft interpretieren, unterschiedliche
                        Perspektiven einbeziehen und konkurrierende Werte ausbalancieren, um konstruktive
                        Dialoge zu fördern. Das Buch zielt darauf ab, die Zusammenarbeit zwischen
                        Wissenschaftlern, Politikern, Naturschützern und Tierschutzorganisationen zu
                        erleichtern, um freilaufende Katzen zu managen und den von ihnen verursachten
                        Schaden zu minimieren."
                    />
                </div>
                <CatBirdImpact className="diagram"/>
            </div>
            <div id="mental-health" className="section">
                <div className="section-content">
                    <h2>Mentale Gesundheit von Katzen -> DIY-/Bio-Spielzeuge!</h2>
                    <p>
                        Katzen lieben Abwechslung und Beschäftigung. Ein Kratzbaum und interaktive Spielzeuge können
                        helfen, Ihre Katze geistig fit und glücklich zu halten. <br/>
                        Regelmäßige Spielzeiten sind wichtig. Sie fördern die Bindung zwischen Ihnen und Ihrer Katze und
                        sorgen für körperliche und geistige Auslastung.
                    </p>
                    <p>
                        Rückzugsorte bieten Ihrer Katze Sicherheit und Geborgenheit. Diese Plätze sind wichtig für ihre
                        mentale Gesundheit und ermöglichen ihr, sich zu entspannen. <br/>
                        Nachhaltige Spielzeuge aus recycelten Materialien oder DIY-Projekte sind eine tolle Möglichkeit,
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
                </div>
        </div>
</div>
)
    ;
};

export default Home;