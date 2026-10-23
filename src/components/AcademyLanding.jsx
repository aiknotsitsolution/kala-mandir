import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Music, Users, Heart, Palette, Brush, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/SmartImage";
import { Reveal, RevealGroup, RevealItem, MediaMask } from "@/components/Reveal";
import { editorialImages, instagramPosts, studioLife } from "@/data/gallery";
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

export default function AcademyLanding({ academy = "dance" }) {
  const isArtAcademy = academy === "art";
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
    danceShowcase.group,
    danceShowcase.zumba,
    danceShowcase.wedding,
    danceShowcase.duo,
    instagramPosts[2],
  ];
  const artGallery = [
    ...editorialImages.artDetail,
    ...studioLife.filter((photo) => photo.tag !== "Zumba"),
  ];

  return (
    <div className="bg-[#fdf6f8] text-[#3d1f2d]">
      {/* ========== DANCE ACADEMY ========== */}
      {!isArtAcademy && (
      <section id="dance" className="relative overflow-hidden">
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
            <h3 className="text-2xl font-display mb-6 text-center">Our Student Dance</h3>
            <div className="columns-2 gap-4 md:columns-3 lg:columns-5">
              {danceGallery.map((img) => (
                  <figure
                    key={img.id}
                    className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[#f3d6e0] bg-white shadow-md sm:mb-5"
                  >
                    <SmartImage
                      image={img}
                      sizes="(max-width: 767px) 50vw, 20vw"
                      className="w-full"
                      imgClassName="transition-transform duration-500 hover:scale-105"
                    />
                  </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ========== ART ACADEMY ========== */}
      {isArtAcademy && (
      <section id="art" className="border-t border-[#f3d6e0] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {isArtAcademy && (
            <div className="relative mb-16 min-h-[22rem] overflow-hidden rounded-[24px] bg-[#351536] shadow-[0_26px_70px_-38px_rgba(53,21,54,0.65)] sm:min-h-[28rem] lg:mb-20 lg:min-h-[34rem]">
              <SmartImage
                image={editorialImages.intro.main}
                sizes="(max-width: 1023px) 92vw, 85vw"
                className="absolute inset-0 h-full w-full"
                position="50% 40%"
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(100deg,rgba(53,21,54,0.8)_0%,rgba(53,21,54,0.4)_55%,rgba(53,21,54,0.12)_100%)]"
              />
              <div className="relative z-10 flex min-h-[22rem] max-w-3xl flex-col justify-center px-6 py-12 sm:min-h-[28rem] sm:px-10 lg:min-h-[34rem] lg:px-16">
                <p className="eyebrow text-gold">Art Academy</p>
                <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] text-cream">
                  Colors Create a{" "}
                  <span className="italic text-pink">Brighter World</span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Explore drawing, painting and art craft through patient studio
                  practice, observation and colour.
                </p>
              </div>
            </div>
          )}

          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.25em] uppercase text-[#c45c7a] mb-2">
              Our Art Classes
            </p>
            <h2 className="text-4xl md:text-5xl font-display">
              Drawing, painting & art craft
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#7a4a5c]">
              Explore sketching, portrait drawing, oil and acrylic painting,
              and hands-on creative work with colour and materials.
            </p>
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
              <SmartImage
                image={studioLife[1]}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-display mb-6">Why Choose Our Art Academy?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Begin with drawing fundamentals",
                  "Explore oil and acrylic painting",
                  "Work with colour, texture and surface",
                  "Try creative art and craft",
                  "Develop each piece at your own pace",
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
                    <p className="text-[#9a6a7a]">Drawing</p>
                    <p className="font-medium">Sketching & portraits</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Painting</p>
                    <p className="font-medium">Oil & acrylic</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Creative work</p>
                    <p className="font-medium">Art & craft</p>
                  </div>
                  <div>
                    <p className="text-[#9a6a7a]">Enquiries</p>
                    <p className="font-medium">Open</p>
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

          {isArtAcademy && (
            <div className="my-16 rounded-[22px] border border-[#f3d6e0] bg-[#fce7f3] px-6 py-10 text-center sm:my-20 sm:px-10 sm:py-14">
              <p className="eyebrow text-rose">A note from the studio</p>
              <p className="mx-auto mt-4 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] italic leading-tight text-[#3d1f2d]">
                “Slow down, look closely, and make it yours.”
              </p>
            </div>
          )}

          {/* Student artwork gallery */}
          <div className="mt-16">
            <h3 className="text-2xl font-display mb-6 text-center">Our Student Art</h3>
            <RevealGroup
              amount={0.05}
              className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4"
            >
              {artGallery.map((artwork) => (
                <RevealItem
                  key={artwork.id ?? artwork.src}
                  as="figure"
                  className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[#f3d6e0] bg-white shadow-[0_16px_36px_-26px_rgba(61,31,45,0.45)] sm:mb-5"
                >
                  <MediaMask className="overflow-hidden">
                    <SmartImage
                      image={artwork}
                      sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 23vw"
                      className="w-full"
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </MediaMask>
                  <figcaption className="border-t border-[#f3d6e0] px-3 py-3 text-sm text-[#5a3a4a] sm:px-4">
                    {artwork.caption || artwork.alt}
                  </figcaption>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}