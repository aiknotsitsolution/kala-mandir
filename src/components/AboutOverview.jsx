import { ArrowUpRight, Brush, CalendarDays, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import { MediaMask, Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { editorialImages } from "@/data/gallery";

const PROGRAMMES = [
    {
        icon: Brush,
        title: "Art & making",
        detail: "Sketching, portrait drawing, painting, art and craft",
    },
    {
        icon: Music2,
        title: "Dance & movement",
        detail: "Dance classes, Zumba, wedding and event choreography",
    },
];

export default function AboutOverview() {
    return (
        <section
            id="about"
            data-tone="light"
            aria-labelledby="about-overview-title"
            className="section relative bg-paper"
        >
            <div className="shell">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-16">
                    <MediaMask
                        className="lg:col-span-5 lg:h-full"
                        innerClassName="lg:h-full"
                    >
                        <SmartImage
                            image={editorialImages.aboutOverview}
                            sizes="(max-width: 1023px) 92vw, 40vw"
                            className="aspect-[4/3] w-full rounded-[18px] lg:h-full lg:aspect-auto"
                            position="50% 45%"
                        />
                    </MediaMask>

                    <div className="lg:col-span-7">
                        <SectionHeading
                            id="about-overview-title"
                            number="01"
                            eyebrow="About Kala Mandir"
                            title={
                                <>
                                    A place to{" "}
                                    <span className="italic text-pink">
                                        learn and create.
                                    </span>
                                </>
                            }
                            standfirst="Kala Mandir is an art and dance institute in Sector 52, Noida, bringing creative classes together under one roof."
                            showRule={false}
                        />

                        <Reveal delay={0.12}>
                            <p className="mt-6 max-w-[42rem] text-[1.025rem] leading-[1.75] text-muted">
                                From a first sketch to a dance routine, students can
                                explore different forms of creative expression in a
                                welcoming studio. Classes focus on learning the
                                fundamentals, practising regularly and developing
                                each piece at an individual pace. Our trainers
                                bring more than{" "}
                                <strong className="font-semibold text-rose">
                                    16 years of experience
                                </strong>
                                .
                            </p>
                        </Reveal>

                        <Reveal delay={0.15} className="mt-6 inline-flex items-center gap-3 rounded-full border border-rule bg-white px-4 py-2.5">
                            <CalendarDays
                                aria-hidden="true"
                                className="h-4 w-4 text-rose"
                            />
                            <span className="text-sm text-muted">
                                Established <strong className="font-medium text-text">2016</strong>
                            </span>
                        </Reveal>

                        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
                            {PROGRAMMES.map(({ icon: Icon, title, detail }) => (
                                <RevealItem
                                    key={title}
                                    className="rounded-[14px] border border-rule bg-white p-5"
                                >
                                    <span className="grid h-10 w-10 place-items-center rounded-full bg-blossom text-rose">
                                        <Icon aria-hidden="true" className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 font-display text-[1.3rem] text-text">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                                        {detail}
                                    </p>
                                </RevealItem>
                            ))}
                        </RevealGroup>

                        <Reveal delay={0.18} className="mt-8">
                            <Link
                                to="/contact#enquiry"
                                className="rule-link text-[15px] text-rose"
                            >
                                Ask us about classes
                                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
