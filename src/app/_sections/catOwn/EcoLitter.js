import React from "react";
import Image from 'next/image';
import '../../_sections/_styles/ecoLitter.css';
import '../../globals.css';

function EcoLitter() {
    return (
        <div className="eco-litter-container">
            <div className="full-container-headline">
                <Image src='assets/svg/cat-litter-box-svgrepo-com.svg' alt="Icon" width={50} height={50}/>
                <h1>Katzenstreu</h1>
                <h2 className="author">Marty</h2>
            </div>
            <p className="eco-litter-description">
                Die Wahl des richtigen Katzenstreus kann einen großen Unterschied machen.
                Leider gibt es viele Vor- und Nachteile zwischen den verschiedenen Arten von Katzenstreu.
                Diese sind für viele Katzen und Katzenbesitzer nicht immer offensichtlich.
                Um eine gute Entscheidung zu treffen, ist es wichtig, gut abwägen zu können,
                mit welchen Nachteilen man umgehen muss. Folgend angeführt sind mehrere Arten
                von Katzenstreu, gefunden auf der Webseite von Zooplus.uk am 25/12/2024.
            </p>
            <div className="eco-litter-types">
                <div className="eco-litter-type">
                    <h2 className="sub-header">Tonstreu</h2>
                    <div className="info-box">
                        <p><strong>Typ:</strong> Tonstreu</p>
                        <p><strong>Hergestellt aus:</strong> Bentonit-Ton</p>
                        <p><strong>Bekannt für:</strong> Ausgezeichnete Klumpfähigkeit</p>
                        <p><strong>Nachteile:</strong> Nicht biologisch abbaubar, staubig</p>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_clay.jpg" alt="Ton Katzenstreu" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Gute Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">09/10/24</span>
                                <span className="review-name">Anonym</span>
                                <span className="review-stars">★★★★☆</span>
                            </div>
                            <p>Funktioniert für meine Katzen mit unterschiedlichen Bedürfnissen. Ich habe noch nichts gefunden,
                                was das ersetzen kann. Ich habe eine Katze mit Nierenerkrankung, sie uriniert viel. Und eine
                                andere Katze, die kein Maisstreu benutzen wollte, weil die Streu zu groß war. Dies funktioniert
                                meistens für beide. Klumpt gut, kleine Stücke. Es kann jedoch aus der Katzentoilette herausgetragen
                                werden. Ab und zu bleibt es an den Pfoten der Katze, die viel uriniert, hängen. Aber das lässt sich
                                aufwischen.</p>
                        </div>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_clay_LOOK.jpg" alt="Ton Katzenstreu Aussehen" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Schlechte Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">14/02/24</span>
                                <span className="review-name">Anete</span>
                                <span className="review-stars">★☆☆☆☆</span>
                            </div>
                            <p>Und DEFINITIV NICHT SPÜLBAR. Kein spülbares Katzenstreu - Achtung !!! Wenn man es mit Wasser
                                mischt, könnte man damit ein Haus bauen! Also nicht spülen!</p>
                        </div>
                    </div>
                </div>
                <div className="eco-litter-type">
                    <h2 className="sub-header">Maisstreu</h2>
                    <div className="info-box">
                        <p><strong>Typ:</strong> Maisstreu</p>
                        <p><strong>Hergestellt aus:</strong> Gemahlenem Mais</p>
                        <p><strong>Bekannt für:</strong> Biologisch abbaubar, spülbar</p>
                        <p><strong>Nachteil:</strong> Kann Schädlinge anziehen, manche Katzen fressen es</p>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/Super_Benek_Corn_Cat.jpg" alt="Mais Katzenstreu" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Gute Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">26/03/22</span>
                                <span className="review-name">Anonym</span>
                                <span className="review-stars">★★★★★</span>
                            </div>
                            <p>Spül kein Katzenklo runter. Ich bin sehr besorgt über die Menge an Menschen, die Katzenkot spülen.
                                Unser Behandlungssystem im Vereinigten Königreich kann Katzenkot nicht behandeln, also ist das
                                Wasser, das wir trinken, auch mit Parasiten etc. verunreinigt aufgrund der vielen Leute, die ihren
                                Tierabfall spülen 😩(Kommentar der Redaktion: common UK L, skill issue)</p>
                        </div>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/Super_Benek_Corn_Cat_NAME.jpg" alt="Mais Katzenstreu Aussehen" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Schlechte Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">09/09/20</span>
                                <span className="review-name">Harmony</span>
                                <span className="review-stars">★☆☆☆☆</span>
                            </div>
                            <p>Unsere Katze hat es gegessen. Albus ist eine Rettungskatze von der RSPCA. Er ist besessen von
                                Essen, weil er von seinem vorherigen Besitzer verhungern gelassen wurde. Er frisst alles (sogar
                                versucht er, meine 70%-ige Zartbitterschokolade zu essen, bevor ich ihn glücklicherweise rechtzeitig
                                erwischte). Wenn deine Katze wegen Trauma eine Essensbesessenheit hat, dieses Streu ist aus Mais und
                                unser Albus hat es sofort gegessen, sobald wir sein Katzenklo hingestellt haben. Das ist wahrscheinlich
                                ein seltenes Problem, aber ich wollte andere warnen, nur für den Fall.</p>
                        </div>
                    </div>
                </div>
                <div className="eco-litter-type">
                    <h2 className="sub-header">Holzstreu</h2>
                    <div className="info-box">
                        <p><strong>Typ:</strong> Holzstreu</p>
                        <p><strong>Hergestellt aus:</strong> Komprimiertem Sägemehl oder Holzpellets</p>
                        <p><strong>Bekannt für:</strong> Biologisch abbaubar, natürlicher Duft</p>
                        <p><strong>Nachteil:</strong> Kann unordentlich sein, klumpt nicht immer gut</p>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_NAME.jpg" alt="Holz Katzenstreu" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Gute Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">31/10/24</span>
                                <span className="review-name">Andy Hibberd</span>
                                <span className="review-stars">★★★★★</span>
                            </div>
                            <p>Das beste Katzenstreu. Ich habe Holzpellets benutzt, die sich zu Sägemehl verwandeln und nicht klumpen,
                                also muss man sie vollständig entleeren. Ich habe Maisstreu benutzt, das gut klumpt, aber Staub erzeugt,
                                wenn es zerbricht, Kleidung und Bettwäsche war mit staubigen Fußabdrücken bedeckt. Jetzt habe ich dieses
                                Produkt entdeckt. Zuerst dachte ich, es seien nur zerkleinerte Holzpellets, aber nein, dieses Produkt klumpt
                                effektiv um Flüssigkeiten, sodass ich es nur nachfüllen muss, wenn es knapp wird. Es entstehen ein paar
                                Krümel, aber das ist das Beste, was man bei jedem Streu erwarten kann. Hervorragend.</p>
                        </div>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_PICTURE.jpg" alt="Holz Katzenstreu Aussehen" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Schlechte Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">12/10/20</span>
                                <span className="review-name">J Smith</span>
                                <span className="review-stars">★☆☆☆☆</span>
                            </div>
                            <p>Das schlechteste Katzenstreu überhaupt. Ich mag die Idee, dass es biologisch abbaubar ist, aber mein
                                Gott, was für ein Durcheinander. Ich habe drei Katzen und musste ständig den Boden fegen,
                                nachdem sie das Katzenklo benutzt hatten. Noch schlimmer war, dass es dann im ganzen Haus verteilt war.
                                Meine Katzen mochten nicht wie es klumpte... es war fast geleeartig. Ich werde es nicht wieder kaufen.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EcoLitter;
