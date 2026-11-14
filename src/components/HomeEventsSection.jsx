import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { fetchEvents } from "@/store/eventsSlice";

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
                        <Link
                            to={`/events/${event._id}`}
                            className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-white/80 bg-blossom shadow-[0_16px_36px_-25px_rgba(41,33,43,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(41,33,43,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                            aria-label={`View ${event.styleLabel} dance performance event`}
                        >
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
                            <div className="flex flex-1 items-start justify-between gap-4 p-5 sm:p-6">
                                <div>
                                    <p className="eyebrow text-rose">
                                        {event.categoryId?.name || "Featured performance"}
                                    </p>
                                    <h3 className="mt-2 font-display text-[1.25rem] leading-tight text-text group-hover:text-rose sm:text-[1.35rem]">
                                        {event.styleLabel}
                                    </h3>
                                    {event.description && (
                                        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted sm:text-[14px]">
                                            {event.description}
                                        </p>
                                    )}
                                </div>
                                <span
                                    aria-hidden="true"
                                    className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rule text-muted transition-colors group-hover:border-pink group-hover:bg-pink group-hover:text-white"
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </div>
                        </Link>
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
