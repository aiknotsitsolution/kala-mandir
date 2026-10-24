// /**
//  * ArtBackdrop — painterly, art-related background layer.
//  *
//  * Pure inline SVG (no image files, no extra deps). Sits behind content with
//  * pointer-events disabled, so it never blocks clicks or hurts text contrast.
//  *
//  *   <section className="relative overflow-hidden"> 
//  *       <ArtBackdrop variant="classes" />
//  *       <div className="shell relative z-10"> ... </div>
//  *   </section>
//  *
//  * variant="classes" -> soft watercolour washes + brush strokes + splatter (white section)
//  * variant="detail"  -> canvas/paper grain + line-art palette, brush, easel (blossom section)
//  */
// export default function ArtBackdrop({ variant = "classes" }) {
//     return (
//         <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
//         >
//             {variant === "classes" ? <ClassesArt /> : <DetailArt />}
//         </div>
//     );
// }

// /* ───────────────────────── Classes section ───────────────────────── */

// function ClassesArt() {
//     return (
//         <>
//             {/* Watercolour washes */}
//             <svg
//                 className="absolute inset-0 h-full w-full"
//                 viewBox="0 0 1440 1400"
//                 preserveAspectRatio="xMidYMid slice"
//                 fill="none"
//             >
//                 <defs>
//                     <filter id="km-wash" x="-20%" y="-20%" width="140%" height="140%">
//                         <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" result="n" />
//                         <feDisplacementMap in="SourceGraphic" in2="n" scale="70" />
//                         <feGaussianBlur stdDeviation="22" />
//                     </filter>
//                     <filter id="km-edge" x="-10%" y="-10%" width="120%" height="120%">
//                         <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="n" />
//                         <feDisplacementMap in="SourceGraphic" in2="n" scale="14" />
//                     </filter>
//                 </defs>

//                 <g filter="url(#km-wash)">
//                     <ellipse cx="1280" cy="170" rx="300" ry="210" fill="#f6b3cf" fillOpacity="0.38" />
//                     <ellipse cx="130" cy="760" rx="260" ry="260" fill="#fbd9a8" fillOpacity="0.34" />
//                     <ellipse cx="1220" cy="1180" rx="320" ry="220" fill="#b9d8f0" fillOpacity="0.30" />
//                     <ellipse cx="420" cy="1300" rx="240" ry="150" fill="#d9c6f1" fillOpacity="0.28" />
//                 </g>

//                 {/* Dry-brush strokes */}
//                 <g filter="url(#km-edge)" strokeLinecap="round">
//                     <path d="M-40 330 C 160 270, 300 390, 480 330" stroke="#e8639c" strokeOpacity="0.20" strokeWidth="26" />
//                     <path d="M-20 362 C 170 312, 310 420, 470 366" stroke="#e8639c" strokeOpacity="0.10" strokeWidth="12" />
//                     <path d="M980 1000 C 1130 940, 1260 1060, 1470 990" stroke="#2f7fc1" strokeOpacity="0.16" strokeWidth="24" />
//                     <path d="M1010 1034 C 1150 984, 1270 1086, 1460 1030" stroke="#2f7fc1" strokeOpacity="0.09" strokeWidth="10" />
//                     <path d="M-30 1120 C 140 1070, 260 1170, 400 1120" stroke="#f2a93b" strokeOpacity="0.20" strokeWidth="22" />
//                 </g>

