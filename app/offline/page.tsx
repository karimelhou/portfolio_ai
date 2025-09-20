export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 py-20 text-center text-white">
      <div className="hero-fallback w-full max-w-xl p-10">
        <h1 className="font-display text-3xl">Vous êtes hors ligne</h1>
        <p className="mt-4 text-sm text-white/70">
          Vérifiez votre connexion internet puis rechargez la page. / Check your connection and reload when you’re back online.
        </p>
      </div>
    </main>
  );
}
