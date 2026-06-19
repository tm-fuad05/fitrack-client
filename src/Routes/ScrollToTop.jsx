import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../Provider/SmoothScrollProvider";

const ScrollToTOp = () => {
  const { pathname } = useLocation();
  const { lenis, disabled } = useLenis();

  useEffect(() => {
    if (!disabled && lenis?.current) {
      lenis.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis, disabled]);
};

export default ScrollToTOp;
