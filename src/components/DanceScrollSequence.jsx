

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

/**
 * DanceScrollSequence — scroll-scrubbed dancer (refined)
 */

const FRAME_COUNT = 48;
const BASE = "/assets/dance-seq";
const frames = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `${BASE}/frame-${String(i + 1).padStart(2, "0")}.webp`,
);

const clamp = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

export default function DanceScrollSequence() {
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload frames
  useEffect(() => {
    const imgs = frames.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    Promise.allSettled(
      imgs.map(
        (img) =>
          img.complete ||
          new Promise((res) => {
            img.onload = img.onerror = res;
          }),
      ),
    ).then(() => setReady(true));

    return () => imgs.forEach((img) => (img.onload = img.onerror = null));
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
    const next = Math.round(progress * (FRAME_COUNT - 1));

    setFrame((prev) => (prev === next ? prev : next));

    if (railRef.current) {
      railRef.current.style.transform = `scaleX(${progress})`;
    }
  }, []);

  useEffect(() => {
    if (reduce) return;

    let last = 0;
    const onScroll = () => {
      const now = performance.now();
      if (now - last < 16) return;
      last = now;
      measure();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure, reduce]);

  const activeSrc = frames[reduce ? 0 : frame];

  return (
    <section
      id="dance-motion"
      data-tone="dark"
      aria-labelledby="dance-motion-title"
      className="relative bg-plum"
    >
      <div
        ref={trackRef}
        className={reduce ? "relative" : "relative h-[300vh] sm:h-[340vh] lg:h-[380vh]"}
      >
        <div
          className={
            reduce
              ? "relative"
              : "sticky top-0 flex h-screen items-center overflow-hidden"
          }
        >
          {/* Soft cinematic glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_30%,rgba(251,191,36,0.14)_0%,rgba(74,29,76,0.5)_42%,var(--color-plum)_75%)]"
          />

          <div className="shell relative w-full">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-x-16">
              {/* Copy */}
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="eyebrow text-gold tracking-widest">Motion study</p>

                  <h2
                    id="dance-motion-title"
                    className="mt-5 font-display text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.02] text-white"
                  >
                    Keep scrolling —{" "}
                    <span className="italic text-flame">she keeps dancing.</span>
                  </h2>

                  <p className="mt-6 max-w-[28rem] text-[1.05rem] leading-[1.75] text-white/70">
                    A single turn, played out across the page. Every frame is
                    drawn from the institute’s own dance footage — the same
                    spin, from first count to last.
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link
                      to="/contact#enquiry"
                      className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-ink transition-all duration-300 hover:bg-cream hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
                    >
                      Enquire about dance
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>

                    <Link
                      to="/dance#dance"
                      className="rule-link text-[15px] text-white/65 transition-colors hover:text-white"
                    >
                      See the studio
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Scrubbed frame */}
              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal shadow-[0_25px_60px_-20px_rgba(0,0,0,0.55)]">
                    <div className="relative aspect-[16/10] w-full">
                      <img
                        src={activeSrc}
                        alt="A classical dancer turning through a full spin inside a warmly lit palace arch."
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                      />
                      {!ready && (
                        <span className="km-skeleton absolute inset-0" />
                      )}
                    </div>

                    {/* Progress rail */}
                    {!reduce && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10"
                      >
                        <div
                          ref={railRef}
                          className="h-full w-full origin-left bg-gradient-to-r from-gold via-amber-300 to-flame shadow-[0_0_12px_rgba(251,191,36,0.45)]"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </div>
                    )}
                  </figure>
                </Reveal>

                <p className="mt-4 flex items-center gap-2.5 text-[13px] tracking-wide text-white/45">
                  <span
                    aria-hidden="true"
                    className={
                      reduce
                        ? "h-1.5 w-1.5 rounded-full bg-gold"
                        : "h-1.5 w-1.5 rounded-full bg-gold motion-safe:animate-pulse"
                    }
                  />
                  {reduce
                    ? "A still from the dance reel."
                    : `Scroll to advance · ${String(frame + 1).padStart(2, "0")} / ${FRAME_COUNT}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}