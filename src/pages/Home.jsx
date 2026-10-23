import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ClassesSection from "@/components/ClassesSection";
import { useSmoothAnchors } from "@/hooks";

/**
 * Home — a concise overview that points visitors toward the focused pages.
 */
export default function Home() {
    useSmoothAnchors(true);

    return (
        <main id="main" className="home-page">
            <Hero />
            <IntroSection showStudioNote={false} showAcademyCards />
            <ClassesSection showArtDetail={false} />
        </main>
    );
}
