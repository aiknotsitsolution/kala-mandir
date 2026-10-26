import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/SplitText";
import BrushStroke from "@/components/BrushStroke";
import GalleryLightbox, { ZoomCue } from "@/components/GalleryLightbox";
import { Reveal, RevealGroup } from "@/components/Reveal";
import {
    editorialImages,
} from "@/data/gallery";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { fetchApi } from "@/lib/api";

/**
 * ArtGallery — THE section the page is built around.
 *
 * A curated exhibition of authentic Kala Mandir student work, hung in a
 * masonry spread with category filters, an accessible lightbox and generous,
 * colourful detailing drawn from the artwork's own palette.
 */

/* Category → colour from the art palette (kept literal for Tailwind). */
const ACCENTS = {
    all: {
        solid: "bg-text text-white",
        dot: "bg-text",
        hover: "hover:text-text",
        text: "text-text",
    },
    art: {
        solid: "bg-rose text-white",
        dot: "bg-rose",
        hover: "hover:text-rose",
        text: "text-rose",
    },
    drawing: {
        solid: "bg-rose text-white",
        dot: "bg-rose",
        hover: "hover:text-rose",
        text: "text-rose",
    },
    painting: {
        solid: "bg-pink text-white",
        dot: "bg-pink",
        hover: "hover:text-pink",
        text: "text-pink",
    },
    craft: {
        solid: "bg-violet text-white",
        dot: "bg-violet",
        hover: "hover:text-violet",
        text: "text-violet",
    },
    dance: {
        solid: "bg-flame text-white",
        dot: "bg-flame",
        hover: "hover:text-flame",
        text: "text-flame",
    },
};

const CROPS = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
};

const PAGE_SIZE = 12;
const danceShowcase = editorialImages.danceShowcase;