//                 {/* Paint splatter */}
//                 <g>
//                     <circle cx="1090" cy="120" r="9" fill="#e8639c" fillOpacity="0.30" />
//                     <circle cx="1128" cy="152" r="4" fill="#e8639c" fillOpacity="0.28" />
//                     <circle cx="1062" cy="166" r="5" fill="#e8639c" fillOpacity="0.22" />
//                     <circle cx="1156" cy="108" r="3" fill="#e8639c" fillOpacity="0.25" />
//                     <circle cx="96" cy="560" r="8" fill="#f2a93b" fillOpacity="0.32" />
//                     <circle cx="132" cy="590" r="4" fill="#f2a93b" fillOpacity="0.30" />
//                     <circle cx="70" cy="606" r="5" fill="#f2a93b" fillOpacity="0.24" />
//                     <circle cx="1330" cy="800" r="7" fill="#2f7fc1" fillOpacity="0.24" />
//                     <circle cx="1362" cy="826" r="3.5" fill="#2f7fc1" fillOpacity="0.26" />
//                     <circle cx="1304" cy="838" r="4.5" fill="#2f7fc1" fillOpacity="0.20" />
//                 </g>
//             </svg>

//             {/* Line-art brush, top-left (desktop only so mobile stays clean) */}
//             <svg
//                 className="absolute left-[3%] top-[7%] hidden h-40 w-40 rotate-[-18deg] text-rose opacity-[0.18] lg:block"
//                 viewBox="0 0 120 120"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//             >
//                 <path d="M20 100 C 28 84, 40 80, 48 86 C 54 92, 50 104, 36 104 C 30 104, 24 104, 20 100 Z" />
//                 <path d="M46 84 L 98 22 C 102 18, 108 20, 106 26 L 62 90" />
//                 <path d="M52 78 L 66 90" />
//             </svg>

//             {/* Line-art palette, bottom-right */}
//             <svg
//                 className="absolute bottom-[5%] right-[4%] hidden h-48 w-48 rotate-[10deg] text-pink opacity-[0.20] lg:block"
//                 viewBox="0 0 120 120"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//             >
//                 <path d="M60 14 C 28 14, 8 36, 10 62 C 12 86, 34 104, 58 102 C 70 101, 70 90, 64 84 C 58 78, 62 70, 72 70 L 90 70 C 104 70, 112 60, 110 48 C 106 28, 86 14, 60 14 Z" />
//                 <circle cx="36" cy="46" r="6" />
//                 <circle cx="58" cy="34" r="6" />
//                 <circle cx="82" cy="40" r="6" />
//                 <circle cx="30" cy="70" r="6" />
//             </svg>

//             {/* Fade top & bottom so the section joins its neighbours cleanly */}
//             <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
//             <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
//         </>
//     );
// }

// /* ───────────────────────── Art-detail section ───────────────────────── */

// function DetailArt() {
//     return (
//         <>
//             {/* Canvas / paper grain */}
//             <svg className="absolute inset-0 h-full w-full opacity-[0.35] mix-blend-multiply">
//                 <filter id="km-grain">
//                     <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" stitchTiles="stitch" />
//                     <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.30  0 0 0 0 0.38  0 0 0 0.55 0" />
//                 </filter>
//                 <rect width="100%" height="100%" filter="url(#km-grain)" />
//             </svg>

//             {/* Big soft colour wash behind the text column */}
//             <svg
//                 className="absolute -left-32 top-10 h-[34rem] w-[34rem] opacity-70"
//                 viewBox="0 0 400 400"
//                 fill="none"
//             >
//                 <defs>
//                     <filter id="km-wash2" x="-30%" y="-30%" width="160%" height="160%">
//                         <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5" result="n" />
//                         <feDisplacementMap in="SourceGraphic" in2="n" scale="50" />
//                         <feGaussianBlur stdDeviation="16" />
//                     </filter>
//                 </defs>
//                 <g filter="url(#km-wash2)">
//                     <circle cx="190" cy="200" r="130" fill="#f4a8c6" fillOpacity="0.40" />
//                     <circle cx="260" cy="150" r="80" fill="#fbd3a0" fillOpacity="0.35" />
//                 </g>
//             </svg>

