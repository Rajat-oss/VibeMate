import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Sparkles, Check, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: string;
    user: {
      name: string;
      age: number;
      city: string;
      bio: string;
      avatar: string;
      interests: string[];
      isVerified?: boolean;
    };
    message: string;
    timestamp: string;
  } | null;
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
}

export function RequestModal({ isOpen, onClose, request, onAccept, onDecline }: RequestModalProps) {
  if (!request) return null;

  const handleAccept = () => {
    onAccept(request.id);
    onClose();
  };

  const handleDecline = () => {
    onDecline(request.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
          >
            <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative h-24 bg-lavender">
                <div className="absolute inset-0 bg-gradient-to-br from-lavender-dark/20 to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lavender-dark hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium text-lavender-dark">
                  New Approach Request
                </div>
                
                {/* Avatar */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-sunset flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-card overflow-hidden">
                      {request.user.avatar ? (
                        <img src={request.user.avatar} alt={request.user.name} className="w-full h-full object-cover" />
                      ) : (
                        request.user.name.charAt(0)
                      )}
                    </div>
                    {request.user.isVerified && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-coral flex items-center justify-center border-2 border-card">
                        <Sparkles className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-14 px-6 pb-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-1">{request.user.name}, {request.user.age}</h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {request.user.city}
                  </p>
                </div>

                <p className="text-center text-muted-foreground text-sm mb-4 leading-relaxed">
                  "{request.user.bio}"
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {request.user.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full bg-peach text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Request Message */}
                <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">
                    Their message to you:
                  </p>
                  <p className="text-sm text-foreground leading-relaxed italic">
                    "{request.message}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {request.timestamp}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10"
                    onClick={handleDecline}
                  >
                    <XIcon className="w-4 h-4" />
                    Decline
                  </Button>
                  <Button 
                    variant="coral" 
                    className="flex-1"
                    onClick={handleAccept}
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Accepting will unlock private chat with {request.user.name}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
