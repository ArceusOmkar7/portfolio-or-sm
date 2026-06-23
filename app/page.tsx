import { BentoGridContainer } from "./components/BentoGridContainer"
import { BentoCard } from "./components/BentoCard"

export default function Page() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8 md:p-12">
      {/* 
        Outer container to mimic the rounded border from the sketch.
        The max-width ensures it looks like a card on larger screens.
      */}
      <div className="w-full max-w-6xl rounded-[2.5rem] border border-border/60 bg-card/30 p-6 shadow-xl backdrop-blur-sm sm:p-10">
        
        <BentoGridContainer
          gap={20}
          dense={false}
          className="grid-cols-1 sm:grid-cols-7 sm:[grid-template-rows:160px_260px]"
        >
          {/* 
            Top-Left: Name & Location Card
            Spans 3 columns in the first row.
          */}
          <BentoCard
            interactive
            className="flex flex-col justify-center gap-1 sm:col-span-3 sm:row-start-1"
          >
            <div className="flex items-baseline justify-between">
              <h1 className="text-2xl font-bold tracking-tight font-heading text-foreground">Omkar Mahindrakar</h1>
              <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">20 M</span>
            </div>
            <p className="text-lg text-muted-foreground/80 font-medium">Vadodara, Gujarat</p>
          </BentoCard>

          {/* 
            Center: GIF/Visual Card
            Spans 1 column and 2 rows (tall card) to match the verticality in the sketch.
          */}
          <BentoCard
            surface="glass"
            interactive
            className="flex items-center justify-center text-center sm:col-span-1 sm:col-start-4 sm:row-span-2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <div className="w-6 h-6 rounded-full bg-primary/20" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Some GIF Here</p>
            </div>
          </BentoCard>

          {/* 
            Top-Right: About Card
            Spans 3 columns in the first row.
          */}
          <BentoCard
            interactive
            className="flex flex-col gap-3 sm:col-span-3 sm:col-start-5 sm:row-start-1"
          >
            <h2 className="text-xl font-bold font-heading text-foreground">About</h2>
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              Student at Navrachana University, loves exploring ML/DL stuff.
              While the models are training I watch anime.
            </p>
          </BentoCard>

          {/* 
            Bottom-Left: Major Project Card
            Spans 3 columns in the second row.
          */}
          <BentoCard
            interactive
            className="flex items-center justify-center group sm:col-span-3 sm:row-start-2"
          >
            <div className="text-center">
              <p className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors text-foreground">One top project</p>
              <div className="mt-2 h-1 w-0 group-hover:w-full bg-primary/40 transition-all duration-300 mx-auto rounded-full" />
            </div>
          </BentoCard>

          {/* 
            Bottom-Right (Inner): Open Source Card
            Spans 2 columns in the second row.
          */}
          <BentoCard
            interactive
            className="flex items-center justify-center sm:col-span-2 sm:col-start-5 sm:row-start-2"
          >
            <p className="text-lg font-bold text-center text-foreground">Open source contribution</p>
          </BentoCard>

          {/* 
            Bottom-Right (Edge): Socials Card
            Spans 1 column in the second row.
          */}
          <BentoCard
            interactive
            surface="glass"
            className="flex items-center justify-center sm:col-span-1 sm:col-start-7 sm:row-start-2"
          >
            <p className="text-sm font-bold rotate-0 sm:-rotate-90 uppercase tracking-tighter text-foreground">Socials</p>
          </BentoCard>
        </BentoGridContainer>
      </div>
    </main>
  )
}
