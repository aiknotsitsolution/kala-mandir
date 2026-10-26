import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchApi } from "@/lib/api";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        Promise.all([
            fetchApi("/events", { signal: controller.signal }),
            fetchApi("/event-categories", { signal: controller.signal }),
        ])
            .then(([eventData, categoryData]) => {
                setEvents(eventData);
                setCategories(categoryData);
            })
            .catch((fetchError) => {
                if (fetchError.name !== "AbortError") setError(fetchError.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, []);

    const visibleEvents =
        category === "all"
            ? events
            : events.filter((event) => event.categoryId?._id === category);

    return (
        <main id="main">
            <section
                data-tone="light"
                aria-labelledby="events-title"
                className="section min-h-[70vh] bg-blossom pt-36 sm:pt-40"
            >
                <div className="shell">
                    <p className="eyebrow text-rose">At the studio</p>
                    <h1
                        id="events-title"
                        className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-text sm:text-6xl"
                    >
                        Events &amp; workshops
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                        Discover upcoming events and workshops at Kala Mandir.
                    </p>

                    {categories.length > 0 && (
                        <div className="mt-9 flex flex-wrap gap-2" aria-label="Filter events by category">
                            {[{ _id: "all", name: "All" }, ...categories].map((item) => (
                                <button
                                    key={item._id}
                                    type="button"
                                    onClick={() => setCategory(item._id)}
                                    aria-pressed={category === item._id}
                                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                                        category === item._id
                                            ? "border-rose bg-rose text-white"
                                            : "border-rule bg-white text-muted hover:border-pink hover:text-rose"
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading ? (
                        <p className="mt-10 text-muted" role="status">Loading events...</p>
                    ) : error ? (
                        <p className="mt-10 text-rose" role="alert">{error}</p>
                    ) : visibleEvents.length ? (
                        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleEvents.map((event) => (
                                <li key={event._id}>
                                    <Link
                                        to={`/events/${event._id}`}
                                        className="group block focus-visible:outline-none"
                                        aria-label={`View ${event.title} details`}
                                    >
                                        <div className="relative overflow-hidden rounded-[16px] bg-white shadow-[0_20px_44px_-32px_rgba(41,33,43,0.5)]">
                                            {event.type === "video" ? (
                                                <video
                                                    src={event.url}
                                                    poster={event.thumbnailUrl}
                                                    aria-label={event.title}
                                                    preload="metadata"
                                                    className="aspect-[4/3] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
                                                />
                                            ) : (
                                                <img
                                                    src={event.thumbnailUrl || event.url}
                                                    alt={event.title}
                                                    loading="lazy"
                                                    className="aspect-[4/3] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
                                                />
                                            )}
                                        </div>
                                        <div className="mt-4 flex items-start justify-between gap-4 border-t border-rule pt-4">
                                            <div>
                                                <p className="eyebrow text-rose">
                                                    {event.categoryId?.name || "Event"}
                                                </p>
                                                <h2 className="mt-2 font-display text-2xl text-text transition-colors duration-200 group-hover:text-pink">
                                                    {event.title}
                                                </h2>
                                            </div>
                                            <span
                                                aria-hidden="true"
                                                className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rule text-muted transition-all duration-200 group-hover:border-pink group-hover:bg-pink group-hover:text-white"
                                            >
                                                <ArrowUpRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="mt-10 rounded-[18px] border border-rule bg-white p-6 sm:p-8">
                            <h2 className="font-display text-2xl text-text">
                                No events in this category yet
                            </h2>
                            <p className="mt-2 leading-relaxed text-muted">
                                Please check back soon for updates from Kala Mandir.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
