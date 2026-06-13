export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  created_at: string;
  updated_at: string;
}

const RepoCard = ({ repo, onView }: { repo: Repo; onView: (repo: Repo) => void }) => {
  return (
    <div
      onClick={() => onView(repo)}
      className="bg-card backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary hover:scale-105 smooth-transition flex flex-col justify-between h-55 cursor-pointer group"
    >
      <div>
        <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-foreground/80">{repo.name}</h4>
        <p className="text-base md:text-lg text-muted-foreground mb-2 line-clamp-2">
          {repo.description || "No description provided"}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-base text-muted-foreground">{repo.language || "N/A"}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(repo);
          }}
          className="text-lg text-foreground font-semibold hover:underline"
        >
          View →
        </button>
      </div>
    </div>
  );
};

export default RepoCard;
