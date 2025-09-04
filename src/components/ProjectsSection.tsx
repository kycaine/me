import { useState } from 'react';
import { ExternalLink, Code, Zap } from 'lucide-react';
import RepoCard from './RepositoryCard';
import type { Repo } from './RepositoryCard';

interface Project {
  title: string;
  description: string;
  details: string;
  technologies: string[];
  status: 'completed' | 'ongoing';
  github_url: string;
}

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showRepos, setShowRepos] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const projects: Project[] = [
    {
      title: "Machine Learning & Deep Learning API",
      description: "End-to-end API for data processing, model training, and prediction.",
      details: "Comprehensive API solution built with Python, FastAPI, and TensorFlow...",
      technologies: ["Python", "FastAPI", "TensorFlow"],
      status: 'completed',
      github_url: "https://github.com/kycaine/machine-learning-deep-learning-api"
    },
    {
      title: "Proof of Work Blockchain",
      description: "Simple blockchain with transaction handling, mining, and blockchain retrieval.",
      details: "A basic Proof of Work blockchain implementation supporting transaction creation...",
      technologies: ["Go", "Gin", "REST API"],
      status: "completed",
      github_url: "https://github.com/kycaine/kycaine-proof-of-work"
    },
    {
      title: "Covid-19 Case Prediction with Machine Learning",
      description: "End-to-end ML workflow for predicting Covid-19 case trends.",
      details: "A fully offline ML pipeline implemented in Jupyter Notebook to predict Covid-19 case trends...",
      technologies: ["Python", "Jupyter Notebook", "Pandas", "Matplotlib", "Scikit-learn"],
      status: "completed",
      github_url: "https://github.com/kycaine/covid19-statistics"
    },
    {
      title: "Custom Blockchain for Money Transfers with Monthly Node Rewards",
      description: "Blockchain network built from scratch in Go, enabling secure money transfers...",
      details: "A fully custom blockchain implemented in Go with peer-to-peer networking...",
      technologies: ["Go", "libp2p", "LevelDB", "gRPC", "Cobra CLI"],
      status: "ongoing",
      github_url: ""
    }
  ];

  const completedProjects = projects.filter(p => p.status === 'completed');
  const ongoingProjects = projects.filter(p => p.status === 'ongoing');

  // Fetch repos when user clicks the button
 const handleShowRepos = async () => {
  if (!showRepos) {
    setLoadingRepos(true);
    try {
      const response = await fetch("https://api.github.com/users/kycaine/starred");
      const data = await response.json();

      // Sort repos by newest updated_at
      const sorted = data.sort(
        (a: Repo, b: Repo) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setRepos(sorted);
    } catch (error) {
      console.error("Failed to fetch repos", error);
    } finally {
      setLoadingRepos(false);
    }
  }
  setShowRepos(!showRepos);
};


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
                  className="bg-secondary/30 rounded-xl p-6 border border-border cursor-pointer hover:border-primary/50 hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary">
                      {project.title}
                    </h4>
                    <ExternalLink className="text-muted-foreground group-hover:text-primary" size={20} />
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
                  className="bg-secondary/30 rounded-xl p-6 border border-border cursor-pointer hover:border-primary/50 hover:scale-105 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-sm font-semibold">
                    ONGOING
                  </div>
                  <div className="flex items-start justify-between mb-4 pr-16">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary">
                      {project.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* View All Repos Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleShowRepos}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 smooth-transition"
            >
              {showRepos ? "Hide Repos" : "View All Repos"}
            </button>
          </div>

          {/* Expanded Section for All Repos */}
          {showRepos && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-primary">All GitHub Repositories</h3>
              {loadingRepos ? (
                <p className="text-center text-muted-foreground">Loading...</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {repos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              )}
            </div>
          )}
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
                className="text-muted-foreground hover:text-foreground text-2xl font-bold"
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

            <h4 className="text-lg font-semibold text-primary mb-3">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-secondary/50 text-foreground px-3 py-1 rounded-full text-sm border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>

            {selectedProject.github_url && (
              <a
                href={selectedProject.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/80"
              >
                Visit Project
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
