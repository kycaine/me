import { CheckCircle } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Backend Engineer",
      description: "Developed scalable backend systems, REST APIs, and microservices."
    },
    {
      title: "AI & Machine Learning Engineer",
      description: "Built predictive models, deep learning systems."
    },

    // {
    //   title: "Trader",
    //   description: "Applied technical analysis, harmonic patterns, and ICT strategies."
    // }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="gold-gradient">Work Experience</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border smooth-transition hover:border-primary/50 hover:bg-card/70 group"
            >
              <div className="flex items-start space-x-4">
                <CheckCircle className="text-primary mt-1 flex-shrink-0 group-hover:scale-110 smooth-transition" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{exp.title}</h3>
                  <p className="text-foreground/80">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;