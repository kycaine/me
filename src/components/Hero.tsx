
import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
   <section id="hero" className="hero-section">
  <div className="hero-parallax"></div>
  <div className="hero-content flex flex-col md:flex-row items-center md:items-start gap-6">
    
    {/* Kiri: Nama */}
    <div className="flex-1 text-left">
      <h1 className="hero-title leading-tight">
        Rezki Ade<br />Pratama<br />Putra
      </h1>
    </div>

   {/* Kanan: Subtitle + Deskripsi */}
<div className="flex-1 text-left md:text-right mt-6 md:mt-12">
  <h1 className="hero-subtitle">Software Engineer</h1>
  <p className="hero-description">
    Software Engineer specializing in backend, fullstack, AI, and data science, 
    focused on building scalable and impactful solutions.
  </p>

  <button
    onClick={onExploreClick}
    className="btn-hero mt-4"
  >
    Explore My Work
  </button>
</div>

  </div>
</section>

  );
};

export default Hero;
