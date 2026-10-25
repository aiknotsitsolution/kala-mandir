import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Heart, Music, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/SplitText";
import BrushStroke from "@/components/BrushStroke";
import GalleryLightbox, { ZoomCue } from "@/components/GalleryLightbox";
import { Reveal, RevealGroup } from "@/components/Reveal";
import {
    editorialImages,
    galleryCategories,
    galleryItems,
    instagramPosts,
} from "@/data/gallery";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

/**
 * ArtGallery — THE section the page is built around.
 *
 * A curated exhibition of authentic Kala Mandir student work, hung in a
 * masonry spread with category filters, an accessible lightbox and generous,
 * colourful detailing drawn from the artwork's own palette.
 */

/* Category → colour from the art palette (kept literal for Tailwind). */
const ACCENTS = {
    all: {
        solid: "bg-text text-white",
        dot: "bg-text",
        hover: "hover:text-text",
        text: "text-text",
    },
    art: {
        solid: "bg-rose text-white",
        dot: "bg-rose",
        hover: "hover:text-rose",
        text: "text-rose",
    },
    drawing: {
        solid: "bg-rose text-white",
        dot: "bg-rose",
        hover: "hover:text-rose",
        text: "text-rose",
    },
    painting: {
        solid: "bg-pink text-white",
        dot: "bg-pink",
        hover: "hover:text-pink",
        text: "text-pink",
    },
    craft: {
        solid: "bg-violet text-white",
        dot: "bg-violet",
        hover: "hover:text-violet",
        text: "text-violet",
    },
    dance: {
        solid: "bg-flame text-white",
        dot: "bg-flame",
        hover: "hover:text-flame",
        text: "text-flame",
    },
};

const CROPS = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
};

const danceShowcase = editorialImages.danceShowcase;
const danceGalleryItems = [
    { image: danceShowcase.wide, styles: [] },
    { image: danceShowcase.group, styles: ["kids", "bollywood"] },
    { image: danceShowcase.zumba, styles: ["freestyle", "contemporary"] },
    { image: danceShowcase.wedding, styles: ["wedding", "couple"] },
    { image: danceShowcase.duo, styles: ["couple", "bollywood"] },
    { image: instagramPosts[2], styles: ["bollywood", "freestyle", "contemporary"] },
    { image: instagramPosts[3], styles: ["kids", "contemporary"] },
].map(({ image, styles }, index) => ({
    ...image,
    id: `dance-gallery-${index}`,
    category: "dance",
    danceStyles: styles,
    caption: image.caption || image.alt,
}));

const danceVideos = [
    {
        id: "dance-video-couple",
        type: "video",
        src: "/assets/video/CoupleDance.mp4",
        alt: "Couple dance class video",
        caption: "Couple Dance",
        category: "dance",
        danceStyles: ["couple"],
    },
    {
        id: "dance-video-wedding",
        type: "video",
        src: "/assets/video/coupleDancewedding.mp4",
        alt: "Wedding couple dance video",
        caption: "Wedding Dance",
        category: "dance",
        danceStyles: ["wedding", "couple"],
    },
];


const danceCategories = [
    { id: "wedding", label: "Wedding Dance", icon: Users },
    { id: "couple", label: "Couple Dance", icon: Users },
    { id: "bollywood", label: "Bollywood", icon: Heart },
    { id: "freestyle", label: "Freestyle", icon: Music },
    { id: "kids", label: "Kids Dance", icon: Users },
    { id: "contemporary", label: "Contemporary", icon: Users },
];

