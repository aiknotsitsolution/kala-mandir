// import { useEffect, useState } from "react";
// import { ArrowUpRight, Brush, Camera, ChevronLeft, ChevronRight, Palette } from "lucide-react";
// import { Link } from "react-router-dom";
// import SmartImage from "@/components/SmartImage";
// import ArtBackdrop from "@/components/Artbackdrop";
// import { MediaMask, RevealGroup, RevealItem } from "@/components/Reveal";
// import { editorialImages, studioLife } from "@/data/gallery";

// const ART_CLASSES = [
//   { icon: Palette, title: "Drawing" },
//   { icon: Brush, title: "Painting" },
//   { icon: Camera, title: "Mixed Media" },
//   { icon: Palette, title: "Craft & DIY" },
//   { icon: Brush, title: "Creative Workshops" },
// ];

// const artHeroImages = [
//   editorialImages.intro.main,
//   editorialImages.intro.side,
//   editorialImages.artDetail[0],
// ];
// const artGallery = [
//   ...editorialImages.artDetail,
//   ...studioLife.filter((photo) => photo.tag !== "Zumba"),
// ];

// export default function ArtAcademy() {
//   const [heroIndex, setHeroIndex] = useState(0);

//   useEffect(() => {
//     const interval = window.setInterval(() => {
//       setHeroIndex((index) => (index + 1) % artHeroImages.length);
//     }, 5000);

//     return () => window.clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-[#fdf6f8] text-[#3d1f2d]">
//       <section
//         id="art"
//         className="relative isolate overflow-hidden border-t border-[#f3d6e0] bg-[#fffafc]"
//       >
//         <ArtBackdrop variant="classes" />
//         <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
//           <div
//             data-tone="dark"
//             aria-roledescription="carousel"
//             aria-label="Art Academy photos"
//             className="relative mb-16 min-h-[22rem] overflow-hidden bg-[#351536] shadow-[0_26px_70px_-38px_rgba(53,21,54,0.65)] sm:min-h-[28rem] lg:mb-20 lg:min-h-[34rem]"
//           >
//             <SmartImage
//               key={heroIndex}
//               image={artHeroImages[heroIndex]}
//               sizes="(max-width: 1023px) 92vw, 85vw"
//               fit="cover"
//               className="absolute inset-0 h-full w-full"
//               position="center"
//               priority={heroIndex === 0}
//             />
//             <div
//               aria-hidden="true"
//               className="absolute inset-0 bg-gradient-to-r from-[#351536]/70 via-[#351536]/30 to-transparent"
//             />
//             <div
//               role="group"
//               aria-roledescription="slide"
//               aria-label={`Photo ${heroIndex + 1} of ${artHeroImages.length}: ${artHeroImages[heroIndex].alt}`}
//               className="relative z-10 flex min-h-[22rem] max-w-3xl flex-col justify-center px-6 py-12 sm:min-h-[28rem] sm:px-10 lg:min-h-[34rem] lg:px-16"
//             >
//               <p className="eyebrow text-gold">Art Academy</p>
//               <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] text-cream">
//                 Colors Create a{" "}
//                 <span className="italic text-pink">Brighter World</span>
//               </h1>
//               <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
//                 Explore drawing, painting and art craft through patient studio
//                 practice, observation and colour.
//               </p>
//               <div className="mt-8 flex items-center gap-3">
//                 <button
//                   type="button"
//                   aria-label="Previous Art Academy photo"
//                   onClick={() =>
//                     setHeroIndex((index) => (index - 1 + artHeroImages.length) % artHeroImages.length)
//                   }
//                   className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-[#351536]/50 text-white transition hover:bg-white/20"
//                 >
//                   <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//                 </button>
//                 {artHeroImages.map((image, index) => (
//                   <button
//                     key={image.src}
//                     type="button"
//                     aria-label={`Show Art Academy photo ${index + 1}`}
//                     aria-current={index === heroIndex ? "true" : undefined}
//                     onClick={() => setHeroIndex(index)}
//                     className={`h-2.5 rounded-full transition-all ${
//                       index === heroIndex
//                         ? "w-7 bg-white"
//                         : "w-2.5 bg-white/55 hover:bg-white/80"
//                     }`}
//                   />
//                 ))}
//                 <button
//                   type="button"
//                   aria-label="Next Art Academy photo"
//                   onClick={() => setHeroIndex((index) => (index + 1) % artHeroImages.length)}
//                   className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-[#351536]/50 text-white transition hover:bg-white/20"
//                 >
//                   <ChevronRight className="h-5 w-5" aria-hidden="true" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mb-14 text-center">
//             <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#c45c7a]">
//               Our Art Classes
//             </p>
//             <h2 className="font-display text-4xl md:text-5xl">
//               Drawing, painting & art craft
//             </h2>
//             <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#7a4a5c]">
//               Explore sketching, portrait drawing, oil and acrylic painting,
//               and hands-on creative work with colour and materials.
//             </p>
//           </div>

