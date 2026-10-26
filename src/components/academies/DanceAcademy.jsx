

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Music,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/SmartImage";
import { editorialImages, instagramPosts } from "@/data/gallery";

const DANCE_CLASSES = [
  {
    icon: Heart,
    title: "Wedding Dance",
    description: "Personalised choreography for your special celebration.",
  },
  {
    icon: Users,
    title: "Couple Dance",
    description: "Learn a routine together, one step at a time.",
  },
  {
    icon: Heart,
    title: "Bollywood",
    description: "Bring expressive moves and Bollywood rhythms to life.",
  },
  {
    icon: Music,
    title: "Freestyle",
    description: "Explore rhythm, movement and your own dance style.",
  },
  {
    icon: Sparkles,
    title: "Kids Dance",
    description: "A joyful introduction to movement, music and dance.",
  },
  {
    icon: Music,
    title: "Contemporary",
    description: "Discover expressive movement, flow and musicality.",
  },
  {
    icon: Sparkles,
    title: "Classical Dance",
    description: "Explore graceful movement, rhythm and expressive storytelling.",
  },
];

const DANCE_BENEFITS = [
  "Separate batches for children and adults",
  "Small groups with a maximum of 4 students",
  "Learn technique, rhythm and choreography",
  "Special one-to-one sessions available",
];

const CLASS_FORMATS = [
  {
    number: "01",
    icon: Sparkles,
    label: "For young movers",
    title: "Kids batches",
    detail: "Dance classes for children aged 3 years and onwards.",
    notes: [
      "Children aged 3 years onwards",
      "Separate kids batch",
      "Maximum 4 students per batch",
    ],
  },
  {
    number: "02",
    icon: Users,
    label: "Make time for you",
    title: "Adult batches",
    detail: "Welcoming dance classes for adults aged 16 to 70.",
    notes: [
      "Adults aged 16 to 70",
      "Separate adult batch",
      "Maximum 4 students per batch",
    ],
  },
  {
    number: "03",
    icon: User,
    label: "A little extra focus",
    title: "One-to-one sessions",
    detail: "A special personal session shaped around your goals and pace.",
    notes: ["Individual attention"],
  },
];

