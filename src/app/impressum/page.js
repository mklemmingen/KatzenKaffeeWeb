import React from 'react';
import '@/app/impressum/_styles/Impressum.css';

function Page() {
  return (
    <div className="impressum-container">
      <h1>Impressum</h1>
      <p><strong>Angabengemäß § 5 TMG</strong></p>
      <p>KatzenCafe GmbH<br/>
        Musterstraße 123<br/>
        Deutschland</p>

      <p><strong>Vertreten durch:</strong><br/>
        Geschäftsführer: Holzknecht Meinhard, Lauterbach Martin</p>

      <p><strong>Kontakt:</strong><br/>
        Telefon: +49 (0) 123 456 789<br/>
        E-Mail: schnurren@katzen-cafe.de</p>

      <p><strong>Registereintrag:</strong><br/>
        Eintragung im Handelsregister.<br/>
        Registergericht: Amtsgericht Katzenhausen<br/>
        Registernummer: HRB 987654</p>

      <p><strong>Umsatzsteuer-ID:</strong><br/>
        Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789</p>

      <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br/>
        Holzknecht Meinhard, Lauterbach Martin<br/>
        Musterstraße 123<br/>
        12345 Katzenhausen<br/>
        Deutschland</p>

      <h2>Haftungsausschluss</h2>
      <p><strong>Haftung für Inhalte</strong><br/>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen</p>

      <p><strong>Haftung für Links</strong><br/>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben</p>

      <p><strong>Urheberrecht</strong><br/>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht</p>

      {/* Katzenbilder hinzufügen */}
      <div className="cat-icons">
      </div>
    </div>
  );
}

export default Page;
