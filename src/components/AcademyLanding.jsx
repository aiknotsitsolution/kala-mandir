import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Music, Users, Heart, Palette, Brush, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/SmartImage";
import { Reveal, RevealGroup, RevealItem, MediaMask } from "@/components/Reveal";
import { editorialImages, instagramPosts } from "@/data/gallery";
import { revealKinetic } from "@/lib/motion";
import { useIsDesktop } from "@/hooks";

const DANCE_CLASSES = [
  { icon: Music, title: "Classical", subtitle: "(Bharatanatyam, Kathak)" },
  { icon: Users, title: "Contemporary" },
  { icon: Heart, title: "Bollywood" },
  { icon: Music, title: "Freestyle" },
  { icon: Users, title: "Kids Dance" },
];

const ART_CLASSES = [
  { icon: Palette, title: "Drawing" },
  { icon: Brush, title: "Painting" },
  { icon: Camera, title: "Mixed Media" },
  { icon: Palette, title: "Craft & DIY" },
  { icon: Brush, title: "Creative Workshops" },
];

export default function AcademyLanding() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const parallax = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const { danceShowcase } = editorialImages;
  const danceGallery = [
    instagramPosts[0],
    danceShowcase.group,
    danceShowcase.zumba,
    danceShowcase.wedding,
    danceShowcase.wide,
  ];

  return (
    <div className="bg-[#fdf6f8] text-[#3d1f2d]">
      {/* ========== DANCE ACADEMY ========== */}
      <section className="relative overflow-hidden">
        {/* Hero */}
        <div className="relative h-[70vh] min-h-[520px] w-full">
          <SmartImage
            image={danceShowcase.wide} // keep your existing photo
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
            position="50% 30%"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(110deg,rgba(28,15,30,0.78)_0%,rgba(53,21,54,0.54)_52%,rgba(28,15,30,0.72)_100%)]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gold">
              Dance Academy
            </p>
            <h1 className="font-display text-5xl font-medium text-cream md:text-6xl lg:text-7xl">
              Grace in Every Move
            </h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Our Dance Classes */}
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display mb-3">Our Dance Classes</h2>
            <p className="text-[#7a4a5c] max-w-xl mx-auto">
              From classical to contemporary, we offer a variety of dance styles
              to help you find your rhythm and express your unique self.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-20">
            {DANCE_CLASSES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white shadow-sm border border-[#f3d6e0]"
              >
                <div className="w-14 h-14 rounded-full bg-[#fce8ef] flex items-center justify-center text-[#c45c7a]">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">{item.title}</p>
                  {item.subtitle && (
                    <p className="text-xs text-[#9a6a7a] mt-0.5">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose + Class Details */}
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-20">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <SmartImage
                image={danceShowcase.group} // keep your photo
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-2xl font-display mb-6">Why Choose Our Dance Academy?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Experienced & passionate teachers",
                  "Small batch sizes",
                  "Focus on technique & performance",
                  "Regular performances & showcases",
                  "Friendly & supportive environment",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#c45c7a] shrink-0" />
                    <span className="text-[#5a3a4a]">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Class Details Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#f3d6e0] shadow-sm">
                <h4 className="font-medium mb-4 text-[#c45c7a]">Class Details</h4>
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
                  className="mt-6 inline-flex items-center gap-2 bg-[#c45c7a] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#b04a68] transition"
                >
                  Enroll Now
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center py-12">
            <p className="font-display text-3xl md:text-4xl italic text-[#3d1f2d]">
              “Dance is not just an art, <br className="hidden sm:block" />
              it’s a way of life.”
            </p>
          </div>

          {/* Dance Gallery */}
          <div className="mb-8">
            <h3 className="text-2xl font-display mb-6 text-center">Dance Gallery</h3>
            <div className="columns-2 gap-4 md:columns-3 lg:columns-5">
              {danceGallery.map((img) => {
                const isAcademyPoster = img.id === instagramPosts[0].id;
                return (
                  <figure
                    key={img.id}
                    className={`mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[#f3d6e0] shadow-md sm:mb-5 ${
                      isAcademyPoster ? "bg-charcoal" : "bg-white"
                    }`}
                  >
                    <SmartImage
                      image={img}
                      fit={isAcademyPoster ? "contain" : "cover"}
                      sizes="(max-width: 767px) 50vw, 20vw"
                      className="w-full"
                      imgClassName="transition-transform duration-500 hover:scale-105"
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== ART ACADEMY ========== */}
      <section className="bg-white border-t border-[#f3d6e0]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.25em] uppercase text-[#c45c7a] mb-2">
              Art Academy
            </p>
            <h2 className="text-4xl md:text-5xl font-display">
              Colors Create a Brighter World
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-16">
            {ART_CLASSES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#fdf6f8] border border-[#f3d6e0]"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#c45c7a] shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="font-medium text-center">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="relative rounded-3xl overflow-hidden shadow-lg order-2 lg:order-1">
              {/* You can replace with art images when available */}
              <SmartImage
                image={danceShowcase.zumba} // temporary – replace with art image
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-display mb-6">Why Choose Our Art Academy?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Creative & inspiring environment",
                  "Focus on technique & imagination",
                  "All age groups welcome",
                  "Regular exhibitions",
                  "Personal guidance",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#c45c7a] shrink-0" />
                    <span className="text-[#5a3a4a]">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#fdf6f8] rounded-2xl p-6 border border-[#f3d6e0]">
                <h4 className="font-medium mb-4 text-[#c45c7a]">Class Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#9a6a7a]">Age Group</p>
                    <p className="font-medium">5 years onwards</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Class Timing</p>
                    <p className="font-medium">Weekend & weekday</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Batch Size</p>
                    <p className="font-medium">6–10 students</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Duration</p>
                    <p className="font-medium">1.5 hours</p>
                  </div>
                </div>
                <Link
                  to="/contact#enquiry"
                  className="mt-6 inline-flex items-center gap-2 bg-[#c45c7a] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#b04a68] transition"
                >
                  Enroll Now
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Student Art Gallery preview */}
          <div className="mt-16">
            <h3 className="text-2xl font-display mb-6 text-center">Our Student Art</h3>
            <RevealGroup
              amount={0.05}
              className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4"
            >
              {editorialImages.artDetail.map((artwork, index) => (
                <RevealItem
                  key={artwork.src}
                  as="figure"
                  className="group overflow-hidden rounded-2xl border border-[#f3d6e0] bg-white shadow-[0_16px_36px_-26px_rgba(61,31,45,0.45)]"
                >
                  <MediaMask className="overflow-hidden">
                    <SmartImage
                      image={artwork}
                      sizes="(max-width: 639px) 46vw, (max-width: 767px) 30vw, 23vw"
                      className={`w-full ${
                        index % 2 === 0 ? "aspect-[4/5]" : "aspect-square"
                      }`}
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </MediaMask>
                  <figcaption className="border-t border-[#f3d6e0] px-3 py-3 text-sm text-[#5a3a4a] sm:px-4">
                    {artwork.caption}
                  </figcaption>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    </div>
  );
}