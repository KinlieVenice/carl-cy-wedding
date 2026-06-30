import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, animation = "fade-up", delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${triggered ? `reveal-${animation}` : "reveal-hidden"} ${className}`}
      style={{ ...(triggered && delay ? { animationDelay: `${delay}ms` } : {}), ...style }}
    >
      {children}
    </div>
  );
}
