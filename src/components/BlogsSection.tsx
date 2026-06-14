import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface MediumArticle {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  content: string;
  categories: string[];
}

const BlogsSection = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kycaine');
        const data = await response.json();
        if (data && data.items) {
          setArticles(data.items);
        }
      } catch (error) {
        console.error("Failed to fetch Medium articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="blogs" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="gold-gradient">Blogs</span>
        </h2>

        {loading ? (
          <p className="text-center text-lg text-muted-foreground">Loading articles...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => {
              const imageSrc = article.thumbnail && !article.thumbnail.includes("stat?event")
                ? article.thumbnail
                : article.content?.match(/<img[^>]+src="([^">]+)"/)?.[1];

              return (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card backdrop-blur-sm rounded-xl overflow-hidden border border-border flex flex-col hover:-translate-y-2 smooth-transition hover:border-primary group"
                >
                  {imageSrc ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                      />
                    </div>
                  ) : (
                    <div className="h-48 overflow-hidden bg-secondary/20 flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-primary line-clamp-2" dangerouslySetInnerHTML={{ __html: article.title }} />
                    <p className="text-sm text-muted-foreground mb-4">
                      {new Date(article.pubDate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between text-sm text-primary font-semibold border-t border-border/50">
                      <span>Read on Medium</span>
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
