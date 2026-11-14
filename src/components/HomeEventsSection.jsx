import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { fetchEvents } from "@/store/eventsSlice";

const performanceDescriptions = {
    Classical:
        "Experience the grace and expressive storytelling of classical dance through elegant movement, rhythmic footwork and music rooted in tradition.",
    "Semi-Classical":
        "Enjoy a lively blend of classical grace and contemporary energy, brought together through expressive choreography and vibrant rhythms.",
};

export default function HomeEventsSection() {
    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.events.items);
    const eventsStatus = useSelector((state) => state.events.status);
    const error = useSelector((state) => state.events.error);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const stageEvents = allEvents.filter((event) =>
        event.title?.trim().toLowerCase().startsWith("classical stage dance performance"),
    );
    const classicalEvent = stageEvents.find(
        (event) => event.title.trim().toLowerCase() === "classical stage dance performance",
    );
    const semiClassicalEvent = stageEvents.find((event) => event !== classicalEvent);
    const events = [
        ...(classicalEvent ? [{ ...classicalEvent, styleLabel: "Classical" }] : []),
        ...(semiClassicalEvent
            ? [{ ...semiClassicalEvent, styleLabel: "Semi-Classical" }]
            : []),
    ];
    const loading = eventsStatus === "idle" || eventsStatus === "loading";

    return (
        <div id="home-events" className="contents">
            {loading ? (
                <p className="col-span-full mt-2 text-muted" role="status">Loading performances...</p>
            ) : error ? (
                <p className="col-span-full rounded-xl border border-red-200 bg-white px-5 py-4 text-sm text-red-700" role="alert">
                    Events could not be loaded: {error}
                </p>
            ) : events.length ? (
                events.map((event, index) => (
                    <Reveal key={event._id} delay={0.1 + (index + 3) * 0.08} amount={0.08}>
                        <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[18px] border border-white/80 bg-blossom shadow-[0_16px_36px_-25px_rgba(41,33,43,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(41,33,43,0.42)]">
                            <div className="group/media relative aspect-[4/3] w-full overflow-hidden bg-plum">
                                {event.type === "video" ? (
                                    <video
                                        src={event.url}
                                        poster={event.thumbnailUrl}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        aria-label={event.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-105"
                                    />
                                ) : (
                                    <img
                                        src={event.thumbnailUrl || event.url}
                                        alt={event.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-105"
                                    />
                                )}
                            </div>
                            <Link
                                to={`/events/${event._id}`}
                                aria-label={`View ${event.styleLabel} performance details`}
                                className="absolute inset-0 z-0 rounded-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
                            />
                            <div className="flex flex-1 flex-col p-5 sm:p-6">
                                <h3 className="font-display text-[1.25rem] leading-tight text-text sm:text-[1.35rem]">
                                    {event.styleLabel}
                                </h3>
                                <p className="mt-3 flex-1 line-clamp-4 text-[13px] leading-relaxed text-muted sm:text-[14px]">
                                    {[
                                        event.description?.trim(),
                                        performanceDescriptions[event.styleLabel],
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                </p>
                                <Link
                                    to="/contact#enquiry"
                                    className="relative z-10 mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-rose px-4 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
                                >
                                    Register Now
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5"
                                    />
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                ))
            ) : (
                <div className="col-span-full rounded-[18px] border border-dashed border-rule bg-white/70 px-6 py-10 text-center">
                    <h3 className="font-display text-2xl text-text">Dance performances are on the way.</h3>
                    <p className="mt-2 text-sm text-muted">
                        Check back soon for classical and semi-classical performances.
                    </p>
                </div>
            )}
            <div className="col-span-full flex justify-end">
                <Link
                    to="/events"
                    className="rule-link text-[14px] text-rose"
                >
                    Explore all performances
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
