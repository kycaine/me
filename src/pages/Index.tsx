
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogsSection from "@/components/BlogsSection";
import SnakeGameSection from "@/components/SnakeGameSection";
import ContactSection from "@/components/ContactSection";
import { useEffect, useRef } from "react";

// @ts-ignore
declare global {
  interface Window {
    VANTA: any;
  }
}

const Index = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaNetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffectBirds: any;
    let vantaEffectNet: any;

    const initVanta = () => {
      // Initialize Globe (Background Layer)
      if (window.VANTA && window.VANTA.GLOBE && vantaRef.current && !vantaEffectBirds) {
        vantaEffectBirds = window.VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3e3e3e,
          color2: 0xca005f,
          size: 0.50,
          backgroundColor: 0xfff5e1 // match soft-linen background
        });
      }

      // Initialize Net (Foreground Layer)
      if (window.VANTA && window.VANTA.NET && vantaNetRef.current && !vantaEffectNet) {
        vantaEffectNet = window.VANTA.NET({
          el: vantaNetRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          points: 20.00,
          maxDistance: 10.00,
          spacing: 20.00,
          color: 0xc32121,
          backgroundColor: 0x000000,
          // showDots: false,
          backgroundAlpha: 0.0 // transparent so Birds can be seen
        });
      }

      if (!vantaEffectBirds || !vantaEffectNet) {
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffectBirds) vantaEffectBirds.destroy();
      if (vantaEffectNet) vantaEffectNet.destroy();
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Disable custom horizontal scroll behavior on mobile screens
      if (window.innerWidth < 768) {
        return;
      }

      // Allow native horizontal scrolling (e.g. from trackpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      // Check if we are scrolling over a vertically scrollable element
      const path = e.composedPath();
      let isVerticalScrollable = false;
      for (let i = 0; i < path.length; i++) {
        const el = path[i] as HTMLElement;
        if (el === container) break;
        if (el && el.scrollHeight > el.clientHeight) {
          const overflowY = window.getComputedStyle(el).overflowY;
          if (overflowY === 'auto' || overflowY === 'scroll') {
            if (e.deltaY < 0 && el.scrollTop > 0) {
              isVerticalScrollable = true;
              break;
            }
            if (e.deltaY > 0 && Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight) {
              isVerticalScrollable = true;
              break;
            }
          }
        }
      }

      if (!isVerticalScrollable && e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const bgContainer = vantaRef.current;
    const netContainer = vantaNetRef.current;
    if (!container || !bgContainer || !netContainer) return;

    const handleScroll = () => {
      // Calculate how far we've scrolled horizontally (0 to 1)
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const scrollRatio = maxScrollLeft > 0 ? container.scrollLeft / maxScrollLeft : 0;

      // Move both backgrounds slightly to create a parallax effect
      bgContainer.style.transform = `translateX(-${scrollRatio * 20}%)`;
      netContainer.style.transform = `translateX(-${scrollRatio * 20}%)`;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      {/* Background container made slightly wider to allow for parallax movement */}
      <div ref={vantaRef} className="fixed top-0 left-0 h-screen w-[125vw] -z-20 pointer-events-none" />
      <div ref={vantaNetRef} className="fixed top-0 left-0 h-screen w-[125vw] -z-10 pointer-events-none" />

      <div
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row overflow-x-hidden overflow-y-auto md:overflow-x-auto md:overflow-y-hidden h-screen scroll-smooth hide-scrollbar"
      >
        <div className="w-full min-h-screen md:w-[100vw] md:h-screen md:overflow-y-auto flex-shrink-0 hide-scrollbar">
          <HeroSection />
        </div>
        <div className="w-full min-h-screen md:w-[100vw] md:h-screen md:overflow-y-auto flex-shrink-0 hide-scrollbar">
          <ProjectsSection />
        </div>
        <div className="w-full min-h-screen md:w-[100vw] md:h-screen md:overflow-y-auto flex-shrink-0 hide-scrollbar">
          <BlogsSection />
        </div>
        <div className="w-full min-h-screen md:w-[100vw] md:h-screen md:overflow-y-auto flex-shrink-0 hide-scrollbar">
          <SnakeGameSection />
        </div>
        <div className="w-full min-h-screen md:w-[100vw] md:h-screen md:overflow-y-auto flex-shrink-0 hide-scrollbar flex flex-col">
          <div className="flex-grow flex flex-col justify-center">
            <ContactSection />
          </div>
          {/* Footer */}
          <footer className="bg-transparent border-t border-transparent py-8 w-full mt-auto">
            <div className="container mx-auto px-6 text-center">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Rezki Ade, Indonesia. Crafted with passion — All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
