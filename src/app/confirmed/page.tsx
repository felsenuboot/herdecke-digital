import Link from 'next/link';

export default async function ConfirmedPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  const failed = ok === '0';
  return (
    <section className="section prose">
      {failed ? (
        <>
          <h1>Bestätigung fehlgeschlagen</h1>
          <p>
            Dieser Bestätigungslink ist ungültig oder abgelaufen. Bitte{' '}
            <Link href="/">melde dich erneut an</Link>.
          </p>
        </>
      ) : (
        <>
          <h1>Anmeldung bestätigt ✓</h1>
          <p>
            Alles klar — deine Benachrichtigungen sind jetzt aktiv. Du kannst dich jederzeit über den Link in jeder
            E-Mail wieder abmelden.
          </p>
          <p>
            <Link href="/">Zur Startseite</Link>
          </p>
        </>
      )}
    </section>
  );
}
