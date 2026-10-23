import { ArrowUp, ArrowUpRight, Instagram, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig, contactLinks } from "@/data/siteConfig";
import { classLinks } from "@/data/classes";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * Footer (J) — typography-led, restrained dividers.
 *
 * Only verified business details appear here. The year is computed at runtime
 * so it never goes stale.
 */
export default function Footer() {
    const year = new Date().getFullYear();

    const scrollToTop = () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("home")?.focus?.();
    };

    return (
        <footer
            data-tone="dark"
            className="grain relative isolate overflow-hidden bg-plum text-white"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(139,92,246,0.17),transparent_70%)]"
            />
            <div className="relative">
                <div className="shell">
                    {/* Brand masthead */}
                    <Reveal className="flex flex-col gap-7 border-b border-white/12 pb-10 pt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:pb-12 sm:pt-20 lg:pt-24">
                        <div className="flex min-w-0 flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
                            <Link
                                to="/"
                                aria-label="Kala Mandir home"
                                className="inline-flex shrink-0 items-center rounded-xl transition-opacity hover:opacity-85"
                            >
                                <img
                                    src="/assets/images/kalamandir-lotus-logo.png"
                                    alt="Kala Mandir — Art, Dance & Creativity"
                                    width={330}
                                    height={200}
                                    loading="lazy"
                                    className="h-auto w-40 object-contain sm:w-44 lg:w-48"
                                />
                            </Link>
                            <div className="max-w-[30rem] border-l border-white/15 pl-5 sm:pl-6">
                                <p className="eyebrow text-gold/80">
                                    Art · Dance · Creativity
                                </p>
                                <p className="mt-2 text-[14px] leading-relaxed text-white/60 sm:text-[14.5px]">
                                    A welcoming place to learn, practise and create
                                    in Sector 52, Noida.
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/contact#enquiry"
                            className="group inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-[14px] font-medium text-cream transition-colors duration-200 hover:border-gold/70 hover:bg-gold/20 sm:self-center"
                        >
                            Book a trial class
                            <ArrowUpRight
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
                    </Reveal>

                    {/* Link columns */}
                    <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
                        <RevealItem>
                            <p className="eyebrow text-white/35">Explore</p>
                            <ul className="mt-4 space-y-2.5">
                                {siteConfig.nav.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            to={item.href}
                                            className="text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </RevealItem>

                        <RevealItem>
                            <p className="eyebrow text-white/35">Classes</p>
                            <ul className="mt-4 space-y-2.5">
                                {classLinks.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.href}
                                            className="text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </RevealItem>

                        <RevealItem>
                            <p className="eyebrow text-white/35">Visit</p>
                            <address className="mt-4 space-y-3 not-italic text-[15px] leading-relaxed text-white/70">
                                <span className="flex items-start gap-2.5">
                                    <MapPin
                                        className="mt-1 h-4 w-4 shrink-0 text-white/40"
                                        aria-hidden="true"
                                    />
                                    <span>
                                        {siteConfig.address.line1}
                                        <br />
                                        {siteConfig.address.city},{" "}
                                        {siteConfig.address.region}{" "}
                                        {siteConfig.address.postalCode}
                                    </span>
                                </span>
                            </address>
                        </RevealItem>

                        <RevealItem>
                            <p className="eyebrow text-white/35">Contact</p>
                            <ul className="mt-4 space-y-3">
                                {siteConfig.phones.map((phone, index) => (
                                    <li key={phone.e164}>
                                        <a
                                            href={contactLinks.phones[index]}
                                            className="flex items-center gap-2.5 text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
                                        >
                                            <Phone
                                                className="h-4 w-4 shrink-0 text-white/40"
                                                aria-hidden="true"
                                            />
                                            {phone.display}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        href={contactLinks.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2.5 text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
                                    >
                                        <WhatsAppIcon
                                            className="h-4 w-4 shrink-0 text-white/40"
                                        />
                                        WhatsApp us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={contactLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2.5 text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
                                    >
                                        <Instagram
                                            className="h-4 w-4 shrink-0 text-white/40"
                                            aria-hidden="true"
                                        />
                                        {siteConfig.instagram.handle}
                                    </a>
                                </li>
                            </ul>

                            <Link
                                to="/contact#enquiry"
                                className="mt-5 inline-flex items-center gap-2 rounded-[10px] border border-white/20 px-4 py-2.5 text-[14px] transition-colors duration-200 hover:border-white/50 hover:bg-white/[0.07]"
                            >
                                Book a trial class
                            </Link>
                        </RevealItem>
                    </RevealGroup>

                    {/* Base bar */}
                    <div className="flex flex-col gap-5 border-t border-white/12 py-8 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[13.5px] text-white/45">
                            © {year} {siteConfig.name}. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            <p className="text-[13.5px] text-white/45">
                                Sector 52, Noida · {siteConfig.instagram.handle}
                            </p>
                            <button
                                type="button"
                                onClick={scrollToTop}
                                aria-label="Back to top"
                                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-white/50 hover:bg-white/10 hover:text-white"
                            >
                                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
