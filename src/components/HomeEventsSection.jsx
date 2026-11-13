import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchApi } from "@/lib/api";

export default function HomeEventsSection() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        fetchApi("/events", { signal: controller.signal })
            .then((result) => {
                const stageEvents = result.filter((event) =>
                    event.title?.trim().toLowerCase().startsWith("classical stage dance performance"),
                );
                const classicalEvent = stageEvents.find(
                    (event) => event.title.trim().toLowerCase() === "classical stage dance performance",
                );
                const semiClassicalEvent = stageEvents.find((event) => event !== classicalEvent);
                setEvents([
                    ...(classicalEvent ? [{ ...classicalEvent, styleLabel: "Classical" }] : []),
                    ...(semiClassicalEvent
                        ? [{ ...semiClassicalEvent, styleLabel: "Semi-Classical" }]
                        : []),
                ]);
            })
            .catch((fetchError) => {
                if (fetchError.name !== "AbortError") setError(fetchError.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, []);

    return (
        <section
            id="home-events"
            data-tone="light"
            aria-labelledby="home-events-title"
            className="section bg-blossom"
        >
            <div className="shell">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div className="max-w-2xl">
                        <p className="eyebrow text-rose">Featured performances</p>
                        <h2
                            id="home-events-title"
                            className="mt-3 font-display text-[clamp(2.3rem,5vw,4rem)] leading-tight text-text"
                        >
                            Classical
                        </h2>
                        <p className="mt-3 max-w-xl leading-relaxed text-muted">
                            Explore classical and semi-classical dance performances at Kala Mandir.
                        </p>
                    </div>
                    <Link
                        to="/events"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-rule bg-white px-5 py-3 text-sm font-medium text-text transition-colors hover:border-pink hover:text-rose"
                    >
                        Explore all events
                        <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>

                {loading ? (
                    <p className="mt-10 text-muted" role="status">Loading events...</p>
                ) : error ? (
                    <p className="mt-10 rounded-xl border border-red-200 bg-white px-5 py-4 text-sm text-red-700" role="alert">
                        Events could not be loaded: {error}
                    </p>
                ) : events.length ? (
                    <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                        {events.map((event) => (
                            <li key={event._id}>
                                <Link
                                    to={`/events/${event._id}`}
                                    className="group block h-full rounded-[18px] border border-rule bg-white p-3 shadow-[0_18px_45px_-34px_rgba(53,21,54,0.45)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                                    aria-label={`View ${event.styleLabel} dance performance event`}
                                >
                                    <div className="overflow-hidden rounded-[12px] bg-plum">
                                        {event.type === "video" ? (
                                            <video
                                                src={event.url}
                                                poster={event.thumbnailUrl}
                                                muted
                                                playsInline
                                                preload="metadata"
                                                aria-label={event.title}
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <img
                                                src={event.thumbnailUrl || event.url}
                                                alt={event.title}
                                                loading="lazy"
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-5">
                                        <div>
                                            <p className="eyebrow text-rose">
                                                {event.categoryId?.name || "Dance"}
                                            </p>
                                            <h3 className="mt-2 font-display text-2xl leading-tight text-text group-hover:text-rose">
                                                {event.styleLabel}
                                            </h3>
                                            {event.description && (
                                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mt-10 rounded-[18px] border border-dashed border-rule bg-white/70 px-6 py-10 text-center">
                        <h3 className="font-display text-2xl text-text">Dance performances are on the way.</h3>
                        <p className="mt-2 text-sm text-muted">
                            Check back soon for classical and semi-classical performances.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
