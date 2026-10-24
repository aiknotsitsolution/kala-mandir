import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";

function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    target?.scrollIntoView({ block: "start" });
  }, [pathname, hash]);

  return null;
}

export default function SiteLayout() {
  return (
    <>
      <RouteScrollManager />
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
