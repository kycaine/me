import { useState } from 'react';
import { ExternalLink, Code, Zap } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  details: string;
  technologies: string[];
  status: 'completed' | 'ongoing';
  github_url: string
}

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Machine Learning & Deep Learning API",
      description: "End-to-end API for data processing, model training, and prediction.",
      details: "Comprehensive API solution built with Python, FastAPI, and TensorFlow. Features include automated data preprocessing, model training pipelines, and comprehensive monitoring. Supports multiple ML algorithms including neural networks, ensemble methods, and deep learning models.",
      technologies: ["Python", "FastAPI", "TensorFlow"],
      status: 'completed',
      github_url: "https://github.com/kycaine/machine-learning-deep-learning-api"

    },
    {
      title: "Proof of Work Blockchain",
      description: "Simple blockchain with transaction handling, mining, and blockchain retrieval.",
      details: "A basic Proof of Work blockchain implementation supporting transaction creation, mining, and full blockchain retrieval. Includes a mempool for pending transactions, 5-minute mining time, 100-coin block rewards (halving every 1000 blocks), and API endpoints for transaction submission, mining, blockchain viewing, and balance checking.",
      technologies: ["Go", "Gin", "REST API"],
      status: "completed",
      github_url: "https://github.com/kycaine/kycaine-proof-of-work"
    },
    {
      title: "Covid-19 Case Prediction with Machine Learning",
      description: "End-to-end ML workflow for predicting Covid-19 case trends.",
      details: "A fully offline ML pipeline implemented in Jupyter Notebook to predict Covid-19 case trends based on historical data. Covers the complete workflow: data cleaning (removing noise, handling missing values), exploratory data analysis (visualizations & statistics), feature engineering (transforming and creating features), modeling (training ML models), model evaluation (metrics like MAE, RMSE, R², accuracy), and model optimization (hyperparameter tuning). Outputs are organized by stage in dedicated directories for clarity and reproducibility.",
      technologies: ["Python", "Jupyter Notebook", "Pandas", "Matplotlib", "Scikit-learn"],
      status: "completed",
      github_url: "https://github.com/kycaine/covid19-statistics"
    },
   {
      title: "Custom Blockchain for Money Transfers with Monthly Node Rewards",
      description: "Blockchain network built from scratch in Go, enabling secure money transfers with a 0.5% transaction fee and automated monthly rewards for active nodes.",
      details: "A fully custom blockchain implemented in Go with peer-to-peer networking and a built-in transaction fee system. Each transfer deducts a 0.5% fee from the sender, which is stored in a temporary on-chain bank account. At the end of each month, accumulated fees are distributed evenly among nodes that have been online and active for the full month. Features include a UTXO-based ledger, digital signatures, transaction validation, block mining, and automated reward distribution. Uses libp2p for node communication and LevelDB for blockchain storage, ensuring performance, scalability, and security.",
      technologies: ["Go", "libp2p", "LevelDB", "gRPC", "Cobra CLI"],
      status: "ongoing",
      github_url: ""
    }
  ];

  const completedProjects = projects.filter(p => p.status === 'completed');
  const ongoingProjects = projects.filter(p => p.status === 'ongoing');

  const closeModal = () => setSelectedProject(null);

  return (
    <>
      <section id="projects" className="py-20 bg-card">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gold-gradient">Projects</span>
          </h2>
          
          {/* Completed Projects */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
              <Code className="text-primary mr-3" size={32} />
              <span className="text-primary">Completed Projects</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-border cursor-pointer smooth-transition hover:border-primary/50 hover:bg-secondary/50 hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary smooth-transition">
                      {project.title}
                    </h4>
                    <ExternalLink className="text-muted-foreground group-hover:text-primary smooth-transition" size={20} />
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ongoing Projects */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
              <Zap className="text-primary mr-3" size={32} />
              <span className="text-primary">Ongoing Projects</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {ongoingProjects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-border cursor-pointer smooth-transition hover:border-primary/50 hover:bg-secondary/50 hover:scale-105 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-sm font-semibold">
                    ONGOING
                  </div>
                  <div className="flex items-start justify-between mb-4 pr-16">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary smooth-transition">
                      {project.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-primary">{selectedProject.title}</h3>
              <button 
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground smooth-transition text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                selectedProject.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {selectedProject.status.toUpperCase()}
              </span>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-6">{selectedProject.details}</p>
            
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-secondary/50 text-foreground px-3 py-1 rounded-full text-sm border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

               {/* Visit Project Button */}
  {selectedProject.github_url && (
    <div>
      <a
        href={selectedProject.github_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/80 smooth-transition"
      >
        Visit Project
      </a>
    </div>
  )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;