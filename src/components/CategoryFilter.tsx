import { ChevronDown } from 'lucide-react';
import { tools } from '../data/tools';

interface CategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

// Get unique categories from tools data
const categories = ['Todas as Categorias', ...new Set(tools.map(tool => tool.category))].sort();

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="relative">
      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none pl-4 pr-10 py-3.5 glass-effect rounded-2xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
      >
        {categories.map((category) => (
          <option key={category} value={category === 'Todas as Categorias' ? '' : category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}