
import React from 'react';

const WorkExperience: React.FC = () => {
  const experiences = [
    {
      title: "Backend Engineer",
      description: "Developed scalable backend systems, REST APIs, and microservices."
    },
    {
      title: "Fullstack Enginner (Focused on backend)",
      description: "Delivered interactive and integrated web solutions."
    },
    {
      title: "AI & Machine Learning Engineer",
      description: "Built predictive models and deep learning systems."
    },
  ];

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Work Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp, index) => (
          <div key={index} className="work-card">
            <h3 className="work-title">{exp.title}</h3>
            <p className="work-description">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
