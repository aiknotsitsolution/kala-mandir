import ContactSection from "@/components/ContactSection";
import EnquiryForm from "@/components/EnquiryForm";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";
import { editorialImages } from "@/data/gallery";

function ContactBanner() {
    return (
        <section
            aria-labelledby="contact-banner-title"
            className="relative isolate min-h-[470px] overflow-hidden bg-plum sm:min-h-[520px] lg:min-h-[580px]"
        >
            <Reveal className="absolute inset-0">
                <SmartImage
                    image={editorialImages.intro.side}
                    alt=""
                    sizes="100vw"
                    className="absolute inset-0 h-full w-full"
                    position="50% 48%"
                    priority
                />
            </Reveal>
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(100deg,rgba(28,15,30,0.88)_0%,rgba(28,15,30,0.6)_52%,rgba(28,15,30,0.2)_100%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-charcoal/45 to-transparent"
            />
            <div className="relative z-10 mx-auto flex min-h-[470px] max-w-[85rem] items-center px-6 pb-10 pt-28 sm:min-h-[520px] sm:px-10 sm:pt-32 lg:min-h-[580px] lg:px-14">
                <div className="max-w-3xl">
                    <p className="eyebrow flex items-center gap-2 text-cream/75">
                        <MapPin aria-hidden="true" className="h-4 w-4 text-gold" />
                        Contact Kala Mandir
                    </p>
                    <h1
                        id="contact-banner-title"
                        className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[1.02] text-cream"
                    >
                        Let&apos;s make{" "}
                        <span className="italic text-pink">something</span>
                        <br className="hidden sm:block" /> beautiful together.
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                        Ask us about classes, plan a visit to our Noida studio, or
                        get in touch with our team.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href="#enquiry"
                            className="group inline-flex items-center gap-2 rounded-full bg-rose px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-pink"
                        >
                            Send an enquiry
                            <ArrowDown
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                            />
                        </a>
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                        >
                            Find our studio
                            <ArrowUpRight
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Contact() {
    return (
        <main id="main">
            <ContactBanner />
            <EnquiryForm />
            <ContactSection />
        </main>
    );
}
