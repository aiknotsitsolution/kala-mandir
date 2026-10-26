import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { fetchApi } from "@/lib/api";

export default function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError("");
        fetchApi(`/events/${encodeURIComponent(id)}`, { signal: controller.signal })
            .then(setEvent)
            .catch((fetchError) => {
                if (fetchError.name !== "AbortError") setError(fetchError.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, [id]);

    return (
        <main id="main">
            <section
                data-tone="light"
                aria-labelledby="event-detail-title"
                className="section min-h-[70vh] bg-blossom pt-36 sm:pt-40"
            >
                <div className="shell">
                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 text-sm font-medium text-rose transition-colors hover:text-pink"
                    >
                        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                        All events
                    </Link>

                    {loading ? (
                        <p className="mt-8 text-muted" role="status">Loading event...</p>
                    ) : error ? (
                        <div className="mt-8" role="alert">
                            <h1 className="font-display text-3xl text-text">Event unavailable</h1>
                            <p className="mt-2 text-muted">{error}</p>
                        </div>
                    ) : event ? (
                        <article className="mt-8">
                            {event.type === "video" ? (
                                <video
                                    src={event.url}
                                    poster={event.thumbnailUrl}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    aria-label={event.title}
                                    className="max-h-[75vh] w-full rounded-[18px] bg-white object-contain object-center"
                                />
                            ) : (
                                <img
                                    src={event.thumbnailUrl || event.url}
                                    alt={event.title}
                                    fetchPriority="high"
                                    className="max-h-[75vh] w-full rounded-[18px] bg-white object-cover object-center"
                                />
                            )}
                            <div className="mx-auto mt-9 max-w-3xl">
                                <p className="eyebrow text-rose">
                                    {event.categoryId?.name || "Event"}
                                </p>
                                <h1
                                    id="event-detail-title"
                                    className="mt-3 font-display text-4xl leading-tight tracking-tight text-text sm:text-6xl"
                                >
                                    {event.title}
                                </h1>
                                <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted sm:text-lg">
                                    {event.description}
                                </p>
                            </div>
                        </article>
                    ) : null}
                </div>
            </section>
        </main>
    );
}
