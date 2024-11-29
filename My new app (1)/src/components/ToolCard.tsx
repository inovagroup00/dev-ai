import { ExternalLink, Star } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  votes: number;
  onVote: () => void;
  hasVoted: boolean;
}

export function ToolCard({ name, description, url, icon, category, votes, onVote, hasVoted }: ToolCardProps) {
  return (
    <div className="glass-effect card-hover rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur opacity-20"></div>
            <img 
              src={icon} 
              alt={name} 
              className="relative w-10 h-10 rounded-xl object-cover border border-white/10" 
            />
          </div>
          <h3 className="font-semibold text-lg text-gray-100">{name}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onVote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              hasVoted
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'text-gray-400 hover:text-yellow-300 hover:bg-white/10'
            }`}
          >
            <Star
              size={18}
              className={hasVoted ? 'fill-yellow-300' : ''}
            />
            <span className="text-sm font-medium">{votes}</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
      <div className="mt-4">
        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full">
          {category}
        </span>
      </div>
      <p className="mt-4 text-sm text-gray-300/90 line-clamp-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}