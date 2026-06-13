
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
      className="min-h-screen flex items-end justify-start relative pb-16 md:pb-24 pt-32"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="relative z-10 container mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column (3/12) */}
          <div className="md:col-span-4 text-right animate-slide-up">
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {/* <span className="text-foreground">&lt;</span> */}
              <span className="gold-gradient">Rezki </span>
              <span className="gold-gradient">Ade </span>
              {/* <span className="text-foreground">/&gt;</span> */}
            </h1>
            <h3 className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-bold leading-tight">
              Fullstack Engineer <br /> AI Systems Engineer <br /> Backend Specialist
            </h3>
          </div>

          {/* Right Column (9/12) */}
          <div className="md:col-span-8 text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="border-l-4 border-primary pl-6 py-2">
              <p className="text-sm md:text-xl lg:text-2xl text-foreground font-medium leading-loose">
                3+ years of experience converting caffeine into scalable code. My track record spans from the brutal battlegrounds of e-commerce to the "highly bureaucratic" world of government systems. My expertise? Defusing explosive errors and educating AI on basic human manners, morals, and ethics so it doesn't end up with a mental breakdown like its creator, HAHAHA. The systems I build are guaranteed to be as rock-solid as my faith in Allah. TAKBEERR!!
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;