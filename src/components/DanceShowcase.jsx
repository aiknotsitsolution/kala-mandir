

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Music4, Users, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/SmartImage";
import SectionHeading from "@/components/SectionHeading";
import Magnetic from "@/components/Magnetic";
import { Reveal, RevealGroup, RevealItem, MediaMask } from "@/components/Reveal";
import { editorialImages } from "@/data/gallery";
import { contactLinks } from "@/data/siteConfig";
import { revealKinetic } from "@/lib/motion";
import { useIsDesktop } from "@/hooks";

const HIGHLIGHTS = [
  {
    icon: Users,
    title: "Dance for different age groups",
    body: "Classes are grouped so beginners, children and adults each work at a pace that suits them.",
  },
  {
    icon: Music4,
    title: "Zumba",
    body: "Music-led sessions where fitness arrives as a side effect of moving well.",
  },
  {
    icon: HeartHandshake,
    title: "Wedding & event choreography",
    body: "Routines built around your song, your people and your stage — practised until they feel natural.",
  },
];

/**
 * DanceShowcase — refined energetic section
 */
export default function DanceShowcase() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const parallax = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const { danceShowcase } = editorialImages;

  return (
    <section
      id="dance"
      data-tone="dark"
      ref={ref}
      aria-labelledby="dance-title"
      className="section relative isolate overflow-hidden bg-plum"
    >
      <div className="relative">
        <div className="shell">
          {/* Heading */}
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-7">
              <SectionHeading
                id="dance-title"
                tone="dark"
                number="05"
                eyebrow="Dance experience"
                title={
                  <>
                    A more energetic{" "}
                    <span className="italic text-gold">rhythm</span>.
                  </>
                }
                standfirst="Wider frames, longer lines, and the moment a rehearsal becomes a performance."
              />
            </div>

            <Reveal
              delay={0.12}
              variants={revealKinetic}
              className="lg:col-span-4 lg:col-start-9 lg:self-end"
            >
              <p className="border-l border-white/20 pl-5 text-[1rem] leading-[1.7] text-white/70">
                Dance is taught as a craft: posture, timing, control and then
                freedom — practised in front of mirrors and finished on stage.
              </p>
            </Reveal>
          </div>

          {/* Full-bleed image band */}
          <div className="relative mt-12 overflow-hidden rounded-[22px] border border-gold/25 bg-charcoal shadow-[0_28px_70px_-34px_rgba(0,0,0,0.75)] sm:mt-16 lg:mt-20 lg:rounded-[28px]">
            <MediaMask>
              <motion.div
                style={parallax ? { y: bandY } : undefined}
                className="scale-[1.08]"
              >
                <SmartImage
                  image={danceShowcase.wide}
                  sizes="92vw"
                  className="aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
                  position="50% 34%"
                />
              </motion.div>
            </MediaMask>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(53,21,54,0.9)_0%,rgba(53,21,54,0.25)_48%,transparent_72%)]"
            />

            <Reveal
              variants={revealKinetic}
              className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-2 p-6 sm:p-9 lg:p-12"
            >
              <p className="eyebrow text-gold tracking-widest">On the floor</p>
              <p className="max-w-[28rem] font-display text-[clamp(1.6rem,3.5vw,2.7rem)] leading-[1.08] text-white sm:max-w-[36rem]">
                “Practice until the count disappears.”
              </p>
            </Reveal>
          </div>

          {/* Supporting images — better rhythm */}
          <div className="mt-5 grid grid-cols-12 gap-3 rounded-[22px] border border-white/10 bg-plum-2/35 p-3 sm:mt-6 sm:gap-5 sm:p-5 lg:rounded-[28px]">
            <Reveal variants={revealKinetic} className="col-span-7 sm:col-span-4">
              <SmartImage
                image={danceShowcase.group}
                sizes="(max-width: 639px) 60vw, 30vw"
                className="aspect-[4/3] w-full rounded-xl border border-gold/20 shadow-[0_14px_36px_-22px_rgba(0,0,0,0.65)]"
              />
            </Reveal>

            <Reveal
              delay={0.08}
              variants={revealKinetic}
              className="col-span-5 sm:col-span-4"
            >
              <SmartImage
                image={danceShowcase.zumba}
                sizes="(max-width: 639px) 40vw, 30vw"
                className="aspect-[3/4] w-full rounded-xl border border-flame/25 shadow-[0_14px_36px_-22px_rgba(0,0,0,0.65)]"
                position="50% 30%"
              />
            </Reveal>

            <Reveal
              delay={0.16}
              variants={revealKinetic}
              className="col-span-12 sm:col-span-4"
            >
              <SmartImage
                image={danceShowcase.wedding}
                sizes="(max-width: 639px) 92vw, 30vw"
                className="aspect-[16/10] w-full rounded-xl border border-gold/20 shadow-[0_14px_36px_-22px_rgba(0,0,0,0.65)] sm:aspect-[4/3]"
              />
            </Reveal>
          </div>

          {/* Highlights */}
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, body }, i) => (
              <RevealItem
                key={title}
                variants={revealKinetic}
                className="rounded-[18px] border border-gold/30 bg-cream p-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.5)] sm:p-6 lg:p-7"
              >
                <div className="flex items-start gap-5">
                  <span className="eyebrow mt-1.5 tabular-nums text-rose/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <Icon
                        className="h-4.5 w-4.5 shrink-0 text-rose"
                        aria-hidden="true"
                      />
                      <h3 className="font-display text-[1.4rem] leading-tight text-plum sm:text-[1.55rem]">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[0.95rem] leading-[1.7] text-text/70">
                      {body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* CTA */}
          <Reveal
            delay={0.1}
            variants={revealKinetic}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/15 pt-10"
          >
            <Magnetic>
              <Link
                to="/contact#enquiry"
                className="btn-wipe group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-ink"
                style={{ "--wipe-fill": "var(--color-gold)" }}
              >
                <span
                  className="btn-wipe__label"
                  data-text="Enquire about choreography"
                >
                  <span className="btn-wipe__text">
                    Enquire about choreography
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Magnetic>

            <Link
              to="/gallery#gallery"
              className="rule-link text-[15px] text-white/65 transition-colors hover:text-white"
            >
              See the students in the gallery
            </Link>

            <a
              href={contactLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rule-link text-[15px] text-white/65 transition-colors hover:text-white"
            >
              Watch class videos on Instagram
            </a>

            <a
              href={contactLinks.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="rule-link text-[15px] text-white/65 transition-colors hover:text-white"
            >
              More videos on Google Maps
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}