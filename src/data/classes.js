/**
 * Class / programme catalogue.
 *
 * Only the disciplines supplied by the institute are listed here. No fees,
 * schedules, durations, teacher names or qualification claims are published —
 * add them only after the institute confirms them.
 *
 * `anchor` decides where each card links. `interest` pre-selects a matching
 * option in the enquiry form when a visitor arrives from a card. `accent`
 * chooses the card's colour accent from the Kala Mandir palette.
 */
export const classes = [
    {
        id: "art-drawing",
        index: "01",
        title: "Art & Drawing",
        kicker: "Foundations of seeing",
        interest: "Art",
        accent: "pink",
        anchor: "/art#art",
        summary:
            "Slow down and look closely. Explore sketching and portrait drawing by noticing the lines, proportions and tonal details that make a subject feel present on paper. Build a drawing one observation at a time, then bring those details together in your own work.",
        learningSteps: [
            {
                title: "Line & shape",
                text: "Start with the outlines and simple forms you can see. Small, considered marks help a sketch take shape without rushing into detail.",
            },
            {
                title: "Proportion",
                text: "Compare the size and position of the parts of a subject. These relationships help a portrait or drawing feel balanced.",
            },
            {
                title: "Light & shade",
                text: "Observe where light falls and where shadows gather. Use lighter and darker tones to describe form and add depth to the finished drawing.",
            },
        ],
        points: ["Sketching", "Portrait drawing", "Drawing fundamentals"],
        image: {
            src: "/assets/institute/km-artwork-04.webp",
            fallback: "/assets/institute/km-artwork-04.jpg",
            alt: "Kala Mandir student drawing of birds on a branch, in graphite",
            width: 1012,
            height: 1800,
            status: "institute",
        },
        tone: "light",
        layout: "wide",
    },
    {
        id: "painting-craft",
        index: "02",
        title: "Painting & Art Craft",
        kicker: "Colour, surface, material",
        interest: "Painting",
        accent: "rose",
        anchor: "/art#art",
        summary:
            "Explore colour on canvas through oil and acrylic painting, then try creative art and craft with different materials. Each offers a different way to work with colour, texture and surface, and to develop a piece at your own pace.",
        learningSteps: [
            {
                title: "Oil painting",
                text: "Build a painting through colour and visible brushwork. Take time to observe how each area contributes to the whole image.",
            },
            {
                title: "Acrylic painting",
                text: "Explore another painting medium and make choices about colour, shapes and the way the image comes together on canvas.",
            },
            {
                title: "Art & craft",
                text: "Move beyond the canvas and work with materials, texture and surface to make creative pieces you can see and handle.",
            },
        ],
        points: ["Oil painting", "Acrylic painting", "Creative art and craft"],
        image: {
            src: "/assets/institute/artcraft.jpg",
            fallback: "/assets/institute/km-artwork-05.jpg",
            alt: "Framed painting of a woman seated beside a peacock in a garden",
            width: 768,
            height: 1024,
            status: "institute",
        },
        tone: "light",
        layout: "tall",
    },
    {
        id: "dance",
        index: "03",
        title: "Dance",
        kicker: "Movement for every age",
        interest: "Dance",
        accent: "violet",
        anchor: "/dance#dance",
        summary:
            "Dance classes arranged for different age groups, moving from regular practice towards confident performance.",
        points: ["Different age groups", "Practice & performance"],
        image: {
            src: "/assets/institute/dance.jpg",
            alt: "A Kathak dancer performing on stage at Kamani Auditorium in Delhi",
            width: 768,
            height: 1024,
            status: "institute",
        },
        tone: "dark",
        layout: "wide",
    },
    {
        id: "zumba",
        index: "04",
        title: "Zumba",
        kicker: "Rhythm as fitness",
        interest: "Zumba",
        accent: "flame",
        anchor: "/dance#dance",
        summary:
            "High-energy, music-led sessions that make movement feel like a dance floor rather than a workout.",
        points: ["Music-led sessions", "Open to beginners"],
        image: {
            src: "/assets/institute/Zumba.jpg",
            fallback: "/assets/institute/km-place-11.jpg",
            alt: "A group taking part in a Zumba fitness class",
            width: 1024,
            height: 768,
            status: "institute",
        },
        tone: "dark",
        layout: "tall",
    },
    {
        id: "choreography",
        index: "05",
        title: "Wedding & Event Choreography",
        kicker: "Made for the moment",
        interest: "Wedding / Event Choreography",
        accent: "gold",
        anchor: "/contact#enquiry",
        summary:
            "Special event and wedding choreography — routines shaped around your song, your people and your stage.",
        points: ["Wedding numbers", "Event performances", "Custom routines"],
        video: "/assets/video/Coupledance.mp4",
        tone: "dark",
        layout: "full",
    },
];

/**
 * Programme links for the footer. Art links target their own programme cards;
 * dance and choreography links open the dance page.
 */
export const classLinks = classes.map((c) => ({
    label: c.title,
    href: c.id === "art-drawing" || c.id === "painting-craft"
        ? `/art#programme-${c.id}`
        : "/dance#dance",
    interest: c.interest,
}));