//             {/* Easel line-art, right edge */}
//             <svg
//                 className="absolute -right-6 bottom-10 hidden h-80 w-64 text-rose opacity-[0.16] lg:block"
//                 viewBox="0 0 160 220"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//             >
//                 <rect x="38" y="28" width="84" height="104" rx="2" />
//                 <path d="M30 20 H 130" />
//                 <path d="M62 132 L 36 206" />
//                 <path d="M98 132 L 124 206" />
//                 <path d="M80 132 V 190" />
//                 <path d="M50 150 H 110" />
//                 <path d="M52 100 C 66 70, 82 92, 96 58 C 104 44, 112 60, 110 72" />
//             </svg>

//             {/* Hand-drawn squiggle + dots, top-right */}
//             <svg
//                 className="absolute right-[6%] top-8 hidden h-16 w-48 text-pink opacity-30 md:block"
//                 viewBox="0 0 200 60"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.2"
//                 strokeLinecap="round"
//             >
//                 <path d="M6 36 C 22 6, 38 6, 54 34 S 86 62, 102 30 S 134 2, 150 30 S 178 54, 194 24" />
//             </svg>
//         </>
//     );
// }

/**
 * ArtBackdrop — painterly, art-related background layer.
 *
 * Pure inline SVG (no image files, no extra deps). Sits behind content with
 * pointer-events disabled, so it never blocks clicks or hurts text contrast.
 *
 *   <section className="relative overflow-hidden"> 
 *       <ArtBackdrop variant="classes" />
 *       <div className="shell relative z-10"> ... </div>
 *   </section>
 *
 * variant="classes" -> soft watercolour washes + brush strokes + splatter (white section)
 * variant="detail"  -> canvas/paper grain + line-art palette, brush, easel (blossom section)
 */
export default function ArtBackdrop({ variant = "classes" }) {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
            {variant === "classes" ? <ClassesArt /> : <DetailArt />}
        </div>
    );
}

/* ───────────────────────── Classes section ───────────────────────── */

