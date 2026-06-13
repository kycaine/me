
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
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

  useEffect(() => {
    let vantaEffect: any;
    const initVanta = () => {
      if (window.VANTA && vantaRef.current) {
        vantaEffect = window.VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color1: 0xff0000,
          color2: 0xd1ff,
          backgroundColor: 0x72a2f // match soft-linen background
        });
      } else {
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      <div ref={vantaRef} className="fixed inset-0 -z-10" />
      <HeroSection />

      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-md border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Rezki Ade, Indonesia. Crafted with passion — All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
