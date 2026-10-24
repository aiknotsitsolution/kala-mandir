import {
    MapPin,
    Phone,
    Instagram,
    ArrowUpRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { contactLinks, siteConfig } from "@/data/siteConfig";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * Location & Contact (I) — verified business details only.
 *
 * No opening hours, no map pin coordinates and no landmark claims: those were
 * never supplied, so they are deliberately omitted rather than guessed.
 */
export default function ContactSection() {
    const channels = [
        {
            icon: MapPin,
            label: "Address",
            value: siteConfig.address.full,
            href: contactLinks.map,
            external: true,
            action: "Get directions",
        },
        ...siteConfig.phones.map((phone, index) => ({
            icon: Phone,
            label: "Phone",
            value: phone.display,
            href: contactLinks.phones[index],
            external: false,
            action: "Call",
        })),
        {
            icon: Instagram,
            label: "Instagram",
            value: siteConfig.instagram.handle,
            href: contactLinks.instagram,
            external: true,
            action: "View profile",
        },
        {
            icon: WhatsAppIcon,
            label: "WhatsApp",
            value: siteConfig.whatsapp.display,
            href: contactLinks.whatsapp,
            external: true,
            action: "Start a chat",
        },
    ];

    return (
        <section
            id="contact"
            data-tone="light"
            aria-labelledby="contact-title"
            className="section relative bg-paper"
        >
            <div className="shell">
                <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-start lg:gap-x-12">
                    <div className="lg:col-span-6">
                        {/* Heading */}
                        <SectionHeading
                            id="contact-title"
                            number="09"
                            eyebrow="Location & contact"
                            title={
                                <>
                                    Find us in{" "}
                                    <span className="italic text-pink">
                                        Sector 52
                                    </span>
                                    .
                                </>
                            }
                            standfirst="Kala Mandir Art and Dance Institute, C-39, Block C, Sector 52, Noida."
                            showRule={false}
                        />

                        {/* Contact channels */}
                        <RevealGroup className="mt-9">
                            {channels.map((channel, index) => (
                                <RevealItem key={channel.href}>
                                    <a
                                        href={channel.href}
                                        {...(channel.external
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                        className={`group grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 border-rule py-5 transition-colors duration-200 hover:border-[#d9c4d0] sm:gap-x-6 sm:py-6 ${index === 0 ? "border-t-0" : "border-t"}`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="grid h-11 w-11 place-items-center rounded-full border border-rule text-muted transition-all duration-200 group-hover:border-pink group-hover:bg-pink group-hover:text-white"
                                        >
                                            <channel.icon className="h-4.5 w-4.5" />
                                        </span>

                                        <span className="min-w-0">
                                            <span className="eyebrow block text-[#b0a0aa]">
                                                {channel.label}
                                            </span>
                                            <span className="mt-1 block break-words text-[1.05rem] leading-snug text-text">
                                                {channel.value}
                                            </span>
                                        </span>

                                        <span className="flex items-center gap-2 text-[13.5px] text-muted transition-colors duration-200 group-hover:text-pink">
                                            <span className="hidden sm:inline">
                                                {channel.action}
                                            </span>
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </span>
                                    </a>
                                </RevealItem>
                            ))}

                            <RevealItem className="border-t border-rule pt-7">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <a
                                        href="#enquiry"
                                        className="group inline-flex items-center gap-2 rounded-[11px] bg-rose px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-pink"
                                    >
                                        Send an enquiry
                                        <ArrowUpRight
                                            aria-hidden="true"
                                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </a>
                                </div>
                            </RevealItem>
                        </RevealGroup>
                    </div>

                    <Reveal delay={0.15} className="lg:col-span-6">
                        <div className="overflow-hidden rounded-[20px] border border-rule bg-white shadow-[0_24px_60px_-38px_rgba(41,33,43,0.4)]">
                        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
                            <div className="flex items-center gap-4">
                                <span
                                    aria-hidden="true"
                                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blossom text-rose"
                                >
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="eyebrow text-rose">Visit the studio</p>
                                    <h3
                                        id="studio-map-title"
                                        className="mt-1 font-display text-[1.5rem] leading-tight text-text sm:text-[1.75rem]"
                                    >
                                        Find us in Noida
                                    </h3>
                                </div>
                            </div>
                            <a
                                href={contactLinks.map}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex w-fit items-center gap-2 rounded-full bg-rose px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-pink"
                            >
                                Get directions
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </a>
                        </div>
                        <div className="relative h-[300px] overflow-hidden bg-blossom sm:h-[360px] lg:h-[430px]">
                            <iframe
                                title="Kala Mandir Art and Dance Institute location map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.436013791609!2d77.37030229999999!3d28.586693800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5216ed51bf9%3A0x3b0c2a3c39d01ad8!2sKala%20Mandir%20Art%20and%20Dance%20Institute!5e0!3m2!1sen!2sin!4v1792840890097!5m2!1sen!2sin"
                                className="absolute inset-0 h-full w-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </div>
                    </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