//           <div className="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
//             {ART_CLASSES.map((item) => (
//               <div
//                 key={item.title}
//                 className="flex flex-col items-center gap-3 rounded-2xl border border-[#f3d6e0] bg-[#fdf6f8] p-5"
//               >
//                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#c45c7a] shadow-sm">
//                   <item.icon className="h-6 w-6" />
//                 </div>
//                 <p className="text-center font-medium">{item.title}</p>
//               </div>
//             ))}
//           </div>

//           <div className="grid items-start gap-10 lg:grid-cols-2">
//             <div className="order-2 relative overflow-hidden rounded-3xl shadow-lg lg:order-1">
//               <SmartImage
//                 image={studioLife[1]}
//                 sizes="(max-width: 1023px) 100vw, 50vw"
//                 className="aspect-[4/3] w-full"
//               />
//             </div>
//             <div className="order-1 lg:order-2">
//               <h2 className="mb-6 font-display text-2xl">Why Choose Our Art Academy?</h2>
//               <ul className="mb-8 space-y-4">
//                 {[
//                   "Begin with drawing fundamentals",
//                   "Explore oil and acrylic painting",
//                   "Work with colour, texture and surface",
//                   "Try creative art and craft",
//                   "Develop each piece at your own pace",
//                 ].map((text) => (
//                   <li key={text} className="flex items-start gap-3">
//                     <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c45c7a]" />
//                     <span className="text-[#5a3a4a]">{text}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="rounded-2xl border border-[#f3d6e0] bg-[#fdf6f8] p-6">
//                 <h3 className="mb-4 font-medium text-[#c45c7a]">Class Details</h3>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div><p className="text-[#9a6a7a]">Drawing</p><p className="font-medium">Sketching & portraits</p></div>
//                   <div><p className="text-[#9a6a7a]">Painting</p><p className="font-medium">Oil & acrylic</p></div>
//                   <div><p className="text-[#9a6a7a]">Creative work</p><p className="font-medium">Art & craft</p></div>
//                   <div><p className="text-[#9a6a7a]">Enquiries</p><p className="font-medium">Open</p></div>
//                 </div>
//                 <Link
//                   to="/contact#enquiry"
//                   className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c45c7a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b04a68]"
//                 >
//                   Enroll Now
//                   <ArrowUpRight className="h-4 w-4" />
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="my-16 rounded-[22px] border border-[#f3d6e0] bg-[#fce7f3] px-6 py-10 text-center sm:my-20 sm:px-10 sm:py-14">
//             <p className="eyebrow text-rose">A note from the studio</p>
//             <p className="mx-auto mt-4 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] italic leading-tight text-[#3d1f2d]">
//               “Slow down, look closely, and make it yours.”
//             </p>
//           </div>

//           <div className="mt-16">
//             <h2 className="mb-6 text-center font-display text-2xl">Our Student Art</h2>
//             <RevealGroup
//               amount={0.05}
//               className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4"
//             >
//               {artGallery.map((artwork) => (
//                 <RevealItem
//                   key={artwork.id ?? artwork.src}
//                   as="figure"
//                   className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[#f3d6e0] bg-white shadow-[0_16px_36px_-26px_rgba(61,31,45,0.45)] sm:mb-5"
//                 >
//                   <MediaMask className="overflow-hidden">
//                     <SmartImage
//                       image={artwork}
//                       sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 23vw"
//                       className="w-full"
//                       imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
//                     />
//                   </MediaMask>
//                   <figcaption className="border-t border-[#f3d6e0] px-3 py-3 text-sm text-[#5a3a4a] sm:px-4">
//                     {artwork.caption || artwork.alt}
//                   </figcaption>
//                 </RevealItem>
//               ))}
//             </RevealGroup>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { ArrowUpRight, Brush, Camera, ChevronLeft, ChevronRight, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/SmartImage";
import ArtBackdrop from "@/components/Artbackdrop";
import { MediaMask, RevealGroup, RevealItem } from "@/components/Reveal";
import { editorialImages, studioLife } from "@/data/gallery";

