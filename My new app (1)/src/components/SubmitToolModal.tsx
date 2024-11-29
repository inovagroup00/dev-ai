import { X } from 'lucide-react';
import { useState } from 'react';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tool: ToolSubmission) => void;
}

export interface ToolSubmission {
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  submittedAt: string;
}

const categories = [
  'Assistente de Código',
  'Assistente IA',
  'Geração de Código',
  'Utilitários',
  'Design',
  'Análise de Código',
  'Documentação',
  'Refatoração',
  'Educação',
  'Segurança',
  'Machine Learning',
  'APIs',
  'Produtividade',
  'Frameworks',
  'Desenvolvimento',
  'Infraestrutura'
];

export function SubmitToolModal({ isOpen, onClose, onSubmit }: SubmitToolModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    icon: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submission: ToolSubmission = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    onSubmit(submission);
    onClose();
    setFormData({ name: '', description: '', url: '', icon: '', category: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl p-6 border border-white/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Enviar Nova Ferramenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome da Ferramenta
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full glass-effect rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Nome da ferramenta"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full glass-effect rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Descreva a ferramenta"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL
            </label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full glass-effect rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL do Ícone
            </label>
            <input
              type="url"
              required
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full glass-effect rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categoria
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full glass-effect rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-gray-100 hover:bg-white/10"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              Enviar Ferramenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}