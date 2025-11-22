export default function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-lg h-16">
      <div className="mx-auto flex sm:gap-10 gap-2 items-center p-4 relative">
        <div className="text-2xl text-primary font-bold">Hallo</div>

        {/* Navigation statique */}
        <nav className="hidden md:flex gap-4 relative">
          <span className="text-accent-foreground/60 font-medium">Accueil</span>
          <span className="text-accent-foreground/60 font-medium">
            Communauté
          </span>
          <span className="text-accent-foreground/60 font-medium">Emplois</span>
          <span className="text-accent-foreground/60 font-medium">
            Immobilier
          </span>
          <span className="font-medium px-3 py-1.5 rounded-full border-2 text-transparent bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text">
            Passer au Premium
          </span>
        </nav>

        <span className="flex-1" />

        <div className="flex items-center sm:gap-4 gap-2">
          {/* Auth skeleton */}
          <div className="hidden sm:flex gap-2">
            <div className="h-9 w-20 bg-muted animate-pulse rounded" />
            <div className="h-9 w-24 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-9 w-20 bg-muted animate-pulse rounded sm:hidden" />
          <div className="h-9 w-9 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </header>
  );
}
