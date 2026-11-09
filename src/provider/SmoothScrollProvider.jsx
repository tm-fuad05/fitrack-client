import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const LenisContext = createContext(null);

const DISABLED_PATHS = ["/login", "/register", "/dashboard"];

const isLenisDisabled = (pathname) =>
  DISABLED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

export const useLenis = () => useContext(LenisContext);

const SmoothScrollProvider = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const disabled = isLenisDisabled(location.pathname);

  useEffect(() => {
    if (disabled) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const onScroll = ({ scroll }) => {
      setScrollY(scroll);
    };

    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [disabled]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef, scrollY, disabled }}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScrollProvider;
