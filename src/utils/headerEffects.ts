// Header scroll effects (opcional)
// Puedes agregar esto a App.tsx si quieres efectos de scroll

export function initializeHeaderEffects() {
  if (typeof window === 'undefined') return;

  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class when scrolling down
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Throttle scroll events
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
}

// Para usar en App.tsx:
// import { useEffect } from 'react';
// import { initializeHeaderEffects } from './utils/headerEffects';
// 
// useEffect(() => {
//   const cleanup = initializeHeaderEffects();
//   return cleanup;
// }, []);