import { useState } from "react";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  created_at: string;   
  updated_at: string;  
}


const RepoCard = ({ repo }: { repo: Repo }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-secondary/30 rounded-xl p-6 border border-border hover:border-primary/50 hover:scale-105 smooth-transition flex flex-col justify-between ${
        expanded ? "h-auto" : "h-55"
      }`}
    >
      <div>
        <h4 className="text-lg font-bold text-primary mb-2">{repo.name}</h4>
        <p className={`text-muted-foreground mb-2 ${expanded ? "" : "line-clamp-1"}`}>
          {repo.description || "No description provided"}
        </p>

        {repo.description && repo.description.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-primary hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground">{repo.language || "N/A"}</span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          View →
        </a>
      </div>
    </div>
  );
};

export default RepoCard;
