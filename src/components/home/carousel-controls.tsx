import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselLabels = { pause: string; play: string; goToSlide: string };

/** A pause/play button and one dot per slide. Dots are 24px hit targets; the button is 40px. */
export function CarouselControls({
  count,
  index,
  onSelect,
  playing,
  onToggle,
  showToggle,
  labels,
  className,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  playing: boolean;
  onToggle: () => void;
  /** Hidden for reduced motion, where there is no autoplay to pause. */
  showToggle: boolean;
  labels: CarouselLabels;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? labels.pause : labels.play}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-hero-tint text-hero-fg ring-1 ring-hero-line transition-colors hover:bg-white/20 motion-reduce:transition-none"
        >
          {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
        </button>
      )}
      <div className="flex items-center">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${labels.goToSlide} ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className="inline-flex h-6 min-w-6 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none",
                i === index ? "w-6 bg-brand-green" : "w-1.5 bg-white/35 hover:bg-white/60",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
