


import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart, Music, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/SmartImage";
import { editorialImages, instagramPosts } from "@/data/gallery";

const DANCE_CLASSES = [
  { icon: Users, title: "Wedding Dance" },
  { icon: Users, title: "Couple Dance" },
  { icon: Heart, title: "Bollywood" },
  { icon: Music, title: "Freestyle" },
  { icon: Users, title: "Kids Dance" },
  { icon: Users, title: "Contemporary" },
];

const danceShowcase = editorialImages.danceShowcase;
const danceGallery = [
  danceShowcase.group,
  danceShowcase.zumba,
  danceShowcase.wedding,
  danceShowcase.duo,
  instagramPosts[2],
];
const danceHeroImages = [
  danceShowcase.wide,
  danceShowcase.group,
  danceShowcase.zumba,
  danceShowcase.wedding,
];

export default function DanceAcademy() {
  const danceGalleryRef = useRef(null);
  const [galleryPosition, setGalleryPosition] = useState({ atStart: true, atEnd: false });
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % danceHeroImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const gallery = danceGalleryRef.current;
    if (!gallery) return undefined;

    const updatePosition = () => {
      const atStart = gallery.scrollLeft <= 1;
      const atEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1;
      setGalleryPosition((position) => {
        if (position.atStart === atStart && position.atEnd === atEnd) return position;
        return { atStart, atEnd };
      });
    };

    updatePosition();
    gallery.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      gallery.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const moveDanceGallery = (direction) => {
    const gallery = danceGalleryRef.current;
    const firstPhoto = gallery?.firstElementChild;
    const secondPhoto = firstPhoto?.nextElementSibling;
    if (!gallery || !firstPhoto) return;

    const step = secondPhoto
      ? secondPhoto.offsetLeft - firstPhoto.offsetLeft
      : firstPhoto.getBoundingClientRect().width;
    gallery.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="bg-[#fdf6f8] text-[#3d1f2d]">
      <section id="dance" className="relative overflow-hidden">
        {/* ========== FULL-WIDTH HERO WITH CAROUSEL CONTROLS ========== */}
        <div
          data-tone="dark"
          aria-roledescription="carousel"
          aria-label="Dance Academy photos"
          className="relative h-[70vh] min-h-[520px] w-full overflow-hidden"
        >
          <SmartImage
            key={heroIndex}
            image={danceHeroImages[heroIndex]}
            sizes="100vw"
            fit="cover"
            className="absolute inset-0 h-full w-full"
            position="50% 30%"
            priority={heroIndex === 0}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
          />

          {/* Centered content + controls */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gold">
              Dance Academy
            </p>
            <h1 className="font-display text-5xl font-medium text-cream md:text-6xl lg:text-7xl">
              Grace in Every Move
            </h1>

            {/* Carousel controls – middle center */}
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous Dance Academy photo"
                onClick={() =>
                  setHeroIndex(
                    (index) =>
                      (index - 1 + danceHeroImages.length) % danceHeroImages.length
                  )
                }
                className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-black/40 text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              {danceHeroImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Show Dance Academy photo ${index + 1}`}
                  aria-current={index === heroIndex ? "true" : undefined}
                  onClick={() => setHeroIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === heroIndex
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/55 hover:bg-white/80"
                  }`}
                />
              ))}

              <button
                type="button"
                aria-label="Next Dance Academy photo"
                onClick={() =>
                  setHeroIndex((index) => (index + 1) % danceHeroImages.length)
                }
                className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-black/40 text-white transition hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ========== REST OF THE CONTENT ========== */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-14 text-center">
            <h2 className="mb-3 font-display text-3xl">Our Dance Classes</h2>
            <p className="mx-auto max-w-xl text-[#7a4a5c]">
              From classical to contemporary, we offer a variety of dance styles
              to help you find your rhythm and express your unique self.
            </p>
          </div>

          <div className="mb-20 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {DANCE_CLASSES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 rounded-2xl border border-[#f3d6e0] bg-white p-5 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fce8ef] text-[#c45c7a]">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">{item.title}</p>
                  {item.subtitle && (
                    <p className="mt-0.5 text-xs text-[#9a6a7a]">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-20 grid items-start gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl shadow-lg">
              <SmartImage
                image={danceShowcase.group}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="aspect-[4/3] w-full"
              />
            </div>

            <div>
              <h2 className="mb-6 font-display text-2xl">Why Choose Our Dance Academy?</h2>
              <ul className="mb-8 space-y-4">
                {[
                  "Experienced & passionate teachers",
                  "Small batch sizes",
                  "Focus on technique & performance",
                  "Regular performances & showcases",
                  "Friendly & supportive environment",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c45c7a]" />
                    <span className="text-[#5a3a4a]">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-[#f3d6e0] bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-medium text-[#c45c7a]">Class Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#9a6a7a]">Age Group</p>
                    <p className="font-medium">4 years onwards</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Class Timing</p>
                    <p className="font-medium">Flexible slots</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Batch Size</p>
                    <p className="font-medium">8–12 students</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Duration</p>
                    <p className="font-medium">1 hour per class</p>
                  </div>
                </div>
                <Link
                  to="/contact#enquiry"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c45c7a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b04a68]"
                >
                  Enroll Now
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="py-12 text-center">
            <p className="font-display text-3xl italic text-[#3d1f2d] md:text-4xl">
              “Dance is not just an art, <br className="hidden sm:block" />
              it’s a way of life.”
            </p>
          </div>

          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl">Our Student Dance</h2>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Previous student dance photos"
                  aria-controls="student-dance-gallery"
                  disabled={galleryPosition.atStart}
                  onClick={() => moveDanceGallery(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#e8c4d0] bg-white text-[#7a4a5c] transition hover:border-[#c45c7a] hover:text-[#c45c7a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next student dance photos"
                  aria-controls="student-dance-gallery"
                  disabled={galleryPosition.atEnd}
                  onClick={() => moveDanceGallery(1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#e8c4d0] bg-white text-[#7a4a5c] transition hover:border-[#c45c7a] hover:text-[#c45c7a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              id="student-dance-gallery"
              ref={danceGalleryRef}
              role="region"
              aria-label="Student dance photos"
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {danceGallery.map((image) => (
                <figure
                  key={image.src}
                  className="w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#f3d6e0] bg-white shadow-md sm:w-[46%] lg:w-[31%]"
                >
                  <SmartImage
                    image={image}
                    width={4}
                    height={3}
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 46vw, 31vw"
                    className="w-full"
                    imgClassName="transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}