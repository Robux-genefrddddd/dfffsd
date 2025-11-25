import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MessageLimitModalProps {
  messagesUsed: number;
  messagesLimit: number;
  onUpgrade?: () => void;
}

export function MessageLimitModal({
  messagesUsed,
  messagesLimit,
  onUpgrade,
}: MessageLimitModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate("/");
      toast.info("Rendez-vous sur votre profil pour mettre à jour votre plan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4">
      <div className="flex flex-col items-center justify-center">
        {/* Enlarged Logo */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center mb-12 animate-pulse"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fafa67d28f8874020a08a6dc1ed05801d%2F340d671f0c4b45db8b30096668d2bc7c)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />

        {/* Content */}
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">
            Limite atteinte
          </h1>

          <p className="text-lg text-foreground/80 mb-8">
            Vous avez utilisé tous vos messages ({messagesUsed}/{messagesLimit})
          </p>

          <p className="text-sm text-foreground/60 mb-12">
            Pour continuer à utiliser l'IA, vous devez activer une nouvelle
            licence ou mettre à jour votre plan.
          </p>

          {/* Upgrade Button - Always Visible */}
          <button
            onClick={handleUpgrade}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold text-lg rounded-lg border-2 border-white/50 hover:border-white transition-all transform hover:scale-105"
          >
            <Zap size={24} />
            Activer une licence
          </button>

          <p className="text-xs text-foreground/50 mt-8">
            Cette action est obligatoire pour continuer
          </p>
        </div>
      </div>
    </div>
  );
}
