import { MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <a 
      href="https://wa.me/8801872392010" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 bg-[#111111] text-[#fefefe] border border-[#fefefe] px-4 py-2 font-bold uppercase tracking-widest text-[11px] rounded-[4px] hover:bg-[#fefefe] hover:text-[#111111] transition-all group shadow-lg"
    >
      <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline translate-y-[1px]">WhatsApp</span>
    </a>
  );
}