function ClassesArt() {
    return (
        <>
            {/* Watercolour washes */}
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1440 1400"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
            >
                <defs>
                    <filter id="km-wash" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" result="n" />
                        <feDisplacementMap in="SourceGraphic" in2="n" scale="70" />
                        <feGaussianBlur stdDeviation="22" />
                    </filter>
                    <filter id="km-edge" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="n" />
                        <feDisplacementMap in="SourceGraphic" in2="n" scale="14" />
                    </filter>
                </defs>

                <g filter="url(#km-wash)">
                    <ellipse cx="1280" cy="170" rx="300" ry="210" fill="#f15b9a" fillOpacity="0.48" />
                    <ellipse cx="130" cy="760" rx="260" ry="260" fill="#ffbd59" fillOpacity="0.42" />
                    <ellipse cx="1220" cy="1180" rx="320" ry="220" fill="#48b8d0" fillOpacity="0.40" />
                    <ellipse cx="420" cy="1300" rx="240" ry="150" fill="#a681e8" fillOpacity="0.38" />
                    <ellipse cx="720" cy="650" rx="240" ry="170" fill="#f76f58" fillOpacity="0.22" />
                    <ellipse cx="880" cy="300" rx="190" ry="150" fill="#7fc96b" fillOpacity="0.24" />
                </g>

                {/* Dry-brush strokes */}
                <g filter="url(#km-edge)" strokeLinecap="round">
                    <path d="M-40 330 C 160 270, 300 390, 480 330" stroke="#e84387" strokeOpacity="0.30" strokeWidth="26" />
                    <path d="M-20 362 C 170 312, 310 420, 470 366" stroke="#e84387" strokeOpacity="0.18" strokeWidth="12" />
                    <path d="M980 1000 C 1130 940, 1260 1060, 1470 990" stroke="#258ebc" strokeOpacity="0.28" strokeWidth="24" />
                    <path d="M1010 1034 C 1150 984, 1270 1086, 1460 1030" stroke="#258ebc" strokeOpacity="0.16" strokeWidth="10" />
                    <path d="M-30 1120 C 140 1070, 260 1170, 400 1120" stroke="#f09b21" strokeOpacity="0.30" strokeWidth="22" />
                    <path d="M760 190 C 900 130, 1030 230, 1160 170" stroke="#55a947" strokeOpacity="0.25" strokeWidth="18" />
                </g>

                {/* Paint splatter */}
                <g>
                    <circle cx="1090" cy="120" r="9" fill="#e84387" fillOpacity="0.48" />
                    <circle cx="1128" cy="152" r="4" fill="#e84387" fillOpacity="0.40" />
                    <circle cx="1062" cy="166" r="5" fill="#e84387" fillOpacity="0.34" />
                    <circle cx="1156" cy="108" r="3" fill="#e84387" fillOpacity="0.38" />
                    <circle cx="96" cy="560" r="8" fill="#f09b21" fillOpacity="0.48" />
                    <circle cx="132" cy="590" r="4" fill="#f09b21" fillOpacity="0.42" />
                    <circle cx="70" cy="606" r="5" fill="#f09b21" fillOpacity="0.34" />
                    <circle cx="1330" cy="800" r="7" fill="#258ebc" fillOpacity="0.40" />
                    <circle cx="1362" cy="826" r="3.5" fill="#258ebc" fillOpacity="0.42" />
                    <circle cx="1304" cy="838" r="4.5" fill="#258ebc" fillOpacity="0.34" />
                    <circle cx="710" cy="520" r="6" fill="#55a947" fillOpacity="0.38" />
                    <circle cx="740" cy="550" r="3" fill="#a681e8" fillOpacity="0.46" />
                    <circle cx="680" cy="560" r="4" fill="#f15b9a" fillOpacity="0.40" />
                </g>
            </svg>

            {/* Hand-drawn brush */}
            <svg
                className="absolute left-[2%] top-[34%] h-24 w-24 rotate-[-18deg] text-rose opacity-35 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
                viewBox="0 0 120 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20 100 C 28 84, 40 80, 48 86 C 54 92, 50 104, 36 104 C 30 104, 24 104, 20 100 Z" />
                <path d="M46 84 L 98 22 C 102 18, 108 20, 106 26 L 62 90" />
                <path d="M52 78 L 66 90" />
                <path d="M29 90 C 35 88, 41 92, 42 98" stroke="#f09b21" />
                <path d="M57 74 L 91 34" stroke="#258ebc" />
            </svg>

            {/* Hand-drawn pencils */}
            <svg
                className="absolute right-[3%] top-[25%] h-28 w-28 rotate-[12deg] opacity-45 sm:h-36 sm:w-36 lg:right-[5%] lg:h-44 lg:w-44"
                viewBox="0 0 140 140"
                fill="none"
                stroke="#735565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M35 108 L87 28 L101 37 L49 117 Z" fill="#ffbd59" />
                <path d="M87 28 L96 14 L101 37 Z" fill="#f2d5ad" />
                <path d="M96 14 L101 37 L105 30 Z" fill="#4a3b43" />
                <path d="M35 108 L49 117 L29 124 Z" fill="#f2d5ad" />
                <path d="M76 45 L90 54" stroke="#fff3d2" />
                <path d="M54 79 L68 88" stroke="#fff3d2" />
                <path d="M65 119 L105 57 L116 64 L76 126 Z" fill="#f15b9a" />
                <path d="M105 57 L114 44 L116 64 Z" fill="#f2d5ad" />
                <path d="M114 44 L116 64 L121 56 Z" fill="#4a3b43" />
                <path d="M68 115 L77 121" stroke="#fff3d2" />
            </svg>

            {/* Paint cup and brushes */}
            <svg
                className="absolute bottom-[22%] left-[3%] h-24 w-24 -rotate-[8deg] opacity-40 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
                viewBox="0 0 140 140"
                fill="none"
                stroke="#735565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M36 78 L48 119 Q70 129 94 119 L105 78 Z" fill="#b9e5e8" />
                <path d="M39 89 Q70 99 102 89" stroke="#258ebc" />
                <path d="M51 20 L60 24 L40 76 L31 73 Z" fill="#ffbd59" />
                <path d="M51 20 L54 12 L63 15 L60 24 Z" fill="#f15b9a" />
                <path d="M78 29 L86 32 L105 77 L97 80 Z" fill="#a681e8" />
                <path d="M78 29 L77 19 L87 22 L86 32 Z" fill="#f09b21" />
                <path d="M33 72 L40 76" stroke="#735565" />
                <path d="M98 75 L105 77" stroke="#735565" />
                <path d="M45 104 Q69 111 96 103" stroke="#fffafc" />
            </svg>

            {/* Colorful hand-drawn palette */}
            <svg
                className="absolute bottom-[5%] right-[2%] h-28 w-28 rotate-[10deg] text-pink opacity-40 sm:h-36 sm:w-36 lg:h-48 lg:w-48"
                viewBox="0 0 120 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M60 14 C 28 14, 8 36, 10 62 C 12 86, 34 104, 58 102 C 70 101, 70 90, 64 84 C 58 78, 62 70, 72 70 L 90 70 C 104 70, 112 60, 110 48 C 106 28, 86 14, 60 14 Z" />
                <circle cx="36" cy="46" r="6" fill="#f15b9a" stroke="none" />
                <circle cx="58" cy="34" r="6" fill="#ffbd59" stroke="none" />
                <circle cx="82" cy="40" r="6" fill="#48b8d0" stroke="none" />
                <circle cx="30" cy="70" r="6" fill="#a681e8" stroke="none" />
            </svg>

            {/* Fade top & bottom so the section joins its neighbours cleanly */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </>
    );
}

/* ───────────────────────── Art-detail section ───────────────────────── */

function DetailArt() {
    return (
        <>
            {/* Canvas / paper grain */}
            <svg className="absolute inset-0 h-full w-full opacity-[0.35] mix-blend-multiply">
                <filter id="km-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" stitchTiles="stitch" />
                    <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.30  0 0 0 0 0.38  0 0 0 0.55 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#km-grain)" />
            </svg>

            {/* Big soft colour wash behind the text column */}
            <svg
                className="absolute -left-32 top-10 h-[34rem] w-[34rem] opacity-70"
                viewBox="0 0 400 400"
                fill="none"
            >
                <defs>
                    <filter id="km-wash2" x="-30%" y="-30%" width="160%" height="160%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5" result="n" />
                        <feDisplacementMap in="SourceGraphic" in2="n" scale="50" />
                        <feGaussianBlur stdDeviation="16" />
                    </filter>
                </defs>
                <g filter="url(#km-wash2)">
                    <circle cx="190" cy="200" r="130" fill="#f4a8c6" fillOpacity="0.40" />
                    <circle cx="260" cy="150" r="80" fill="#fbd3a0" fillOpacity="0.35" />
                </g>
            </svg>

            {/* Easel line-art, right edge */}
            <svg
                className="absolute -right-6 bottom-10 hidden h-80 w-64 text-rose opacity-[0.16] lg:block"
                viewBox="0 0 160 220"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="38" y="28" width="84" height="104" rx="2" />
                <path d="M30 20 H 130" />
                <path d="M62 132 L 36 206" />
                <path d="M98 132 L 124 206" />
                <path d="M80 132 V 190" />
                <path d="M50 150 H 110" />
                <path d="M52 100 C 66 70, 82 92, 96 58 C 104 44, 112 60, 110 72" />
            </svg>

            {/* Hand-drawn squiggle + dots, top-right */}
            <svg
                className="absolute right-[6%] top-8 hidden h-16 w-48 text-pink opacity-30 md:block"
                viewBox="0 0 200 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
            >
                <path d="M6 36 C 22 6, 38 6, 54 34 S 86 62, 102 30 S 134 2, 150 30 S 178 54, 194 24" />
            </svg>
        </>
    );
}