export default function ArtGallery({ artOnly = false }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [mediaType, setMediaType] = useState("all");
    const [filtered, setFiltered] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [categoryError, setCategoryError] = useState("");
    const [mediaError, setMediaError] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const [openVideo, setOpenVideo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reduce = useReducedMotion();
    const selectedCategory = categories.find((category) => category.id === selectedCategoryId);
    const lightboxItems = filtered.filter((item) => item.type !== "video");
    const visibleItems = filtered.filter((item) => mediaType === "all" || item.type === mediaType);
    const pageCount = Math.ceil(visibleItems.length / PAGE_SIZE);
    const pagedItems = visibleItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    useEffect(() => {
        if (pageCount > 0 && currentPage > pageCount) setCurrentPage(pageCount);
    }, [currentPage, pageCount]);

    useEffect(() => {
        const controller = new AbortController();
        setCategoriesLoading(true);
        fetchApi("/gallery/categories", { signal: controller.signal })
            .then((result) => {
                const nextCategories = result.map((category) => ({
                    ...category,
                    id: category._id,
                    subcategories: category.subcategories || [],
                }));
                setCategories(nextCategories);
                setCategoryError("");
            })
            .catch((error) => {
                if (error.name !== "AbortError") setCategoryError(error.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setCategoriesLoading(false);
            });
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const params = new URLSearchParams();
        if (selectedCategoryId) params.set("categoryId", selectedCategoryId);
        if (selectedCategoryId && !selectedSubcategory) {
            setFiltered([]);
            setMediaError("");
            setMediaLoading(false);
            return undefined;
        }
        if (selectedCategoryId && selectedSubcategory !== "__all__") {
            params.set("subcategory", selectedSubcategory);
        }
        setMediaLoading(true);
        setFiltered([]);
        setMediaError("");
        const query = params.toString();
        fetchApi(`/gallery/media${query ? `?${query}` : ""}`, { signal: controller.signal })
            .then((result) => {
                setFiltered(result.map((item) => ({
                    id: item.id,
                    type: item.type,
                    src: item.type === "video" ? item.url : item.thumbnailUrl || item.url,
                    fallback: item.url,
                    alt: item.title,
                    caption: item.title,
                    category: item.categoryName,
                    subcategory: item.subcategory,
                    width: 1200,
                    height: 900,
                    crop: item.type === "video" ? "landscape" : "portrait",
                    status: "institute",
                })));
            })
            .catch((error) => {
                if (error.name !== "AbortError") setMediaError(error.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setMediaLoading(false);
            });
        return () => controller.abort();
    }, [selectedCategoryId, selectedSubcategory]);

    useEffect(() => {
        if (!openVideo) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const handleKeyDown = (event) => {
            if (event.key === "Escape") setOpenVideo(null);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openVideo]);

    useEffect(() => {
        setCurrentPage(1);
        setOpenIndex(null);
    }, [selectedCategoryId, selectedSubcategory, mediaType]);

    return (
        <section
            id="gallery"
            data-tone="light"
            aria-labelledby="gallery-title"
            className="section relative bg-blossom pt-0"
        >
            <div
                data-tone="dark"
                className="relative isolate flex min-h-[20rem] items-center overflow-hidden bg-plum sm:min-h-[25rem] lg:min-h-[29rem]"
            >
                <SmartImage
                    image={danceShowcase.wide}
                    sizes="100vw"
                    className="absolute inset-0 h-full w-full"
                    position="50% 42%"
                    priority
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-plum/55 to-plum/15"
                />
                <motion.div
                    className="shell relative z-10 py-20"
                    initial={reduce ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.7, ease }}
                >
                    <p className="eyebrow text-gold">Kala Mandir · Art & Dance</p>
                    <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] text-cream">
                        Student{" "}
                        <span className="italic text-pink">Gallery</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                        Explore the artwork and dance moments created in our studio.
                    </p>
                </motion.div>
            </div>

            {/* Decorative corner paint-swatch — quiet, aria-hidden */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 hidden select-none lg:block"
            >
                <div className="flex gap-2 pt-10">
                    <span className="h-16 w-2.5 rounded-full bg-pink/70" />
                    <span className="h-16 w-2.5 rounded-full bg-rose/70" />
                    <span className="h-16 w-2.5 rounded-full bg-gold/80" />
                    <span className="h-16 w-2.5 rounded-full bg-violet/60" />
                </div>
            </div>

            <div className="shell">
                {/* Header */}
                <div className="flex flex-col gap-8">
                    <SectionHeading
                        id="gallery-title"
                        number="04"
                        eyebrow={artOnly ? "Art & craft exhibition" : "Student exhibition"}
                        title={
                            artOnly ? (
                                <>
                                    Ideas in colour,{" "}
                                    <span className="italic text-pink">made by hand.</span>
                                </>
                            ) : (
                                <>
                                    Made in{" "}
                                    <span className="italic text-pink">our classes</span>,
                                    kept with pride.
                                </>
                            )
                        }
                        standfirst={
                            artOnly
                                ? "Explore student drawings, paintings and craft projects from Kala Mandir. Each piece reflects a different way of looking closely, working with colour and making something by hand."
                                : "Browse student artwork, dance photography and videos from Kala Mandir classes."
                        }
                        className="max-w-[38rem]"
                    >
                        <BrushStroke className="mt-7 h-4 w-56 text-pink/70" />
                    </SectionHeading>

                    <Reveal delay={0.1}>
                        <div className="rounded-[20px] border border-rule bg-white/85 p-4 shadow-[0_18px_45px_-34px_rgba(53,21,54,0.45)] sm:p-6">
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="eyebrow text-rose">Browse the collection</p>
                                    <p className="mt-1 text-sm text-muted">
                                        Showing {visibleItems.length} {mediaType === "all" ? "photos and videos" : mediaType === "photo" ? "photos" : "videos"}
                                    </p>
                                </div>
                                <div className="flex rounded-full border border-rule bg-blossom/50 p-1" role="group" aria-label="Filter gallery by media type">
                                    {[
                                        { id: "all", label: "All" },
                                        { id: "photo", label: "Photos" },
                                        { id: "video", label: "Videos" },
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setMediaType(option.id)}
                                            aria-pressed={mediaType === option.id}
                                            className={cn(
                                                "rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm",
                                                mediaType === option.id
                                                    ? "bg-plum text-white shadow-sm"
                                                    : "text-muted hover:bg-white hover:text-text",
                                            )}
                                        >
                                            {option.label}
                                            <span className="ml-1.5 tabular-nums opacity-70">
                                                {option.id === "all"
                                                    ? filtered.length
                                                    : filtered.filter((item) => item.type === option.id).length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-2 text-sm font-medium text-text">
                                    Category
                                    <select
                                        value={selectedCategoryId}
                                        onChange={(event) => {
                                            const nextId = event.target.value;
                                            const category = categories.find((item) => item.id === nextId);
                                            setSelectedCategoryId(nextId);
                                            setSelectedSubcategory(
                                                category?.subcategories.length ? "" : "__all__",
                                            );
                                            setOpenIndex(null);
                                        }}
                                        disabled={categoriesLoading || categories.length === 0}
                                        className="min-h-12 rounded-xl border border-rule bg-white px-4 text-[15px] font-normal text-text outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/15 disabled:cursor-not-allowed disabled:bg-blossom/50"
                                    >
                                        <option value="">
                                            {categoriesLoading ? "Loading categories..." : "All categories"}
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="grid gap-2 text-sm font-medium text-text">
                                    Subcategory
                                    <select
                                        value={selectedSubcategory}
                                        onChange={(event) => {
                                            setSelectedSubcategory(event.target.value);
                                            setOpenIndex(null);
                                        }}
                                        disabled={!selectedCategory || selectedCategory.subcategories.length === 0}
                                        className="min-h-12 rounded-xl border border-rule bg-white px-4 text-[15px] font-normal text-text outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/15 disabled:cursor-not-allowed disabled:bg-blossom/50"
                                    >
                                        <option value="">
                                            {!selectedCategory
                                                ? "Select a category first"
                                                : selectedCategory.subcategories.length
                                                  ? "Select a subcategory"
                                                  : "No subcategories"}
                                        </option>
                                        {selectedCategory?.subcategories.length > 0 && (
                                            <option value="__all__">All subcategories</option>
                                        )}
                                        {selectedCategory?.subcategories.map((subcategory) => (
                                            <option key={subcategory} value={subcategory}>
                                                {subcategory}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                        {(categoryError || mediaError) && (
                            <p role="alert" className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                {categoryError || mediaError}
                            </p>
                        )}
                    </Reveal>
                </div>

                {/* Provenance note — everything here is the institute's own work */}
                <Reveal delay={0.15}>
                    <p className="mt-6 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
                        <span
                            aria-hidden="true"
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pink motion-safe:animate-pulse"
                        />
                        <span className="max-w-[54rem]">
                            The photos, videos and student work shown here are{" "}
                            <span className="font-medium text-text">
                                from Kala Mandir classes
                            </span>
                            , supplied by the institute.
                        </span>
                    </p>
                </Reveal>

                {/* Masonry exhibition wall — calm, art-first, no distortion */}
                <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:mt-14 lg:columns-3 lg:gap-6">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {pagedItems.map((item) => {
                            const accent = ACCENTS[item.category] || ACCENTS.all;
                            return (
                                <motion.figure
                                    key={item.id}
                                    layout={!reduce}
                                    initial={
                                        reduce
                                            ? false
                                            : { opacity: 0, y: 18, scale: 0.985 }
                                    }
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={
                                        reduce
                                            ? { opacity: 0 }
                                            : { opacity: 0, y: -8, scale: 0.985 }
                                    }
                                    transition={{ duration: 0.45, ease }}
                                    className="group mb-5 break-inside-avoid lg:mb-6"
                                >
                                    {item.type === "video" ? (
                                        <div className="relative overflow-hidden rounded-[14px] bg-plum">
                                            <video
                                                src={item.src}
                                                aria-label={item.alt}
                                                controls
                                                playsInline
                                                preload="metadata"
                                                className="tile-lift aspect-[4/5] w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setOpenVideo(item)}
                                                aria-label={`Watch ${item.caption} in a larger player`}
                                                className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-charcoal/80 px-3.5 py-2.5 text-xs font-medium text-white shadow-lg backdrop-blur transition hover:bg-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                            >
                                                <Play aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
                                                Watch separately
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setOpenIndex(lightboxItems.indexOf(item))}
                                            className="relative block w-full overflow-hidden rounded-[14px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-blossom"
                                            aria-label={`Open in gallery: ${item.caption}`}
                                        >
                                            <SmartImage
                                                image={item}
                                                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                                                className={cn("tile-lift w-full", CROPS[item.crop] || "aspect-[4/5]")}
                                                position={item.position || "50% 45%"}
                                                imgClassName="transition-transform duration-[650ms] ease-out group-hover:scale-[1.05] motion-reduce:transform-none"
                                            />
                                            <ZoomCue />
                                            {/* Caption overlay — appears on hover/focus only,
                                                the caption also exists as real text below. */}
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-4 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            >
                                                <span className="text-[13.5px] font-medium text-white">
                                                    {item.caption}
                                                </span>
                                                <span className="eyebrow flex items-center gap-1.5 text-white/85">
                                                    <span
                                                        className={cn(
                                                            "h-1.5 w-1.5 rounded-full",
                                                            accent.dot,
                                                        )}
                                                    />
                                                    {item.category}
                                                </span>
                                            </span>
                                        </button>
                                    )}

                                    {/* Always-visible caption for a11y + print feel */}
                                    <figcaption className="relative mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-2.5">
                                        {/* Pigment rule — the piece's own category
                            colour laid over the hairline. */}
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "absolute -top-px left-0 h-[2px] w-10 origin-left transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-x-[2.6] motion-reduce:group-hover:scale-x-100",
                                                accent.dot,
                                            )}
                                        />
                                        <span className="text-[14px] leading-snug text-text/85">
                                            {item.caption}
                                        </span>
                                        <span className="eyebrow flex shrink-0 items-center gap-1.5">
                                            <span
                                                aria-hidden="true"
                                                className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    accent.dot,
                                                )}
                                            />
                                            <span className={accent.text}>
                                                {item.category}
                                            </span>
                                        </span>
                                    </figcaption>
                                </motion.figure>
                            );
                        })}
                    </AnimatePresence>
                </div>
                {pageCount > 1 && (
                    <nav
                        aria-label="Gallery pages"
                        className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-rule bg-white/70 px-4 py-4 sm:flex-row sm:px-6"
                    >
                        <p className="text-sm text-muted" aria-live="polite">
                            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                            {Math.min(currentPage * PAGE_SIZE, visibleItems.length)} of {visibleItems.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                disabled={currentPage === 1}
                                className="inline-flex min-h-10 items-center gap-1 rounded-full border border-rule px-4 text-sm text-text transition hover:border-rose hover:text-rose disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                                Previous
                            </button>
                            <span className="min-w-20 text-center text-sm font-medium text-text" aria-label={`Page ${currentPage} of ${pageCount}`}>
                                {currentPage} / {pageCount}
                            </span>
                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                                disabled={currentPage === pageCount}
                                className="inline-flex min-h-10 items-center gap-1 rounded-full border border-rule px-4 text-sm text-text transition hover:border-rose hover:text-rose disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                                <ChevronRight aria-hidden="true" className="h-4 w-4" />
                            </button>
                        </div>
                    </nav>
                )}

                {/* Enquiry CTA under the exhibition */}
                <RevealGroup className="mt-14 flex flex-col items-start gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[30rem] font-display text-[1.45rem] leading-snug text-text sm:text-[1.7rem]">
                        <SplitText text="Want work like this on your wall?" />
                    </p>
                    <div className="flex flex-wrap gap-x-7 gap-y-4">
                        <Magnetic>
                            <Link
                                to="/contact#enquiry"
                                className="btn-wipe group inline-flex items-center gap-2 rounded-[11px] bg-rose px-6 py-3.5 text-[15px] font-medium text-white"
                                style={{ "--wipe-fill": "var(--color-pink)" }}
                            >
                                <span className="btn-wipe__label" data-text="Enquire about art classes">
                                    <span className="btn-wipe__text">Enquire about art classes</span>
                                </span>
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </Magnetic>
                        <Link
                            to={artOnly ? "/art#art" : "/art#art-detail"}
                            className="rule-link text-[15px] text-text hover:text-rose"
                        >
                            {artOnly ? "Explore art classes" : "More about the syllabus"}
                        </Link>
                    </div>
                </RevealGroup>

                {(categoriesLoading || mediaLoading) && (
                    <div className="mt-14 rounded-[14px] border border-dashed border-rule px-6 py-16 text-center">
                        <p className="font-display text-[1.4rem] text-text">Loading gallery...</p>
                    </div>
                )}
                {!categoriesLoading && !categoryError && categories.length === 0 && (
                    <div className="mt-14 rounded-[14px] border border-dashed border-rule px-6 py-16 text-center">
                        <p className="font-display text-[1.6rem] text-text">No gallery categories yet.</p>
                        <p className="mt-2 text-[15px] text-muted">
                            Categories added in the admin panel will appear here.
                        </p>
                    </div>
                )}
                {!mediaLoading && !mediaError && selectedCategory && !selectedSubcategory && (
                    <div className="mt-14 rounded-[14px] border border-dashed border-rule px-6 py-16 text-center">
                        <p className="font-display text-[1.4rem] text-text">Choose a subcategory to view its work.</p>
                    </div>
                )}
                {!mediaLoading && !mediaError && filtered.length === 0 && (!selectedCategory || selectedSubcategory) && categories.length > 0 && (
                    <div className="mt-14 rounded-[14px] border border-dashed border-rule px-6 py-16 text-center">
                        <p className="font-display text-[1.6rem] text-text">No gallery items yet.</p>
                        <p className="mt-2 text-[15px] text-muted">
                            Photos and videos uploaded to this category will appear here.
                        </p>
                    </div>
                )}
                {!mediaLoading && !mediaError && filtered.length > 0 && visibleItems.length === 0 && (
                    <div className="mt-14 rounded-[14px] border border-dashed border-rule px-6 py-16 text-center">
                        <p className="font-display text-[1.5rem] text-text">No {mediaType === "photo" ? "photos" : "videos"} in this selection.</p>
                        <p className="mt-2 text-[15px] text-muted">Choose another media filter to keep exploring.</p>
                    </div>
                )}
            </div>

            <GalleryLightbox
                items={lightboxItems}
                index={openIndex}
                onClose={() => setOpenIndex(null)}
                onNavigate={setOpenIndex}
            />
            <AnimatePresence>
                {openVideo && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Video: ${openVideo.caption}`}
                        tabIndex={-1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) setOpenVideo(null);
                        }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm sm:p-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-5xl"
                        >
                            <button
                                type="button"
                                onClick={() => setOpenVideo(null)}
                                aria-label="Close video player"
                                className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <X aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <video
                                key={openVideo.id}
                                src={openVideo.src}
                                aria-label={openVideo.alt}
                                controls
                                autoPlay
                                playsInline
                                className="max-h-[80vh] w-full rounded-xl bg-black object-contain shadow-2xl"
                            />
                            <p className="mt-3 text-center text-sm text-white/80">{openVideo.caption}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
