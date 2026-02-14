export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-primary" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Formatic Systems
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Formatic Systems. Done right or not at all.
        </p>
      </div>
    </footer>
  );
}
