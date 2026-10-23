import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Art from "@/pages/Art";
import Contact from "@/pages/Contact";
import Dance from "@/pages/Dance";
import Gallery from "@/pages/Gallery";

function RouteScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: "auto" });
            return;
        }

        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
            target.scrollIntoView({ block: "start" });
        }
    }, [pathname, hash]);

    return null;
}

function SiteRoutes() {
    return (
        <>
            <RouteScrollManager />
            <ScrollProgress />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/art" element={<Art />} />
                <Route path="/dance" element={<Dance />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
            <WhatsAppButton />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <SiteRoutes />
        </BrowserRouter>
    );
}
