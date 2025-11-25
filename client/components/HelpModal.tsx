import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TUTORIAL_STEPS = [
  {
    title: "Bienvenue dans le Chat",
    description:
      "Ceci est votre interface de chat intelligente. Vous pouvez converser avec l'IA et gérer plusieurs conversations.",
    highlight: "main",
    image: "✨",
  },
  {
    title: "Créer Nouvelles Conversations",
    description:
      "Cliquez sur le bouton 'Nouvelle conversation' dans la barre latérale pour commencer un nouveau chat. Chaque conversation est enregistrée séparément.",
    highlight: "newChat",
    image: "➕",
  },
  {
    title: "Gérer Vos Conversations",
    description:
      "Survolez n'importe quelle conversation pour voir les options de modification et de suppression. Renommez les conversations ou supprimez celles que vous n'avez plus besoin.",
    highlight: "conversations",
    image: "✏️",
  },
  {
    title: "Envoyer des Messages",
    description:
      "Tapez votre message dans la boîte de saisie en bas. Appuyez sur Entrée pour envoyer, ou utilisez Maj+Entrée pour une nouvelle ligne.",
    highlight: "input",
    image: "💬",
  },
  {
    title: "Support Emoji",
    description:
      "Cliquez sur l'icône du sourire pour ajouter des emojis à vos messages. Rendez vos conversations plus expressives!",
    highlight: "emoji",
    image: "😊",
  },
  {
    title: "Vérifiez Votre Utilisation",
    description:
      "Le compteur de messages affiche le nombre de messages qu'il vous reste. Améliorez votre plan pour plus de messages.",
    highlight: "messages",
    image: "📊",
  },
];

export function HelpModal({ isOpen, onOpenChange }: HelpModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = TUTORIAL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-2 border-white rounded-xl max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground text-lg">
            Tutoriel & Aide
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Image/Icon Section */}
          <div className="flex justify-center mb-6 relative">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-5xl border-2 border-white/30">
              {step.image}
            </div>
            {/* Decorative arrow animation */}
            <style>{`
              @keyframes arrowBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
              }
              .arrow-bounce {
                animation: arrowBounce 2s infinite;
              }
            `}</style>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Professional Arrow Guide */}
            <div className="mt-6 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-white">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-2 text-xs text-foreground/70 font-medium">
                  <span className="text-sm">→</span>
                  <span>Conseil: Élément clé - <span className="font-semibold">{step.highlight}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex gap-1">
              {TUTORIAL_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    idx === currentStep
                      ? "bg-white"
                      : idx < currentStep
                        ? "bg-white/50"
                        : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-foreground/50 mt-2">
              Étape {currentStep + 1} sur {TUTORIAL_STEPS.length}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
              Précédent
            </button>

            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-all text-sm"
            >
              Fermer
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === TUTORIAL_STEPS.length - 1}
              className="flex items-center gap-2 px-4 py-2 border border-white rounded-lg text-foreground hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Suivant
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