const ART_CLASSES = [
  { icon: Palette, title: "Drawing" },
  { icon: Brush, title: "Painting" },
  { icon: Camera, title: "Mixed Media" },
  { icon: Palette, title: "Craft & DIY" },
  { icon: Brush, title: "Creative Workshops" },
];

const artHeroImages = [
  editorialImages.intro.main,
  editorialImages.intro.side,
  editorialImages.artDetail[0],
];
const artGallery = [
  ...editorialImages.artDetail,
  ...studioLife.filter((photo) => photo.tag !== "Zumba"),
];

export default function ArtAcademy() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % artHeroImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#fdf6f8] text-[#3d1f2d]">
      <section
        id="art"
        className="relative isolate overflow-hidden border-t border-[#f3d6e0] bg-[#fffafc]"
      >
        <ArtBackdrop variant="classes" />

        {/* ========== FULL-WIDTH HERO BANNER (no side gaps) ========== */}
        <div
          data-tone="dark"
          aria-roledescription="carousel"
          aria-label="Art Academy photos"
          className="relative min-h-[22rem] overflow-hidden bg-[#351536] sm:min-h-[28rem] lg:min-h-[34rem]"
        >
          <SmartImage
            key={heroIndex}
            image={artHeroImages[heroIndex]}
            sizes="100vw"
            fit="cover"
            className="absolute inset-0 h-full w-full"
            position="center"
            priority={heroIndex === 0}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#351536]/70 via-[#351536]/30 to-transparent"
          />
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`Photo ${heroIndex + 1} of ${artHeroImages.length}: ${artHeroImages[heroIndex].alt}`}
            className="relative z-10 mx-auto flex min-h-[22rem] max-w-6xl flex-col justify-center px-6 py-12 sm:min-h-[28rem] sm:px-10 lg:min-h-[34rem] lg:px-16"
          >
            <p className="eyebrow text-gold">Art Academy</p>
            <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] text-cream">
              Colors Create a{" "}
              <span className="italic text-pink">Brighter World</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Explore drawing, painting and art craft through patient studio
              practice, observation and colour.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous Art Academy photo"
                onClick={() =>
                  setHeroIndex(
                    (index) =>
                      (index - 1 + artHeroImages.length) % artHeroImages.length
                  )
                }
                className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-[#351536]/50 text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {artHeroImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Show Art Academy photo ${index + 1}`}
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
                aria-label="Next Art Academy photo"
                onClick={() =>
                  setHeroIndex((index) => (index + 1) % artHeroImages.length)
                }
                className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-[#351536]/50 text-white transition hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ========== REST OF THE CONTENT (still constrained) ========== */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="mb-14 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#c45c7a]">
              Our Art Classes
            </p>
            <h2 className="font-display text-4xl md:text-5xl">
              Drawing, painting & art craft
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#7a4a5c]">
              Explore sketching, portrait drawing, oil and acrylic painting,
              and hands-on creative work with colour and materials.
            </p>
          </div>

          <div className="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {ART_CLASSES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 rounded-2xl border border-[#f3d6e0] bg-[#fdf6f8] p-5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#c45c7a] shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="text-center font-medium">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="order-2 relative overflow-hidden rounded-3xl shadow-lg lg:order-1">
              <SmartImage
                image={studioLife[1]}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="aspect-[4/3] w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 font-display text-2xl">
                Why Choose Our Art Academy?
              </h2>
              <ul className="mb-8 space-y-4">
                {[
                  "Begin with drawing fundamentals",
                  "Explore oil and acrylic painting",
                  "Work with colour, texture and surface",
                  "Try creative art and craft",
                  "Develop each piece at your own pace",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c45c7a]" />
                    <span className="text-[#5a3a4a]">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-[#f3d6e0] bg-[#fdf6f8] p-6">
                <h3 className="mb-4 font-medium text-[#c45c7a]">
                  Class Details
                </h3>
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
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c45c7a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b04a68]"
                >
                  Enroll Now
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="my-16 rounded-[22px] border border-[#f3d6e0] bg-[#fce7f3] px-6 py-10 text-center sm:my-20 sm:px-10 sm:py-14">
            <p className="eyebrow text-rose">A note from the studio</p>
            <p className="mx-auto mt-4 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] italic leading-tight text-[#3d1f2d]">
              “Slow down, look closely, and make it yours.”
            </p>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center font-display text-2xl">
              Our Student Art
            </h2>
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
    </div>
  );
}