
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
            <h3 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-bold leading-tight">
              Fullstack Engineer <br /> AI Systems Engineer <br /> Backend Specialist
            </h3>
          </div>

          {/* Right Column (9/12) */}
          <div className="md:col-span-8 text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="border-l-4 border-[#454040] pl-6 py-2">
              <p className="text-base md:text-2xl lg:text-3xl text-foreground font-medium leading-loose">
                4+ years of experience converting complex business logic into scalable, production-ready code. My track record spans engineering high-throughput e-commerce engines to architecting compliant data systems for government institutions.
                <br />
                I specialize in architecting high-availability backends and deploying production-ready AI systems that scale without breaking.
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;