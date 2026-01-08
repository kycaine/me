import { useState } from 'react';
import { Download, FileText, ExternalLink, Heart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Tool {
  title: string;
  description: string;
  github: string;
  repo: string;
}

const ToolsSection = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [loadingReadme, setLoadingReadme] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  const tools: Tool[] = [
    {
      title: "Bulk File Renaming Tool",
      description: "Powerful and intuitive tool for batch renaming files with pattern matching and preview functionality.",
      github: "https://github.com/kycaine/bulk-file-renaming-tool",
      repo: "kycaine/bulk-file-renaming-tool",
    },
    {
      title: "Data Forge to DB",
      description: "Transform and migrate your data seamlessly. Convert data formats and load directly into databases.",
      github: "https://github.com/kycaine/data-forge-to-db",
      repo: "kycaine/data-forge-to-db",
    },
  ];

  const fetchReadme = async (tool: Tool) => {
    setLoadingReadme(true);
    setReadmeError(null);
    try {
      const response = await fetch(
        `https://api.github.com/repos/${tool.repo}/readme`,
        {
          headers: {
            Accept: 'application/vnd.github.v3.raw',
          },
        }
      );

      if (!response.ok) {
        throw new Error('README not found');
      }

      const content = await response.text();
      setReadmeContent(content);
    } catch (error) {
      setReadmeError(
        error instanceof Error ? error.message : 'Failed to fetch README'
      );
      setReadmeContent(null);
    } finally {
      setLoadingReadme(false);
    }
  };

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setReadmeContent(null);
    fetchReadme(tool);
  };

  const handleDownload = (tool: Tool) => {
    const downloadUrl = `${tool.github}/archive/refs/heads/master.zip`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDonate = () => {
    // Ko-fi donation link
    window.open('https://ko-fi.com/kycaine', '_blank');
  };

  return (
    <section id="tools" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="gold-gradient">May Can Help You</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Free tools & utilities to streamline your workflow
        </p>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl p-6"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {tool.description}
                </p>

                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={() => handleToolClick(tool)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    README
                  </Button>
                  <Button
                    onClick={() => handleDownload(tool)}
                    variant="default"
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donate Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleDonate}
            className="gap-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            size="lg"
          >
            <Heart className="w-5 h-5 fill-current" />
            Support Me - Buy a Coffee
          </Button>
        </div>
      </div>

      {/* README Preview Dialog */}
      <Dialog open={selectedTool !== null} onOpenChange={(open) => {
        if (!open) {
          setSelectedTool(null);
          setReadmeContent(null);
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedTool?.title}</DialogTitle>
            <DialogDescription>
              Project README from GitHub
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[60vh] w-full rounded-md border border-border p-4">
            {loadingReadme ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Loading README...</p>
              </div>
            ) : readmeError ? (
              <div className="space-y-4">
                <p className="text-red-500">Error: {readmeError}</p>
                <a
                  href={selectedTool?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            ) : readmeContent ? (
              <div className="prose dark:prose-invert prose-sm max-w-none">
                <pre className="bg-secondary/50 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap break-words">
                  {readmeContent}
                </pre>
              </div>
            ) : null}
          </ScrollArea>

          {selectedTool && (
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                onClick={() => handleDownload(selectedTool)}
                className="flex-1 gap-2"
              >
                <Download className="w-4 h-4" />
                Download Repository
              </Button>
              <Button
                onClick={() => window.open(selectedTool.github, '_blank')}
                variant="outline"
                className="flex-1 gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open on GitHub
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ToolsSection;
