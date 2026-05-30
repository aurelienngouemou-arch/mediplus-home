export default function TrustBar() {
  return (
    <div className="border-y border-border bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center gap-2 text-center">
          <div
            className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
            Toutes les mutuelles belges
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground ml-1.5">
            · Convention avec toutes les mutuelles belges
          </span>
        </div>
      </div>
    </div>
  );
}
