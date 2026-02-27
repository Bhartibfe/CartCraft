import { useEffect } from "react";

// hook that toggles "visible" class on elements with .fade-in when scrolled into view
// usage: just add "fade-in" to any element and import/use this hook in a top-level component

export default function useScrollFade() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    const items = document.querySelectorAll(".fade-in");
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
