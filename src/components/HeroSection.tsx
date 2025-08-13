import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
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
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-10 animate-slide-up">
          <span className="text-foreground">&lt;</span>
          <span className="gold-gradient">Rezki </span>
          <span className="gold-gradient">Ade </span>
          <span className="text-foreground">/&gt;</span>
        </h1>

        <h2 className="text-xl md:text-3xl mb-4 mt-12 text-muted-foreground animate-slide-up font-bold">
          Engineer
        </h2>

        <p className="text-sm md:text-xl mb-10 text-muted-foreground max-w-3xl mx-auto animate-slide-up">
          With over three years of professional experience in backend, fullstack, and general software engineering roles. Experienced in building scalable backend systems, integrating APIs, and collaborating with cross-functional teams across countries to deliver secure, efficient, and maintainable software solutions.
        </p>

        {/* Button + Scroll icon in one flex container */}
        <div className="flex flex-col items-center gap-6 -mb-12 mt-12">
          <Button
            onClick={() => scrollToSection("summary")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold animate-glow smooth-transition transform hover:scale-105"
          >
            Explore More
          </Button>
          <div className="mt-12 w-6 h-10 border-2 border-primary rounded-full flex justify-center items-start animate-float">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;