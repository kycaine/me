import { useState, useEffect } from 'react';
import { Code, Users, ExternalLink, Activity } from 'lucide-react';
import RepoCard from './RepositoryCard';
import type { Repo } from './RepositoryCard';

interface RepoDetails {
  languages: Record<string, number>;
  contributors: Array<{ login: string; avatar_url: string; html_url: string }>;
}

const ProjectsSection = () => {
  const [highlightedRepos, setHighlightedRepos] = useState<Repo[]>([]);
  const [loadingHighlighted, setLoadingHighlighted] = useState(true);

  const [showRepos, setShowRepos] = useState(false);
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [loadingAllRepos, setLoadingAllRepos] = useState(false);

  // Modal State
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [repoDetails, setRepoDetails] = useState<RepoDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchHighlightedRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/kycaine/starred");
        const data = await response.json();
        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a: Repo, b: Repo) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setHighlightedRepos(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch highlighted repos", error);
      } finally {
        setLoadingHighlighted(false);
      }
    };

    fetchHighlightedRepos();
  }, []);

  const handleShowRepos = async () => {
    if (!showRepos && allRepos.length === 0) {
      setLoadingAllRepos(true);
      try {
        const response = await fetch("https://api.github.com/users/kycaine/repos?sort=updated&per_page=100");
        const data = await response.json();
        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a: Repo, b: Repo) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setAllRepos(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch all repos", error);
      } finally {
        setLoadingAllRepos(false);
      }
    }
    setShowRepos(!showRepos);
  };

  const handleViewRepo = async (repo: Repo) => {
    setSelectedRepo(repo);
    setRepoDetails(null);
    setLoadingDetails(true);

    try {
      const [langsRes, contribsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/kycaine/${repo.name}/languages`),
        fetch(`https://api.github.com/repos/kycaine/${repo.name}/contributors`)
      ]);

      const languages = langsRes.ok ? await langsRes.json() : {};
      const contributors = contribsRes.ok ? await contribsRes.json() : [];

      setRepoDetails({ languages, contributors: Array.isArray(contributors) ? contributors : [] });
    } catch (error) {
      console.error("Failed to fetch repo details", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setSelectedRepo(null);
    setRepoDetails(null);
  };

  return (
    <>
      <section id="projects" className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gold-gradient">Projects</span>
          </h2>

          {/* Highlighted Projects */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 flex items-center ">
              <Code className="gold-gradient mr-3" size={32} />
              <span className="gold-gradient">Highlighted Projects</span>
            </h3>
            {loadingHighlighted ? (
              <p className="text-lg text-muted-foreground">Loading highlighted projects...</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlightedRepos.map(repo => (
                  <RepoCard key={repo.id} repo={repo} onView={handleViewRepo} />
                ))}
              </div>
            )}
          </div>

          {/* View All Repos Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleShowRepos}
              className="px-6 py-3 bg-[#800000] text-primary-foreground rounded-lg text-lg font-semibold hover:bg-[#660000] smooth-transition"
            >
              {showRepos ? "Hide All Repos" : "View All Repos"}
            </button>
          </div>

          {/* Expanded Section for All Repos */}
          {showRepos && (
            <div className="mt-12 animate-fade-in">
              <h3 className="text-3xl font-bold mb-6 text-primary">All GitHub Repositories</h3>
              {loadingAllRepos ? (
                <p className="text-center text-lg text-muted-foreground">Loading...</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allRepos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} onView={handleViewRepo} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedRepo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold text-primary">{selectedRepo.name}</h3>
              <button
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground text-3xl leading-none font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-foreground/90 text-xl leading-relaxed mb-8">
              {selectedRepo.description || "No description provided for this repository."}
            </p>

            {loadingDetails ? (
              <div className="flex items-center space-x-2 text-lg text-muted-foreground mb-8">
                <Activity className="animate-spin" size={20} />
                <span>Loading repository details...</span>
              </div>
            ) : repoDetails && (
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Languages */}
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Code className="mr-2 text-primary" size={20} />
                    Languages
                  </h4>
                  {Object.keys(repoDetails.languages).length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(repoDetails.languages).map(lang => (
                        <span key={lang} className="bg-secondary/50 text-foreground px-3 py-1 rounded-full text-sm border border-border">
                          {lang}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-base">No language data found.</p>
                  )}
                </div>

                {/* Contributors */}
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Users className="mr-2 text-primary" size={20} />
                    Contributors
                  </h4>
                  {repoDetails.contributors.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {repoDetails.contributors.map(contributor => (
                        <a
                          key={contributor.login}
                          href={contributor.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contributor.login}
                          className="hover:scale-110 smooth-transition"
                        >
                          <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="w-8 h-8 rounded-full border border-border"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-base">No contributors found.</p>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border mt-8">
              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#800000] text-primary-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#660000] smooth-transition w-full sm:w-auto"
              >
                Visit Project on GitHub <ExternalLink className="ml-2" size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
