import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ApproachModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    age: number;
    city: string;
    bio: string;
    avatar: string;
    interests: string[];
    isVerified?: boolean;
  } | null;
  onSend: (userId: string, message: string) => void;
}

export function ApproachModal({ isOpen, onClose, user, onSend }: ApproachModalProps) {
  const [message, setMessage] = useState("");

  if (!user) return null;

  const handleSend = () => {
    if (message.trim()) {
      onSend(user.id, message);
      setMessage("");
      onClose();
    }
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
              {/* Header with gradient */}
              <div className="relative h-24 bg-gradient-sunset">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {/* Avatar overlapping */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-sunset flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-card overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    {user.isVerified && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-coral flex items-center justify-center border-2 border-card">
                        <Sparkles className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-14 px-6 pb-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1">{user.name}, {user.age}</h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {user.city}
                  </p>
                </div>

                <p className="text-center text-muted-foreground text-sm mb-4 leading-relaxed">
                  "{user.bio}"
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {user.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full bg-peach text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Message Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    Why do you want to connect?
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share something genuine — maybe a shared interest or what caught your attention..."
                    className="w-full h-24 px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none resize-none text-sm placeholder:text-muted-foreground transition-all"
                  />
                  <p className="text-xs text-muted-foreground">
                    Be respectful. Your message will be reviewed before being sent.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    variant="coral" 
                    className="flex-1"
                    onClick={handleSend}
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                    Send Request
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
