import React from 'react';
import '@/app/impressum/_styles/Impressum.css';

function Page() {
    return (
        <div className="impressum-container">

            <h1 className="impr-header">Impressum</h1>

            <p className="impr-sect">
                <strong>Angabengemäß § 5 TMG</strong>
            </p>

            <p className="impr-sect">
                KatzenKaffee ist ein Projekt von Lauterbach Martin,
                Meinhard Holzknecht und Michael Nägele. Sie treten als Privatpersonen auf.
            </p>

            <p className="impr-sect">
                <strong>Vertreten durch:</strong><br/>
                Geschäftsführer: Lauterbach Martin, Meinhard Holzknecht</p>

            <p className="impr-sect">
                <strong>Kontakt:</strong><br/>
                E-Mail: MKL7543@duck.com</p>

            <p className="impr-sect">
                <strong>
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                </strong>
                <br/>
                Lauterbach Martin
                <br/>
                Alteburgstraße 150
                <br/>
                Reutlingen
                <br/>
                Deutschland
            </p>

            <h2 className="impr-header">
                Haftungsausschluss
            </h2>

            <p className="impr-sect">
                <strong>Haftung für Inhalte</strong>
                <br/>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen
            </p>

            <p className="impr-sect">
                <strong>Haftung für Links</strong>
                <br/>
                Unser Angebot enthält Links zu externen Webseiten Dritter,
                auf deren Inhalte wir keinen Einfluss haben
            </p>

            <p className="impr-sect"><strong>Urheberrecht</strong><br/>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht</p>

        </div>
    );
}

export default Page;
