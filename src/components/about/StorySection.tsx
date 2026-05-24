import FadeIn from "@/components/animations/FadeIn";

export default function StorySection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3 text-center">
            Notre histoire
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-6 text-center">
            Une vocation, un territoire, une équipe
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Fondée il y a plus de dix ans, notre équipe d&apos;infirmiers à domicile s&apos;est donné
              pour mission de mettre la qualité des soins hospitaliers au service du
              maintien à domicile dans la région d&apos;Overijse, Hoeilaart et Tervuren.
            </p>
            <p>
              Tout a commencé avec une conviction simple : les patients méritent de
              recevoir des soins excellents chez eux, dans leur environnement familier,
              entourés de leurs proches. Pas seulement parce que c&apos;est plus confortable —
              mais parce que c&apos;est souvent meilleur pour leur rétablissement et leur
              qualité de vie.
            </p>
            <p>
              Au fil des années, notre équipe a grandi, nos compétences se sont enrichies,
              mais notre approche est restée la même : des soins techniques rigoureux,
              une présence humaine attentive et une écoute sans faille des besoins de
              chaque patient et de sa famille.
            </p>
            <p>
              Aujourd&apos;hui, nous accompagnons plusieurs centaines de patients chaque année
              dans les trois communes, avec une équipe stable, formée en continu et
              profondément attachée à ce territoire du Brabant flamand.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
