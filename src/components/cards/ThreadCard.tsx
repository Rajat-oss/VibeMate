import { motion } from "framer-motion";
import { Heart, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ThreadCardProps {
  thread: {
    id: string;
    author: {
      name: string;
      avatar: string;
      city: string;
    };
    content: string;
    timestamp: string;
    interestedCount: number;
    isInterested?: boolean;
  };
  onInterested: (threadId: string) => void;
  index?: number;
}

export function ThreadCard({ thread, onInterested, index = 0 }: ThreadCardProps) {
  const [isInterested, setIsInterested] = useState(thread.isInterested || false);
  const [count, setCount] = useState(thread.interestedCount);

  const handleInterested = () => {
    setIsInterested(!isInterested);
    setCount(prev => isInterested ? prev - 1 : prev + 1);
    onInterested(thread.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group"
    >
      <div className="glass-card rounded-2xl p-5 hover:shadow-hover transition-all duration-300">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-sunset flex items-center justify-center text-white font-bold shadow-soft overflow-hidden">
            {thread.author.avatar ? (
              <img src={thread.author.avatar} alt={thread.author.name} className="w-full h-full object-cover" />
            ) : (
              thread.author.name.charAt(0)
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{thread.author.name}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {thread.author.city}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {thread.timestamp}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-foreground leading-relaxed mb-4 text-[15px]">
          {thread.content}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className={cn("w-4 h-4", isInterested && "text-coral fill-coral")} />
            <span>{count} interested</span>
          </div>

          <Button
            variant={isInterested ? "soft" : "interested"}
            size="sm"
            onClick={handleInterested}
            className={cn(
              "transition-all",
              isInterested && "bg-coral/10 text-coral border-coral/20"
            )}
          >
            {isInterested ? "Interested ✓" : "I'm Interested"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
