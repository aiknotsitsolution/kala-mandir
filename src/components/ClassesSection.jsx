
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { MediaMask, Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import ArtBackdrop from "@/components/Artbackdrop";
import { classes } from "@/data/classes";
import { editorialImages, galleryItems } from "@/data/gallery";
import SmartImage from "@/components/SmartImage";
import { ArrowUpRight, Palette, Users, Sparkles, Play, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * ClassesSection — "Discover Our Classes".
 * `#classes` is the hero CTA target; `#art-detail` is the deep-dive below.
 *
 * v2: clearer copy, reassurance row for first-time parents/students,
 * "how a class works" steps, and a closing enquiry panel.
 */

const reassurances = [
    {
        icon: Palette,
        title: "Start from zero",
        text: "No experience needed. We begin with looking closely, not with talent.",
    },
    {
        icon: Users,
        title: "Every age, its own pace",
        text: "Dance classes are arranged for different age groups, so everyone starts comfortably.",
    },
    {
        icon: Sparkles,
        title: "Brush and beat, one roof",
        text: "Paint on Monday, dance on Friday. Try more than one at Kala Mandir, Sector 52.",
    },
];

const steps = [
    {
        title: "Look closely",
        text: "Every class starts with observation: shapes, light, posture, rhythm.",
    },
    {
        title: "Practise the hand",
        text: "Short exercises build control, in pencil, paint or movement.",
    },
    {
        title: "Make it yours",
        text: "Then you apply it to a piece of your own: a painting, a craft, a routine.",
    },
];

const shadow = "shadow-[0_18px_40px_-18px_rgba(120,40,80,0.35)]";
const artMosaic = [
    ...editorialImages.artDetail,
    ...galleryItems.filter((artwork) => artwork.id === "km-artwork-07"),
];

export default function ClassesSection({ artOnly = false, showArtDetail = true }) {
    const visibleClasses = artOnly ? classes.slice(0, 2) : classes;
    const [openVideo, setOpenVideo] = useState(null);
    const choreographyVideoRef = useRef(null);

    const playPreview = () => {
        const video = choreographyVideoRef.current;
        if (!video) return;
        video.muted = true;
        video.play().catch(() => {});
    };

    const stopPreview = () => {
        const video = choreographyVideoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
    };

    useEffect(() => {
        if (!openVideo) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const handleKeyDown = (event) => {
            if (event.key === "Escape") setOpenVideo(null);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openVideo]);

    return (
        <section
            id="art"
            data-tone="light"
            aria-labelledby="classes-title"
            className="section relative overflow-hidden bg-white"
        >
            {artOnly && <ArtBackdrop variant="classes" />}

            {/* Anchor targeted by the hero "Explore Classes" CTA */}
            <div
                id="classes"
                aria-hidden="true"
                className="pointer-events-none absolute top-0 scroll-mt-28"
            />

            <div className="shell relative z-10">
                {/* ── Heading ── */}
                <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-12">
                    <div className="lg:col-span-7">
                        <SectionHeading
                            id="classes-title"
                            eyebrow={artOnly ? "Art classes" : "Our classes"}
                            title={
                                artOnly ? (
                                    <>
                                        Learn to see.{" "}
                                        <span className="italic text-pink">
                                            Then learn to make.
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Pick up a brush.{" "}
                                        <span className="italic text-pink">
                                            Or find your rhythm.
                                        </span>
                                    </>
                                )
                            }
                            standfirst={
                                artOnly
                                    ? "Sketching, portrait drawing, oil and acrylic painting, and art craft, taught at Kala Mandir, Noida."
                                    : "Sketching, painting, craft, dance, Zumba and choreography. Choose one, or try a few. Each is taught as its own discipline."
                            }
                        />
                    </div>

                    <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
                        <p className="border-l-2 border-pink/60 pl-5 text-[1rem] leading-[1.7] text-muted">
                            Every class starts with looking closely and practising
                            often. No experience needed, no talent required. Just
                            come and begin.
                        </p>
                    </Reveal>
                </div>

                {/* ── Reassurance row (answers the first-time visitor's doubts) ── */}
                {!artOnly && (
                    <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16">
                        {reassurances.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="flex gap-4 rounded-[18px] border border-rule bg-white/80 p-5 backdrop-blur-sm"
                            >
                                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blossom text-rose">
                                    <Icon aria-hidden="true" className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-[1rem] font-medium text-text">{title}</h3>
                                    <p className="mt-1 text-[0.925rem] leading-[1.6] text-muted">{text}</p>
                                </div>
                            </div>
                        ))}
                    </RevealGroup>
                )}

                {/* ── Alternating class features ── */}
                <RevealGroup
                    amount={0.01}
                    className="mt-14 space-y-14 lg:mt-20 lg:space-y-24"
                >
                    {visibleClasses.map((item, index) => {
                        const imageRight = index % 2 === 1;
                        return (
                            <RevealItem
                                key={item.id}
                                as="article"
                                id={`programme-${item.id}`}
                                aria-labelledby={`class-title-${item.id}`}
                                className="grid grid-cols-1 items-center gap-7 sm:gap-9 lg:grid-cols-2 lg:gap-14 xl:gap-20"
                            >
                                <Reveal
                                    delay={imageRight ? 0.12 : 0}
                                    className={imageRight ? "lg:order-2" : undefined}
                                >
                                    <MediaMask className="rounded-[20px]">
                                        {item.id === "art-drawing" ? (
                                            <div
                                                role="group"
                                                aria-label="A selection of Kala Mandir student artwork"
                                                className="grid aspect-[4/3] grid-cols-6 grid-rows-2 gap-2 rounded-[20px] bg-blossom p-2.5 sm:gap-3 sm:p-3"
                                            >
                                                {artMosaic.map(
                                                    (artwork, artworkIndex) => (
                                                        <figure
                                                            key={artwork.id}
                                                            className={`overflow-hidden rounded-[12px] border border-white/80 bg-white p-1.5 shadow-[0_14px_30px_-18px_rgba(120,40,80,0.45)] motion-safe:animate-[artwork-float_5s_ease-in-out_infinite] sm:rounded-[14px] sm:p-2 ${
                                                                artworkIndex < 2
                                                                    ? "col-span-3"
                                                                    : "col-span-2"
                                                            }`}
                                                            style={{
                                                                animationDelay: `${artworkIndex * -0.8}s`,
                                                            }}
                                                        >
                                                            <SmartImage
                                                                image={artwork}
                                                                sizes="(max-width: 1023px) 30vw, 15vw"
                                                                fit="contain"
                                                                className="h-full w-full rounded-[9px] bg-[#fffafc]"
                                                                imgClassName="transition-transform duration-500 hover:scale-[1.04]"
                                                            />
                                                        </figure>
                                                    ),
                                                )}
                                            </div>
                                        ) : item.video ? (
                                            <div
                                                className="group/video relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-plum sm:aspect-[16/10] lg:aspect-[4/3]"
                                                onMouseEnter={playPreview}
                                                onMouseLeave={stopPreview}
                                            >
                                                <video
                                                    ref={choreographyVideoRef}
                                                    src={item.video}
                                                    muted
                                                    playsInline
                                                    loop
                                                    preload="metadata"
                                                    aria-label={`${item.title} video preview`}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover/video:scale-[1.035]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        stopPreview();
                                                        setOpenVideo(item);
                                                    }}
                                                    aria-label={`Watch ${item.title} video`}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/10 text-white transition-colors hover:bg-black/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                                                >
                                                    <span className="grid h-16 w-16 place-items-center rounded-full border border-white/75 bg-black/35 backdrop-blur-sm">
                                                        <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
                                                    </span>
                                                </button>
                                            </div>
                                        ) : (
                                            <SmartImage
                                                image={item.image}
                                                sizes="(max-width: 1023px) 92vw, 46vw"
                                                className="aspect-[4/3] w-full rounded-[20px] sm:aspect-[16/10] lg:aspect-[4/3]"
                                                imgClassName="transition-transform duration-700 ease-out hover:scale-[1.035]"
                                            />
                                        )}
                                    </MediaMask>
                                </Reveal>

                                <Reveal
                                    delay={imageRight ? 0 : 0.12}
                                    className={imageRight ? "lg:order-1" : undefined}
                                >
                                    <div className="max-w-[35rem]">
                                        <p className="eyebrow flex items-center gap-3 text-rose">
                                            <span className="h-px w-8 bg-pink" aria-hidden="true" />
                                            {item.kicker}
                                        </p>
                                        <h3
                                            id={`class-title-${item.id}`}
                                            className="mt-4 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.04] tracking-[-0.02em] text-text"
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="mt-5 max-w-[32rem] text-[1rem] leading-[1.75] text-muted sm:text-[1.0625rem]">
                                            {item.summary}
                                        </p>

                                        {item.learningSteps && (
                                            <ol
                                                aria-label={`What you'll explore in ${item.title}`}
                                                className="mt-6 divide-y divide-rule border-y border-rule"
                                            >
                                                {item.learningSteps.map((step, stepIndex) => (
                                                    <li
                                                        key={step.title}
                                                        className="grid grid-cols-[2rem_1fr] gap-3 py-3.5 first:pt-4 last:pb-4 sm:grid-cols-[2.5rem_1fr] sm:gap-4"
                                                    >
                                                        <span className="eyebrow pt-0.5 text-pink">
                                                            {String(stepIndex + 1).padStart(2, "0")}
                                                        </span>
                                                        <div>
                                                            <h4 className="text-[14px] font-medium text-text sm:text-[15px]">
                                                                {step.title}
                                                            </h4>
                                                            <p className="mt-1.5 text-[13px] leading-[1.65] text-muted sm:text-[13.5px]">
                                                                {step.text}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ol>
                                        )}

                                        {!item.learningSteps && (
                                            <ul className="mt-6 flex flex-wrap gap-2.5">
                                                {item.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="rounded-full border border-rule bg-white/80 px-3.5 py-2 text-[12px] leading-tight text-text/75 sm:text-[13px]"
                                                    >
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <Link
                                            to={item.anchor}
                                            state={{ interest: item.interest }}
                                            className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-rose px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
                                        >
                                            Explore this class
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </Link>
                                    </div>
                                </Reveal>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>


                {/* ── Enquiry panel: a clear next step after browsing ── */}
                {!artOnly && (
                    <Reveal className="mt-16 lg:mt-24">
                        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-blossom px-7 py-8 sm:flex-row sm:items-center sm:px-10 sm:py-10">
                            <div className="max-w-xl">
                                <h3 className="font-display text-[1.5rem] leading-tight text-text sm:text-[1.75rem]">
                                    Not sure which class to start with?
                                </h3>
                                <p className="mt-2 text-[1rem] leading-[1.65] text-muted">
                                    Tell us who it is for and their age. We will suggest a
                                    good place to begin.
                                </p>
                            </div>
                            <Link
                                to="/contact#enquiry"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-rose px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
                            >
                                Ask about classes
                                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                )}
            </div>

            {/* ── Art detail: gallery-style spread ── */}
            {showArtDetail && !artOnly && (
                <div
                    id="art-detail"
                    aria-labelledby="art-detail-title"
                    className="relative mt-24 scroll-mt-28 overflow-hidden border-t border-rule bg-blossom py-24 lg:mt-32 lg:py-32"
                >
                    <ArtBackdrop variant="detail" />

                    <div className="shell relative z-10">
                        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                            {/* Text column */}
                            <div className="lg:col-span-4">
                                <SectionHeading
                                    id="art-detail-title"
                                    eyebrow="Art & painting"
                                    title={
                                        <>
                                            Slow down, look closely,{" "}
                                            <span className="italic text-pink">make it yours.</span>
                                        </>
                                    }
                                    standfirst="Student work is hung the way a gallery hangs it: spaced out, captioned, and given room."
                                />

                                <Reveal delay={0.1} className="mt-8 space-y-4">
                                    <p className="text-[1.0625rem] leading-[1.7] text-text/85">
                                        Sketching and portrait drawing train the eye. Oil and
                                        acrylic painting train the hand. Craft brings in paper,
                                        texture and colour, so you make things you can hold.
                                    </p>
                                    <p className="text-[1.0625rem] leading-[1.7] text-muted">
                                        Work at your own pace and return to the same subject as
                                        often as you like. It changes as you do.
                                    </p>
                                </Reveal>

                                <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                                    <Link to="/gallery#gallery" className="rule-link text-[15px] text-rose">
                                        See student work
                                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                    </Link>
                                    <Link to="/contact#enquiry" className="rule-link text-[15px] text-text hover:text-rose">
                                        Ask about classes
                                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                    </Link>
                                </Reveal>
                            </div>

                            {/* Asymmetric image composition */}
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-12 gap-4 sm:gap-5">
                                    <Reveal className="col-span-7">
                                        <SmartImage
                                            image={editorialImages.artDetail[0]}
                                            sizes="(max-width: 1023px) 60vw, 44vw"
                                            className={`aspect-[4/5] w-full rounded-[14px] ${shadow}`}
                                            position="50% 40%"
                                        />
                                        <p className="eyebrow mt-3 text-[#a08a97]">
                                            {editorialImages.artDetail[0].caption}
                                        </p>
                                    </Reveal>

                                    <Reveal delay={0.1} className="col-span-5 self-end">
                                        <SmartImage
                                            image={editorialImages.artDetail[2]}
                                            sizes="(max-width: 1023px) 36vw, 26vw"
                                            className={`aspect-square w-full rounded-[14px] ${shadow}`}
                                        />
                                        <p className="eyebrow mt-3 text-[#a08a97]">
                                            {editorialImages.artDetail[2].caption}
                                        </p>
                                    </Reveal>

                                    <Reveal delay={0.15} className="col-span-5">
                                        <SmartImage
                                            image={editorialImages.artDetail[3]}
                                            sizes="(max-width: 1023px) 36vw, 26vw"
                                            className={`aspect-[4/3] w-full rounded-[14px] ${shadow}`}
                                        />
                                        <p className="eyebrow mt-3 text-[#a08a97]">
                                            {editorialImages.artDetail[3].caption}
                                        </p>
                                    </Reveal>

                                    <Reveal delay={0.2} className="col-span-7">
                                        <SmartImage
                                            image={editorialImages.artDetail[1]}
                                            sizes="(max-width: 1023px) 60vw, 44vw"
                                            className={`aspect-[4/3] w-full rounded-[14px] ${shadow}`}
                                            position="50% 35%"
                                        />
                                        <p className="eyebrow mt-3 text-[#a08a97]">
                                            {editorialImages.artDetail[1].caption}
                                        </p>
                                    </Reveal>
                                </div>
                            </div>
                        </div>

                        {/* How a class works: a real sequence, so numbering is meaningful */}
                        <RevealGroup className="mt-20 grid grid-cols-1 gap-8 border-t border-rule pt-10 sm:grid-cols-3 lg:mt-28">
                            {steps.map((step, i) => (
                                <div key={step.title} className="flex gap-4">
                                    <span className="font-display text-[2.25rem] leading-none text-pink/70">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-[1.0625rem] font-medium text-text">{step.title}</h3>
                                        <p className="mt-1.5 text-[0.95rem] leading-[1.65] text-muted">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </RevealGroup>
                    </div>
                </div>
            )}
            <AnimatePresence>
                {openVideo && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Watch ${openVideo.title}`}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) setOpenVideo(null);
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenVideo(null)}
                            aria-label="Close video"
                            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/40 text-white transition-colors hover:bg-white/15 sm:right-7 sm:top-7"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <video
                            src={openVideo.video}
                            controls
                            autoPlay
                            playsInline
                            className="max-h-[85svh] w-full max-w-5xl rounded-xl bg-black shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}