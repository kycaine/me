
import React, { useEffect } from 'react';
import { Project } from './Projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content relative">
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close modal"
        >
          ✕
        </button>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-portfolio-gold mb-4">
              {project.title}
            </h2>
            <p className="text-portfolio-cream/90 text-lg leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-portfolio-gold mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-portfolio-gold/20 text-portfolio-gold rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-portfolio-gold mb-3">
              Key Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-portfolio-cream/90"
                >
                  <span className="text-portfolio-gold mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
