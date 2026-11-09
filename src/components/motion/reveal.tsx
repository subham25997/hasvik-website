import type { ComponentProps, CSSProperties } from "react";

/**
 * Scroll-reveal primitives. These are plain server-rendered elements; a single
 * IntersectionObserver (<RevealObserver/>) adds `data-revealed` when they
 * enter the viewport, and CSS in globals.css does the fade/rise + stagger.
 *
 * Why not Motion here: ~60 `whileInView` wrappers on the homepage cost ~250 ms of
 * main-thread hydration on mid-range phones. Motion is still used for the
 * interactive pieces (carousels, rotating text).
 *
 * Content is only hidden when JS is running (`html.js`), and reduced-motion
 * users get it immediately.
 */
type Props = ComponentProps<"div"> & { delay?: number };

export function Reveal({ delay = 0, style, ...props }: Props) {
  return (
    <div
      data-reveal=""
      style={delay ? ({ ...style, "--reveal-delay": `${delay}s` } as CSSProperties) : style}
      {...props}
      suppressHydrationWarning
    />
  );
}

/** Children marked with <RevealItem> stagger in 60 ms apart (see CSS). */
export function RevealGroup(props: ComponentProps<"div">) {
  return <div data-reveal-group="" {...props} />;
}

export function RevealItem(props: ComponentProps<"div">) {
  return <div data-reveal="item" {...props} suppressHydrationWarning />;
}
