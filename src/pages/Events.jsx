import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchEvents, fetchEventCategories } from "@/store/eventsSlice";

export default function Events() {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.items);
    const eventsStatus = useSelector((state) => state.events.status);
    const eventsError = useSelector((state) => state.events.error);
    const categories = useSelector((state) => state.events.categories);
    const categoriesStatus = useSelector((state) => state.events.categoriesStatus);
    const categoriesError = useSelector((state) => state.events.categoriesError);
    const [category, setCategory] = useState("all");

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(fetchEventCategories());
    }, [dispatch]);

    const loading =
        eventsStatus === "idle" ||
        eventsStatus === "loading" ||
        categoriesStatus === "idle" ||
        categoriesStatus === "loading";
    const error = eventsError || categoriesError;

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
