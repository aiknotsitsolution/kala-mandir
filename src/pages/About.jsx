import IntroSection from "@/components/IntroSection";
import WhyLearnHere from "@/components/WhyLearnHere";

export default function About() {
    return (
        <main id="main" className="about-page">
            <IntroSection showStudioNote={false} />
            <WhyLearnHere />
        </main>
    );
}
