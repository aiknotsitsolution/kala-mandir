import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "@/layouts/SiteLayout";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Art = lazy(() => import("@/pages/Art"));
const Contact = lazy(() => import("@/pages/Contact"));
const Dance = lazy(() => import("@/pages/Dance"));
const Events = lazy(() => import("@/pages/Events"));
const EventDetail = lazy(() => import("@/pages/EventDetail"));
const Gallery = lazy(() => import("@/pages/Gallery"));

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/art" element={<Art />} />
                    <Route path="/dance" element={<Dance />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
