import { PlusCircle } from 'lucide-react';

interface SubmitButtonProps {
  onClick: () => void;
  variant: 'fixed' | 'full-width';
}

export function SubmitButton({ onClick, variant }: SubmitButtonProps) {
  if (variant === 'fixed') {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-3 glass-effect rounded-xl hover:bg-white/20 transition-colors text-gray-300 hover:text-gray-100 shadow-lg hover:shadow-xl"
      >
        <PlusCircle size={20} />
        <span>Enviar Nova Ferramenta</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 glass-effect rounded-xl hover:bg-white/20 transition-colors text-gray-300 hover:text-gray-100 shadow-lg hover:shadow-xl"
    >
      <PlusCircle size={20} />
      <span>Enviar Nova Ferramenta</span>
    </button>
  );
}