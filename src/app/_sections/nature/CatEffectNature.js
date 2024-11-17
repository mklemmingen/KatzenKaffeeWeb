import React from 'react';

import BookRecommendation from "@/app/_components/BookRecommendation";
import CatBirdImpact from "@/app/_components/CatBirdImpact";
import BirdAnimation from "@/app/_components/BirdAnimation";
import CatAnimation from "@/app/_components/CatAnimation";

function CatEffectNature() {

    return (
        <div>
            <div>
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
                <div className="chart-container">
                    <CatBirdImpact className="diagram"/>
                </div>
            </div>
        </div>
    )
        ;
}

export default CatEffectNature;