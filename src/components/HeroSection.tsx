import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative parallax-bg"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative mt-32 z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl mt-12 sm:text-6xl md:text-8xl font-bold mb-10 animate-slide-up">
          <span className="text-foreground">&lt;</span>
          <span className="gold-gradient">Rezki </span>
          <span className="gold-gradient">Ade </span>
          <span className="text-foreground">/&gt;</span>
        </h1>

        <h3 className="text-xl md:text-3xl mb-4 mt-12 text-muted-foreground animate-slide-up font-bold">
          Engineer
        </h3>

        <p className="text-sm md:text-xl mb-10 text-muted-foreground max-w-3xl mx-auto animate-slide-up">
          Backend & AI Engineer with 3+ years of experience. I specialize in building scalable backend services and experienced in e-commerce and government-grade systems.
        </p>

        {/* Button + Scroll icon in one flex container */}
        <div className="flex flex-col items-center gap-6 -mb-12 mt-12">
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              onClick={() => scrollToSection("summary")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold animate-glow smooth-transition transform hover:scale-105 w-40"
            >
              Explore More
            </Button>
            <Button
              onClick={() => navigate("/tools")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold animate-glow smooth-transition transform hover:scale-105 w-40"
            >
              Tools...
            </Button>
          </div>
          <div className="mt-12 w-6 h-10 border-2 border-primary rounded-full flex justify-center items-start animate-float">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;