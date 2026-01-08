import Navigation from "@/components/Navigation";
import ToolsSection from "@/components/ToolsSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="gap-2 font-bold text-yellow-400 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Tools Section */}
      <ToolsSection />

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

export default Tools;
