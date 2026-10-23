import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/SmartImage";
import SectionHeading from "@/components/SectionHeading";
import { MaskReveal, MediaMask, Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { revealBlur } from "@/lib/motion";
import { editorialImages } from "@/data/gallery";

/**
 * Introduction (B) — a short editorial opening.
 *
 * One striking image, a large serif heading and compact supporting copy.
 * No feature lists, no invented history or credentials.
 */
export default function IntroSection({
    showStudioNote = true,
    showAcademyCards = false,
}) {
    const { intro } = editorialImages;
    const academyCards = [
        {
            title: "Dance Academy",
            eyebrow: "Move with confidence",
            tagline: "Discipline · Grace · Confidence",
            action: "Explore dance classes",
            href: "/dance#dance",
            image: editorialImages.danceShowcase.group,
            surface: "bg-blossom",
            accent: "text-rose",
            imageFade: "to-blossom/70",
            button: "bg-rose text-white group-hover:bg-pink",
        },
        {
            title: "Art Academy",
            eyebrow: "Make something yours",
            tagline: "Imagine · Create · Grow",
            action: "Explore art classes",
            href: "/art#art",
            image: editorialImages.artDetail[1],
            surface: "bg-lavender",
            accent: "text-violet",
            imageFade: "to-lavender/70",
            button: "bg-violet text-white group-hover:bg-rose",
        },
    ];

    return (
        <section
            id="about"
            data-tone="light"
            aria-labelledby="intro-title"
            className="section relative bg-paper"
        >
            <div className="shell">
                {showAcademyCards && (
                    <div className="mb-14 grid grid-cols-1 gap-4 sm:mb-16 sm:grid-cols-2 sm:gap-5 lg:mb-20">
                        {academyCards.map((card, index) => (
                            <Reveal
                                key={card.title}
                                delay={index * 0.1}
                                amount={0.05}
                            >
                                <Link
                                    to={card.href}
                                    className={`group flex min-h-40 overflow-hidden rounded-[18px] border border-white/80 ${card.surface} shadow-[0_16px_36px_-25px_rgba(41,33,43,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(41,33,43,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose sm:min-h-44 lg:min-h-48`}
                                >
                                    <div className="relative w-[38%] shrink-0 overflow-hidden sm:w-[40%]">
                                        <SmartImage
                                            image={card.image}
                                            alt=""
                                            sizes="(max-width: 639px) 38vw, 20vw"
                                            className="h-full min-h-40 w-full sm:min-h-44 lg:min-h-48"
                                            imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div
                                            aria-hidden="true"
                                            className={`pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent ${card.imageFade}`}
                                        />
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col items-start justify-center p-4 sm:p-5 lg:p-6">
                                        <span className={`eyebrow ${card.accent}`}>
                                            {card.eyebrow}
                                        </span>
                                        <h2 className="mt-2 font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.05] text-text">
                                            {card.title}
                                        </h2>
                                        <p className="mt-2 text-[11px] leading-snug text-muted sm:text-[13px]">
                                            {card.tagline}
                                        </p>
                                        <span
                                            className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-medium transition-colors sm:mt-5 sm:px-4 sm:text-[12px] ${card.button}`}
                                        >
                                            {card.action}
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-12">
                    {/* Image — asymmetric, offset from the top rule */}
                    <div className="lg:col-span-5 lg:pt-2">
                        <MediaMask>
                            <SmartImage
                                image={intro.main}
                                sizes="(max-width: 1023px) 92vw, 38vw"
                                className="aspect-[4/5] w-full rounded-[16px] lg:aspect-[3/4]"
                                position="50% 35%"
                            />
                        </MediaMask>

                        <Reveal
                            delay={0.15}
                            className="mt-4 flex items-start justify-between gap-4 border-t border-rule pt-3"
                        >
                            <span className="eyebrow text-muted">The studio at work</span>
                            <span className="eyebrow text-[#b0a0aa]">
                                Sector 52 · Noida
                            </span>
                        </Reveal>

                        {/* Small secondary image, deliberately offset */}
                        <MaskReveal className="mt-6 hidden lg:mt-8 lg:block">
                            <SmartImage
                                image={intro.side}
                                sizes="30vw"
                                className="aspect-[16/10] w-[86%] rounded-[14px]"
                            />
                        </MaskReveal>

                        {/* Editorial marginalia — fills the left column and
                            carries the studio's own colour identity. */}
                        {showStudioNote && (
                            <Reveal
                                delay={0.2}
                                variants={revealBlur}
                                className="mt-8 hidden rounded-[14px] border border-rule bg-white/70 p-5 lg:block"
                            >
                                <p className="font-display text-[1.5rem] leading-[1.2] text-text">
                                    Art and dance,{" "}
                                    <span className="italic text-rose">
                                        taught in the same room
                                    </span>
                                    .
                                </p>
                                <RevealGroup
                                    className="mt-5"
                                    staggerChildren={0.06}
                                    aria-label="The colours used across the studio"
                                >
                                    <span className="eyebrow mb-2 block text-[#b0a0aa]">
                                        The studio palette
                                    </span>
                                    <div className="flex gap-1.5">
                                        {[
                                            "bg-blush",
                                            "bg-butter",
                                            "bg-lavender",
                                            "bg-pink",
                                            "bg-rose",
                                            "bg-violet",
                                            "bg-gold",
                                        ].map((c) => (
                                            <RevealItem
                                                key={c}
                                                aria-hidden="true"
                                                className={`h-6 flex-1 rounded-full ${c}`}
                                            />
                                        ))}
                                    </div>
                                </RevealGroup>
                            </Reveal>
                        )}
                    </div>



                    

                    {/* Copy */}
                    <div className="lg:col-span-6 lg:col-start-7">
                        <SectionHeading
                            number="01"
                            eyebrow="Introduction"
                            title={
                                <>
                                    A studio built for{" "}
                                    <span className="italic text-pink">
                                        creative expression
                                    </span>
                                    .
                                </>
                            }
                            standfirst="Kala Mandir brings art and dance together under one roof — a place to sit with a sheet of paper, work colour across a canvas, and learn to move with confidence."
                        />

                        <RevealGroup className="mt-8 space-y-5">
                            <RevealItem>
                                <p className="max-w-[34rem] text-[1.0625rem] leading-[1.72] text-text/85">
                                    Classes begin with the fundamentals and stay close
                                    to them — drawing what you see, mixing what you
                                    feel, practising a step until it becomes yours.
                                    Art and movement are treated as serious
                                    disciplines, taught patiently, for every age group
                                    that walks in.
                                </p>
                            </RevealItem>

                            <RevealItem>
                                <p className="max-w-[34rem] text-[1.0625rem] leading-[1.72] text-muted">
                                    Whether you are picking up a pencil for the first
                                    time or preparing a performance for a wedding
                                    stage, the room is the same: attentive, unhurried
                                    and yours.
                                </p>
                            </RevealItem>
                        </RevealGroup>

                        {/* Supporting image for mobile only */}
                        <MaskReveal className="mt-9 lg:hidden">
                            <SmartImage
                                image={intro.side}
                                sizes="92vw"
                                className="aspect-[16/10] w-full rounded-[14px]"
                            />
                        </MaskReveal>

                        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <Link to="/about#why" className="rule-link text-[15px] text-rose">
                                Why learn here
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="h-4 w-4 transition-transform duration-200"
                                />
                            </Link>
                            <Link
                                to="/contact#enquiry"
                                className="rule-link text-[15px] text-text hover:text-rose"
                            >
                                Book a trial class
                                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                        </Reveal>

                        {/* Fine caption row, editorial detail */}
                        <Reveal
                            delay={0.15}
                            as="dl"
                            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3"
                        >
                            {[
                                { k: "Disciplines", v: "Art · Dance" },
                                { k: "Format", v: "Studio classes" },
                                { k: "Enquiries", v: "Open" },
                            ].map((item) => (
                                <div key={item.k} className="border-t border-rule pt-3">
                                    <dt className="eyebrow text-[#b0a0aa]">{item.k}</dt>
                                    <dd className="mt-1.5 font-display text-[1.35rem] leading-none text-text">
                                        {item.v}
                                    </dd>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
