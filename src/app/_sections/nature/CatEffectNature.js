import React, {useEffect} from 'react';

import BookRecommendation from "@/app/_components/BookRecommendation";
import CatBirdImpact from "@/app/_components/CatBirdImpact";
import BirdAnimation from "@/app/_components/BirdAnimation";
import CatAnimation from "@/app/_components/CatAnimation";
import "@/app/_sections/_styles/catEffectNature.css";

function CatEffectNature() {

    useEffect(() => {
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            bubble.style.animationDuration = `${Math.random() * 5 + 3}s`;
            bubble.style.animationDelay = `${Math.random() * 2}s`;
        });
    }, []);

    return (
        <div>
            <div className="containerCatNature">
                <div className="text-content">
                    <h1 className="header">Schutz der Vogelwelt</h1>
                    <p>
                        Katzen sind von Natur aus Jäger. Ihr Jagdinstinkt ist tief verwurzelt und sie können ihn nicht
                        einfach abstellen. Leider führt dies dazu, dass sie viele Vögel aus Überlebens- und Unterhaltungsinstinkt töten.

                        Studien zeigen, dass Katzen jedes Jahr <strong>1,3–4 Milliarden Vögel</strong> und <strong>6,3–22,3
                        Milliarden Säugetiere</strong> allein in den USA töten.
                    </p>
                    <CatBirdImpact className="catbird-impact"/>
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
                    <h2 className="sub-header">Tipps für ein nachhaltiges Miteinander</h2>
                    <ul>
                        <li>Bringen Sie Ihrer Katze ein Glöckchen am Halsband an, um Vögel zu warnen.</li>
                        <li>Lassen Sie Ihre Katze in einem gesicherten Außenbereich oder an der Leine nach draußen.</li>
                        <li>Das Adoptieren von ehamaligern Streunern in Tierheimen sorgt dafür, dass noch
                            mehr Streuner dort aufgenommen werden können
                        </li>
                    </ul>
                    <h2 className="sub-header">Wohnungskatze vs. Freigängerkatze</h2>
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
                </div>
            </div>
            <BookRecommendation
                className="book-recommendation"
                imageUrl="https://directory.doabooks.org/bitstream/handle/20.500.12854/113510/9781557538888.jpg?sequence=1&isAllowed=y"
                bookUrl="https://directory.doabooks.org/handle/20.500.12854/113510"
                title="Cats and Conservationists: Die Debatte darüber, wem die Natur gehört"
                description="Cats and Conservationists ist das erste Buch,
                    das die Diskussion über freilaufende Katzen untersucht.
                    Es zeigt den Streit zwischen Naturschützern und
                    Katzenfreunden, die sich nicht einig sind, wie man mit den
                    Schäden durch Katzen umgehen soll. Das Buch erklärt,
                    wie wir wissenschaftliche Erkenntnisse verstehen und
                    verschiedene Meinungen berücksichtigen können, um
                    besser miteinander zu reden. Es möchte, dass Wissenschaftler,
                    Politiker, Naturschützer und Tierschutzorganisationen
                     zusammenarbeiten, um freilaufende Katzen zu kontrollieren
                     und den Schaden, den sie verursachen, zu verringern."
            />
        </div>
    );
}

export default CatEffectNature;