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
            Tutorial & Help
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Image/Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-5xl border-2 border-white/30">
              {step.image}
            </div>
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

            {/* Visual Arrow Guide */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 relative">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-foreground/60">
                  <span>👉</span>
                  <span>Tip: {step.highlight}</span>
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
              Step {currentStep + 1} of {TUTORIAL_STEPS.length}
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
              Previous
            </button>

            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-all text-sm"
            >
              Close
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === TUTORIAL_STEPS.length - 1}
              className="flex items-center gap-2 px-4 py-2 border border-white rounded-lg text-foreground hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