export default function ArtGallery({ artOnly = false }) {
    const [activeMain, setActiveMain] = useState("all");
    const [activeArtCategory, setActiveArtCategory] = useState("all");
    const [activeDanceCategory, setActiveDanceCategory] = useState("all");
    const [openIndex, setOpenIndex] = useState(null);
    const reduce = useReducedMotion();
    const artItems = galleryItems.filter((item) => item.category !== "dance");
    const visibleItems = artOnly
        ? artItems
        : [...artItems, ...danceGalleryItems, ...danceVideos];
    const danceItems = visibleItems.filter((item) => item.category === "dance");
    const filtered =
        activeMain === "dance"
            ? activeDanceCategory === "all"
                ? danceItems
                : danceItems.filter((item) => item.danceStyles?.includes(activeDanceCategory))
            : activeMain === "art"
              ? activeArtCategory === "all"
                  ? artItems
                  : artItems.filter((item) => item.category === activeArtCategory)
              : visibleItems;
    const lightboxItems = filtered.filter((item) => item.type !== "video");

    return (
        <section
            id="gallery"
            data-tone="light"
            aria-labelledby="gallery-title"
            className="section relative bg-blossom"
        >
            <div
                data-tone="dark"
                className="relative isolate flex min-h-[22rem] items-center overflow-hidden bg-plum sm:min-h-[28rem] lg:min-h-[32rem]"
            >
                <SmartImage
                    image={danceShowcase.wide}
                    sizes="100vw"
                    className="absolute inset-0 h-full w-full"
                    position="50% 42%"
                    priority
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-plum/55 to-plum/15"
                />
                <div className="shell relative z-10 py-20">
                    <p className="eyebrow text-gold">Kala Mandir · Art & Dance</p>
                    <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] text-cream">
                        Student{" "}
                        <span className="italic text-pink">Gallery</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                        Explore the artwork and dance moments created in our studio.
                    </p>
                </div>
            </div>

            {/* Decorative corner paint-swatch — quiet, aria-hidden */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 hidden select-none lg:block"
            >
                <div className="flex gap-2 pt-10">
                    <span className="h-16 w-2.5 rounded-full bg-pink/70" />
                    <span className="h-16 w-2.5 rounded-full bg-rose/70" />
                    <span className="h-16 w-2.5 rounded-full bg-gold/80" />
                    <span className="h-16 w-2.5 rounded-full bg-violet/60" />
                </div>
            </div>

            <div className="shell">
                {/* Header */}
                <div className="flex flex-col gap-8">
                    <SectionHeading
                        id="gallery-title"
                        number="04"
                        eyebrow={artOnly ? "Art & craft exhibition" : "Student exhibition"}
                        title={
                            artOnly ? (
                                <>
                                    Ideas in colour,{" "}
                                    <span className="italic text-pink">made by hand.</span>
                                </>
                            ) : (
                                <>
                                    Made in{" "}
                                    <span className="italic text-pink">our classes</span>,
                                    kept with pride.
                                </>
                            )
                        }
                        standfirst={
                            artOnly
                                ? "Explore student drawings, paintings and craft projects from Kala Mandir. Each piece reflects a different way of looking closely, working with colour and making something by hand."
                                : "Browse student artwork, dance photography and videos from Kala Mandir classes."
                        }
                        className="max-w-[38rem]"
                    >
                        <BrushStroke className="mt-7 h-4 w-56 text-pink/70" />
                    </SectionHeading>

                    <Reveal delay={0.1}>
                        <div className="flex flex-col gap-4">
                            <div
                                role="group"
                                aria-label="Choose gallery collection"
                                className="flex flex-wrap gap-2"
                            >
                                {[
                                    { id: "all", label: "All Photos" },
                                    { id: "art", label: "Art" },
                                    ...(!artOnly ? [{ id: "dance", label: "Dance" }] : []),
                                ].map((category) => {
                                    const isActive = activeMain === category.id;
                                    const accent = ACCENTS[category.id] || ACCENTS.all;
                                    const count = visibleItems.filter((item) => (
                                        category.id === "all"
                                            ? true
                                            : category.id === "art"
                                              ? item.category !== "dance"
                                              : item.category === "dance"
                                    )).length;

                                    return (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveMain(category.id);
                                                setActiveArtCategory("all");
                                                setActiveDanceCategory("all");
                                                setOpenIndex(null);
                                            }}
                                            aria-pressed={isActive}
                                            className={cn(
                                                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? cn("border-transparent", accent.solid)
                                                    : cn(
                                                          "border-rule bg-white/70 text-muted hover:bg-white hover:text-text",
                                                          accent.hover,
                                                      ),
                                            )}
                                        >
                                            {category.label}
                                            <span className="ml-1.5 tabular-nums text-[11px] opacity-70">
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {activeMain === "art" && (
                                <div
                                    role="group"
                                    aria-label="Filter art photos by category"
                                    className="flex flex-wrap gap-2 pl-2"
                                >
                                    {galleryCategories.map((category) => {
                                        const isActive = activeArtCategory === category.id;
                                        const accent = ACCENTS[category.id] || ACCENTS.all;
                                        const count = visibleItems.filter((item) => (
                                            item.category !== "dance" &&
                                            (category.id === "all" || item.category === category.id)
                                        )).length;

                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() => {
                                                    setActiveArtCategory(category.id);
                                                    setOpenIndex(null);
                                                }}
                                                aria-pressed={isActive}
                                                className={cn(
                                                    "rounded-full border px-4 py-2 text-[13px] transition-all duration-200",
                                                    isActive
                                                        ? cn("border-transparent", accent.solid)
                                                        : cn(
                                                              "border-rule bg-transparent text-muted hover:bg-white hover:text-text",
                                                              accent.hover,
                                                          ),
                                                )}
                                            >
                                                {category.label}
                                                <span className="ml-1.5 tabular-nums text-[11px] opacity-60">
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {activeMain === "dance" && (
                                <div
                                    role="group"
                                    aria-label="Filter dance photos by class"
                                    className="flex flex-wrap gap-2 pl-2"
                                >
                                    {[
                                        { id: "all", label: "All Dance", icon: Music },
                                        ...danceCategories,
                                    ].map(({ id, label, icon: Icon }) => {
                                        const isActive = activeDanceCategory === id;
                                        const count = visibleItems.filter((item) => (
                                            item.category === "dance" &&
                                            (id === "all" || item.danceStyles?.includes(id))
                                        )).length;

                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                onClick={() => {
                                                    setActiveDanceCategory(id);
                                                    setOpenIndex(null);
                                                }}
                                                aria-pressed={isActive}
                                                className={cn(
                                                    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] transition-all duration-200",
                                                    isActive
                                                        ? "border-transparent bg-flame text-white"
                                                        : "border-rule bg-transparent text-muted hover:bg-white hover:text-flame",
                                                )}
                                            >
                                                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                                {label}
                                                <span className="ml-0.5 tabular-nums text-[11px] opacity-70">
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>

                {/* Provenance note — everything here is the institute's own work */}
                <Reveal delay={0.15}>
                    <p className="mt-6 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
                        <span
                            aria-hidden="true"
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pink motion-safe:animate-pulse"
                        />
                        <span className="max-w-[54rem]">
                            The photos, videos and student work shown here are{" "}
                            <span className="font-medium text-text">
                                from Kala Mandir classes
                            </span>
                            , supplied by the institute.
                        </span>
                    </p>
                </Reveal>

                {/* Masonry exhibition wall — calm, art-first, no distortion */}
                <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:mt-14 lg:columns-3 lg:gap-6">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filtered.map((item) => {
                            const accent = ACCENTS[item.category] || ACCENTS.all;
                            return (
                                <motion.figure
                                    key={item.id}
                                    layout={!reduce}
                                    initial={
                                        reduce
                                            ? false
                                            : { opacity: 0, y: 18, scale: 0.985 }
                                    }
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={
                                        reduce
                                            ? { opacity: 0 }
                                            : { opacity: 0, y: -8, scale: 0.985 }
                                    }
                                    transition={{ duration: 0.45, ease }}
                                    className="group mb-5 break-inside-avoid lg:mb-6"
                                >
                                    {item.type === "video" ? (
                                        <video
                                            src={item.src}
                                            aria-label={item.alt}
                                            controls
                                            playsInline
                                            preload="metadata"
                                            className="tile-lift aspect-[4/5] w-full rounded-[14px] bg-plum object-cover"
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setOpenIndex(lightboxItems.indexOf(item))}
                                            className="relative block w-full overflow-hidden rounded-[14px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-blossom"
                                            aria-label={`Open in gallery: ${item.caption}`}
                                        >
                                            <SmartImage
                                                image={item}
                                                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                                                className={cn("tile-lift w-full", CROPS[item.crop] || "aspect-[4/5]")}
                                                position={item.position || "50% 45%"}
                                                imgClassName="transition-transform duration-[650ms] ease-out group-hover:scale-[1.05] motion-reduce:transform-none"
                                            />
                                            <ZoomCue />
                                            {/* Caption overlay — appears on hover/focus only,
                                                the caption also exists as real text below. */}
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-4 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            >
                                                <span className="text-[13.5px] font-medium text-white">
                                                    {item.caption}
                                                </span>
                                                <span className="eyebrow flex items-center gap-1.5 text-white/85">
                                                    <span
                                                        className={cn(
                                                            "h-1.5 w-1.5 rounded-full",
                                                            accent.dot,
                                                        )}
                                                    />
                                                    {item.category}
                                                </span>
                                            </span>
                                        </button>
                                    )}

                                    {/* Always-visible caption for a11y + print feel */}
                                    <figcaption className="relative mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-2.5">
                                        {/* Pigment rule — the piece's own category
                            colour laid over the hairline. */}
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "absolute -top-px left-0 h-[2px] w-10 origin-left transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-x-[2.6] motion-reduce:group-hover:scale-x-100",
                                                accent.dot,
                                            )}
                                        />
                                        <span className="text-[14px] leading-snug text-text/85">
                                            {item.caption}
                                        </span>
                                        <span className="eyebrow flex shrink-0 items-center gap-1.5">
                                            <span
                                                aria-hidden="true"
                                                className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    accent.dot,
                                                )}
                                            />
                                            <span className={accent.text}>
                                                {item.category}
                                            </span>
                                        </span>
                                    </figcaption>
                                </motion.figure>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Enquiry CTA under the exhibition */}
                <RevealGroup className="mt-14 flex flex-col items-start gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[30rem] font-display text-[1.45rem] leading-snug text-text sm:text-[1.7rem]">
                        <SplitText text="Want work like this on your wall?" />
                    </p>
                    <div className="flex flex-wrap gap-x-7 gap-y-4">
                        <Magnetic>
                            <Link
                                to="/contact#enquiry"
                                className="btn-wipe group inline-flex items-center gap-2 rounded-[11px] bg-rose px-6 py-3.5 text-[15px] font-medium text-white"
                                style={{ "--wipe-fill": "var(--color-pink)" }}
                            >
                                <span className="btn-wipe__label" data-text="Enquire about art classes">
                                    <span className="btn-wipe__text">Enquire about art classes</span>
                                </span>
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </Magnetic>
                        <Link
                            to={artOnly ? "/art#art" : "/art#art-detail"}
                            className="rule-link text-[15px] text-text hover:text-rose"
                        >
                            {artOnly ? "Explore art classes" : "More about the syllabus"}
                        </Link>
                    </div>
                </RevealGroup>

                {/* Empty state (defensive — filters always match at least one) */}
                {filtered.length === 0 && (
                    <div className="mt-14 rounded-[14px] border border-dashed border-rule px-6 py-16 text-center">
                        <p className="font-display text-[1.6rem] text-text">
                            Nothing in this category yet.
                        </p>
                        <p className="mt-2 text-[15px] text-muted">
                            New work is added as it is approved.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveMain("all");
                                setActiveArtCategory("all");
                                setActiveDanceCategory("all");
                            }}
                            className="rule-link mt-6 text-[15px] text-rose"
                        >
                            Show all work
                        </button>
                    </div>
                )}
            </div>

            <GalleryLightbox
                items={lightboxItems}
                index={openIndex}
                onClose={() => setOpenIndex(null)}
                onNavigate={setOpenIndex}
            />
        </section>
    );
}
