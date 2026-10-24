import AboutOverview from "@/components/AboutOverview";
import AboutStudioSection from "@/components/AboutStudioSection";
import WhyLearnHere from "@/components/WhyLearnHere";

export default function About() {
    return (
        <main id="main" className="about-page">
            <AboutOverview />
            <AboutStudioSection />
            <WhyLearnHere />
        </main>
    );
}