const danceShowcase = editorialImages.danceShowcase;
const danceGallery = [
  danceShowcase.group,
  danceShowcase.zumba,
  danceShowcase.wedding,
  danceShowcase.duo,
  instagramPosts[2],
];
export default function DanceAcademy() {
  const danceGalleryRef = useRef(null);
  const [galleryPosition, setGalleryPosition] = useState({ atStart: true, atEnd: false });
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Gallery scroll position
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

  // Scroll-triggered reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.dataset.reveal]: true }));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="bg-[#fdf6f8] text-[#3d1f2d]">
      <section id="dance" className="relative overflow-hidden">
        {/* ========== FULL-WIDTH HERO ========== */}
        <div
          data-tone="dark"
          className="relative isolate min-h-[38rem] overflow-hidden bg-[#351536] sm:min-h-[44rem] lg:min-h-[48rem]"
        >
          <img
            src="/assets/institute/dance-academy-hero.jpg"
            alt="Two dancers enjoying a Bollywood dance class at Kala Mandir"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
          />

          {/* Overlays */}
          <div aria-hidden="true" className="absolute inset-0 bg-[#251027]/25" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#251027]/90 via-[#251027]/55 to-[#251027]/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#251027]/75 via-transparent to-[#251027]/10"
          />

          {/* Content */}
          <div
            className="relative z-10 mx-auto flex min-h-[38rem] max-w-6xl flex-col justify-center px-6 py-20 sm:min-h-[44rem] sm:px-10 lg:min-h-[48rem] lg:px-6"
          >
            <div className="max-w-3xl animate-[fadeUp_0.9s_ease-out_forwards]">
              <p className="eyebrow text-gold tracking-[0.25em]">Kala Mandir · Dance Academy</p>
              <h1 className="mt-5 font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.05] text-cream">
                Move with joy.{" "}
                <span className="italic text-pink">Find your rhythm.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Discover Bollywood, classical and contemporary dance in a
                welcoming studio. With separate classes for children and adults,
                there is a place for every age to learn, practise and shine.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#class-details"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c45c7a] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#c45c7a]/25 transition-all duration-300 hover:bg-[#b04a68] hover:shadow-xl hover:shadow-[#c45c7a]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Explore dance classes
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
                <Link
                  to="/contact#enquiry"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MAIN CONTENT ========== */}
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          {/* Dance Styles */}
          <div
            id="dance-classes"
            ref={setRef("styles")}
            data-reveal="styles"
            className={`mb-12 scroll-mt-24 text-center transition-all duration-700 ${
              isVisible.styles ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c45c7a]">
              Make a little space for dance
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#3d1f2d] md:text-5xl">
              Find a style that <span className="italic">moves you.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#7a4a5c]">
              Explore classical dance, learn a routine for a special day, enjoy
              music with your child or simply make time to move. Start with the
              style that feels right for you.
            </p>
          </div>

          <div className="mb-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DANCE_CLASSES.map((item, i) => (
              <div
                key={item.title}
                ref={i === 0 ? setRef("styleCards") : undefined}
                data-reveal="styleCards"
                className={`group relative flex h-full gap-4 overflow-hidden rounded-2xl border border-[#f3d6e0] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#e6b8c8] hover:shadow-xl hover:shadow-[#c45c7a]/10 ${
                  isVisible.styleCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible.styleCards ? `${i * 80}ms` : "0ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fce8ef]/0 to-[#fce8ef]/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fce8ef] text-[#c45c7a] transition-all duration-400 group-hover:scale-110 group-hover:bg-[#c45c7a] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#c45c7a]/30">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="relative">
                  <h3 className="font-display text-xl text-[#3d1f2d] transition-colors duration-300 group-hover:text-[#b04a68]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#7a4a5c]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Studio Experience */}
          <div
            ref={setRef("studio")}
            data-reveal="studio"
            className={`mb-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
              isVisible.studio ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="group relative overflow-hidden rounded-[2rem] bg-[#351536] shadow-2xl shadow-[#351536]/20">
              <SmartImage
                image={danceShowcase.group}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#251027]/90 via-[#251027]/50 to-transparent p-7 pt-20 sm:p-9 sm:pt-24">
                <p className="font-display text-2xl text-white sm:text-3xl">
                  Every dancer starts somewhere.
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Take your next step at Kala Mandir.
                </p>
              </div>
            </div>

            <div className="py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c45c7a]">
                Learn at your own pace
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-[#3d1f2d] sm:text-4xl">
                A friendly place to{" "}
                <span className="italic">learn, practise and grow.</span>
              </h2>
              <p className="mt-4 leading-relaxed text-[#7a4a5c]">
                Whether you are new to dance or getting ready for a performance,
                choose the class style that fits your age, interests and goals.
              </p>
              <ul className="mt-8 space-y-4">
                {DANCE_BENEFITS.map((text, i) => (
                  <li
                    key={text}
                    className="flex items-start gap-3.5 transition-all duration-500"
                    style={{
                      transitionDelay: isVisible.studio ? `${200 + i * 90}ms` : "0ms",
                      opacity: isVisible.studio ? 1 : 0,
                      transform: isVisible.studio ? "translateX(0)" : "translateX(-12px)",
                    }}
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#fce8ef] text-[#c45c7a] shadow-sm">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-[#5a3a4a] sm:text-base">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Class Details */}
          <div id="class-details" className="mb-24 scroll-mt-24">
            <div
              ref={setRef("formatsHeader")}
              data-reveal="formatsHeader"
              className={`mb-12 text-center transition-all duration-700 ${
                isVisible.formatsHeader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c45c7a]">
                Your class, your way
              </p>
              <h2 className="mt-3 font-display text-4xl text-[#3d1f2d] md:text-5xl">
                Class <span className="italic">details</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#7a4a5c]">
                Choose a separate small batch for kids or adults, or ask us
                about a special one-to-one session.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {CLASS_FORMATS.map((format, i) => (
                <article
                  key={format.number}
                  ref={i === 0 ? setRef("formatCards") : undefined}
                  data-reveal="formatCards"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#f3d6e0] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#e6b8c8] hover:shadow-xl hover:shadow-[#c45c7a]/12 ${
                    isVisible.formatCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: isVisible.formatCards ? `${i * 100}ms` : "0ms" }}
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#fce8ef]/60 transition-transform duration-500 group-hover:scale-150" />
                  
                  <div className="relative mb-7 flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fce8ef] text-[#c45c7a] transition-all duration-400 group-hover:bg-[#c45c7a] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#c45c7a]/25">
                      <format.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl text-[#f3d6e0] transition-colors duration-300 group-hover:text-[#e6b8c8]">
                      {format.number}
                    </span>
                  </div>
                  
                  <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-[#c45c7a]">
                    {format.label}
                  </p>
                  <h3 className="relative mt-2 font-display text-2xl text-[#3d1f2d]">
                    {format.title}
                  </h3>
                  <p className="relative mt-3 min-h-[3.5rem] text-sm leading-relaxed text-[#7a4a5c]">
                    {format.detail}
                  </p>
                  
                  <div className="relative mt-5 border-t border-[#f3d6e0] pt-4">
                    <ul className="space-y-3">
                      {format.notes.map((note) => (
                        <li
                          key={note}
                          className="flex items-start gap-2.5 text-sm font-medium text-[#5a3a4a]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#c45c7a]"
                            aria-hidden="true"
                          />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    to="/contact#enquiry"
                    className="relative mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-semibold text-[#b04a68] transition-colors duration-300 hover:text-[#7a2947] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c45c7a]"
                  >
                    Ask about this class
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Enquiry Callout */}
          <div
            ref={setRef("cta")}
            data-reveal="cta"
            className={`relative mb-24 overflow-hidden rounded-[2rem] bg-[#351536] px-6 py-14 text-center text-white shadow-2xl shadow-[#351536]/25 sm:px-12 sm:py-16 transition-all duration-700 ${
              isVisible.cta ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
            }`}
          >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#c45c7a]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#f2c3d1]/15 blur-3xl" />
            
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2c3d1]">
                Your next chapter starts with one step
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
                Ready to find your{" "}
                <span className="italic text-[#f2c3d1]">dance?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                Tell us what you would like to learn and we’ll help you find the
                right class format.
              </p>
              <Link
                to="/contact#enquiry"
                className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c45c7a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#c45c7a]/30 transition-all duration-300 hover:bg-[#b04a68] hover:shadow-xl hover:shadow-[#c45c7a]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Enquire about classes
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Student Gallery */}
          <div>
            <div
              ref={setRef("gallery")}
              data-reveal="gallery"
              className={`mb-8 flex items-end justify-between gap-4 transition-all duration-700 ${
                isVisible.gallery ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45c7a]">
                  From our studio
                </p>
                <h2 className="mt-2 font-display text-3xl text-[#3d1f2d] sm:text-4xl">
                  Moments in motion
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#7a4a5c]">
                  A glimpse of the energy, practice and joy our dancers bring
                  to every session.
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Previous student dance photos"
                  aria-controls="student-dance-gallery"
                  disabled={galleryPosition.atStart}
                  onClick={() => moveDanceGallery(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#e8c4d0] bg-white text-[#7a4a5c] shadow-sm transition-all duration-300 hover:border-[#c45c7a] hover:text-[#c45c7a] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next student dance photos"
                  aria-controls="student-dance-gallery"
                  disabled={galleryPosition.atEnd}
                  onClick={() => moveDanceGallery(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#e8c4d0] bg-white text-[#7a4a5c] shadow-sm transition-all duration-300 hover:border-[#c45c7a] hover:text-[#c45c7a] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
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
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {danceGallery.map((image, i) => (
                <figure
                  key={image.src}
                  className="group w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#f3d6e0] bg-white shadow-md transition-all duration-500 hover:shadow-xl sm:w-[46%] lg:w-[31%]"
                  style={{
                    transitionDelay: isVisible.gallery ? `${i * 60}ms` : "0ms",
                    opacity: isVisible.gallery ? 1 : 0,
                    transform: isVisible.gallery ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <SmartImage
                    image={image}
                    width={4}
                    height={3}
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 46vw, 31vw"
                    className="w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global keyframes for hero text */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}