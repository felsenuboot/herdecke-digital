export const metadata = { title: 'Datenschutz — Digital.Herdecke' };

export default function DatenschutzPage() {
  return (
    <section className="section prose">
      <h1>Datenschutzerklärung</h1>

      <p className="note">
        <strong>TODO (vor dem öffentlichen Betrieb ausfüllen):</strong> Diese Seite ist eine Vorlage. Ergänze
        deine Kontaktdaten als Verantwortlicher, prüfe die Angaben (ggf. mit fachkundiger Beratung) und passe sie
        an deinen tatsächlichen Betrieb an. In Deutschland sind Datenschutzerklärung und Impressum für ein
        öffentlich erreichbares Angebot rechtlich erforderlich.
      </p>

      <h2>Verantwortlicher</h2>
      <p>[Name, Anschrift, E-Mail des Betreibers]</p>

      <h2>Welche Daten wir verarbeiten</h2>
      <p>
        Für die <strong>Stadtrat-Benachrichtigungen</strong> speichern wir deine <strong>E-Mail-Adresse</strong> und
        deine <strong>Stichwörter</strong>. Für den <strong>Müll-Wecker</strong> speichern wir deine{' '}
        <strong>E-Mail-Adresse</strong> sowie <strong>Straße und Hausnummer</strong> (zur Ermittlung deiner
        Abfuhrtermine). Dazu kommen technische Zeitstempel (Anmeldung, Bestätigung). Rechtsgrundlage ist deine
        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du im Double-Opt-In-Verfahren erteilst.
      </p>

      <h2>E-Mail-Versand</h2>
      <p>
        Der Versand der Bestätigungs- und Benachrichtigungs-E-Mails erfolgt über den Dienstleister Resend
        (Auftragsverarbeiter). Dabei wird deine E-Mail-Adresse an diesen Dienst übermittelt.
      </p>

      <h2>Datenquelle</h2>
      <p>
        Die angezeigten Tagesordnungen stammen aus dem öffentlichen Ratsinformationssystem der Stadt Herdecke.
        Digital.Herdecke ist ein unabhängiges Bürger-Projekt und keine offizielle Seite der Stadt.
      </p>

      <h2>Standort & lokale Speicherung</h2>
      <p>
        Beim Müll-Wecker kannst du optional „Meinen Standort verwenden". Dein Gerät übermittelt dann einmalig deine
        Koordinaten, die ausschließlich zur Ermittlung deiner Straße per Reverse-Geocoding über
        OpenStreetMap/Nominatim verarbeitet und <strong>nicht gespeichert</strong> werden. Die Standortabfrage
        erfolgt nur auf deine ausdrückliche Aktion hin.
      </p>
      <p>
        Deine zuletzt genutzte Adresse und Haltestelle werden ausschließlich <strong>lokal in deinem Browser</strong>{' '}
        (localStorage) gespeichert, damit du sie nicht erneut eingeben musst. Das ist rein funktionale Speicherung —
        wir setzen <strong>keine Tracking-Cookies</strong> und übertragen diese Daten nicht an uns.
      </p>

      <h2>Speicherdauer & Widerruf</h2>
      <p>
        Du kannst deine Einwilligung jederzeit widerrufen, indem du den Abmeldelink in jeder E-Mail anklickst.
        Danach werden deine Daten gelöscht.
      </p>

      <h2>Deine Rechte</h2>
      <p>
        Dir stehen die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
        Datenübertragbarkeit und Beschwerde bei einer Aufsichtsbehörde zu.
      </p>
    </section>
  );
}
