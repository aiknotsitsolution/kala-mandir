import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Art from "@/pages/Art";
import Contact from "@/pages/Contact";
import Dance from "@/pages/Dance";
import Gallery from "@/pages/Gallery";
import SiteLayout from "@/layouts/SiteLayout";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/art" element={<Art />} />
                    <Route path="/dance" element={<Dance />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
