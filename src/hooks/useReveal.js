import { useEffect, useRef } from 'react';

// Fades a section in the first time it scrolls into view.
// No-ops (content stays visible) if IntersectionObserver is unavailable.
const useReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;

    node.classList.add('reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return ref;
};

export default useReveal;
