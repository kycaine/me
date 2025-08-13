import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SummarySection from "@/components/SummarySection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <SummarySection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
         © 2025 Rezki Ade Pratama Putra, Indonesia. Crafted with passion — All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
