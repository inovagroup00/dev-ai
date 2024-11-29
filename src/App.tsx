import { useState, useEffect } from 'react';
import './index.css';
import { ToolCard } from './components/ToolCard';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { Pagination } from './components/Pagination';
import { tools } from './data/tools';
import { usePagination } from './hooks/usePagination';
import { SubmitToolModal, ToolSubmission } from './components/SubmitToolModal';
import { SubmitButton } from './components/SubmitButton';

const ITEMS_PER_PAGE = 9;

interface ToolWithVotes extends ToolSubmission {
  votes: number;
}

interface VoteRecord {
  [toolName: string]: boolean;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedTools, setSubmittedTools] = useState<ToolSubmission[]>([]);
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [userVotes, setUserVotes] = useState<VoteRecord>({});

  // Load saved data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('submittedTools');
    if (stored) {
      setSubmittedTools(JSON.parse(stored));
    }

    const storedVotes = localStorage.getItem('toolVotes');
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }

    const storedUserVotes = localStorage.getItem('userVotes');
    if (storedUserVotes) {
      setUserVotes(JSON.parse(storedUserVotes));
    }
  }, []);

  const handleToolSubmit = (tool: ToolSubmission) => {
    const updatedTools = [...submittedTools, tool];
    setSubmittedTools(updatedTools);
    localStorage.setItem('submittedTools', JSON.stringify(updatedTools));
  };

  const handleVote = (toolName: string) => {
    if (userVotes[toolName]) {
      // Remove vote
      const newVotes = { ...votes };
      newVotes[toolName] = (newVotes[toolName] || 1) - 1;
      const newUserVotes = { ...userVotes };
      delete newUserVotes[toolName];

      setVotes(newVotes);
      setUserVotes(newUserVotes);
      localStorage.setItem('toolVotes', JSON.stringify(newVotes));
      localStorage.setItem('userVotes', JSON.stringify(newUserVotes));
    } else {
      // Add vote
      const newVotes = { ...votes };
      newVotes[toolName] = (newVotes[toolName] || 0) + 1;
      const newUserVotes = { ...userVotes, [toolName]: true };

      setVotes(newVotes);
      setUserVotes(newUserVotes);
      localStorage.setItem('toolVotes', JSON.stringify(newVotes));
      localStorage.setItem('userVotes', JSON.stringify(newUserVotes));
    }
  };

  // Combine and sort tools by votes
  const allTools: ToolWithVotes[] = [...tools, ...submittedTools]
    .map(tool => ({
      ...tool,
      votes: votes[tool.name] || 0
    }))
    .sort((a, b) => b.votes - a.votes);

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  const {
    currentPage,
    maxPage,
    currentItems,
    goToPage,
  } = usePagination(filteredTools, ITEMS_PER_PAGE);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient blobs */}
      <div className="gradient-blob w-[500px] h-[500px] top-0 left-0 bg-blue-500/30" />
      <div className="gradient-blob w-[500px] h-[500px] bottom-0 right-0 bg-purple-500/30" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-4 sm:mb-6 tracking-tight leading-tight sm:leading-tight max-w-3xl mx-auto">
            Ferramentas de IA para Não Desenvolvedores
          </h1>
          <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed px-4">
            As melhores ferramentas para você programar mesmo sem saber
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-6 sm:mb-12">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
            </div>
            <div className="block sm:hidden">
              <SubmitButton onClick={() => setIsModalOpen(true)} variant="full-width" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentItems.map((tool) => (
            <ToolCard
              key={tool.name}
              {...tool}
              onVote={() => handleVote(tool.name)}
              hasVoted={!!userVotes[tool.name]}
            />
          ))}
        </div>

        {filteredTools.length > 0 ? (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              maxPage={maxPage}
              onPageChange={goToPage}
            />
          </div>
        ) : (
          <p className="text-center text-gray-400">
            Nenhuma ferramenta encontrada para os filtros selecionados
          </p>
        )}
      </div>

      {/* Only show fixed button on desktop */}
      <div className="hidden sm:block">
        <SubmitButton onClick={() => setIsModalOpen(true)} variant="fixed" />
      </div>

      <SubmitToolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleToolSubmit}
      />
    </div>
  );
}

export default App;