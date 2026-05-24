const TRUST_ITEMS = [
  {
    name: "INAMI / RIZIV",
    detail: "Agréé et conventionné",
  },
  {
    name: "Mutuelles belges",
    detail: "Remboursement intégral",
  },
  {
    name: "Croix-Rouge",
    detail: "Formations certifiées",
  },
  {
    name: "Ordre des infirmiers",
    detail: "Membre actif",
  },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {TRUST_ITEMS.map((item, i) => (
            <div key={item.name} className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                    {item.name}
                  </span>
                  <span className="hidden sm:inline text-xs text-muted-foreground ml-1.5">
                    · {item.detail}
                  </span>
                </div>
              </div>
              {i < TRUST_ITEMS.length - 1 && (
                <div className="hidden lg:block w-px h-4 bg-border" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
