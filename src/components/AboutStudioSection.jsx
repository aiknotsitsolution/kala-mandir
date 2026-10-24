import { ArrowUpRight, Brush, Eye, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import { MediaMask, Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { studioLife } from "@/data/gallery";

const STUDIO_ACTIVITIES = [
    {
        icon: Eye,
        title: "Observe & draw",
        text: "Build sketches and portraits by looking closely at shapes, lines and details.",
    },
    {
        icon: Brush,
        title: "Explore colour",
        text: "Try painting and hands-on craft with different colours and materials.",
    },
    {
        icon: Music2,
        title: "Practise movement",
        text: "Learn dance and movement, from class practice to event choreography.",
    },
];

export default function AboutStudioSection() {
    return (
        <section
            id="studio"
            data-tone="light"
            aria-labelledby="studio-title"
            className="section relative overflow-hidden bg-white"
        >
            <div className="shell">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="relative lg:col-span-6">
                        <MediaMask>
                            <SmartImage
                                image={studioLife[1]}
                                sizes="(max-width: 1023px) 92vw, 48vw"
                                className="aspect-[4/3] w-full rounded-[18px]"
                                position={studioLife[1].position}
                            />
                        </MediaMask>
                        <Reveal
                            delay={0.15}
                            className="relative ml-auto -mt-12 w-[46%] sm:-mt-20"
                        >
                            <SmartImage
                                image={studioLife[6]}
                                sizes="(max-width: 1023px) 44vw, 22vw"
                                className="aspect-[4/3] rounded-[14px] border-4 border-white shadow-[0_18px_40px_-24px_rgba(41,33,43,0.45)]"
                                position={studioLife[6].position}
                            />
                        </Reveal>
                        <p className="eyebrow mt-4 text-muted">
                            Art, craft and movement at Kala Mandir
                        </p>
                    </div>

                    <div className="lg:col-span-6">
                        <SectionHeading
                            id="studio-title"
                            number="02"
                            eyebrow="Inside the studio"
                            title={
                                <>
                                    Find your way{" "}
                                    <span className="italic text-pink">
                                        to create.
                                    </span>
                                </>
                            }
                            standfirst="A shared space for learning through art, craft and movement."
                            showRule={false}
                        />

                        <Reveal delay={0.1}>
                            <p className="mt-6 max-w-[40rem] text-[1.025rem] leading-[1.75] text-muted">
                                Kala Mandir offers classes across drawing, painting,
                                art and craft, dance, Zumba, and wedding or event
                                choreography. Students can choose a discipline that
                                interests them and spend time developing it through
                                practice.
                            </p>
                        </Reveal>

                        <RevealGroup className="mt-8 divide-y divide-rule border-y border-rule">
                            {STUDIO_ACTIVITIES.map(({ icon: Icon, title, text }) => (
                                <RevealItem
                                    key={title}
                                    className="flex gap-4 py-4"
                                >
                                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blossom text-rose">
                                        <Icon aria-hidden="true" className="h-4 w-4" />
                                    </span>
                                    <div>
                                        <h3 className="font-medium text-text">{title}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-muted">
                                            {text}
                                        </p>
                                    </div>
                                </RevealItem>
                            ))}
                        </RevealGroup>

                        <Reveal delay={0.18} className="mt-7">
                            <Link
                                to="/gallery"
                                className="rule-link text-[15px] text-rose"
                            >
                                Explore student work
                                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
