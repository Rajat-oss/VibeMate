import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    age: number;
    city: string;
    distance: string;
    bio: string;
    avatar: string;
    interests: string[];
    badge?: string;
    isOnline: boolean;
    isVerified?: boolean;
  };
  onApproach: (userId: string) => void;
  index?: number;
}

export function UserCard({ user, onApproach, index = 0 }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className="glass-card rounded-3xl p-5 h-full transition-all duration-300 hover:shadow-hover">
        {/* Blurred Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-sunset opacity-10 blur-3xl rounded-full pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center text-white text-2xl font-bold shadow-soft overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            {/* Online Indicator */}
            {user.isOnline && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </span>
            )}
            {/* Verified Badge */}
            {user.isVerified && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-coral flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">{user.name}, {user.age}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{user.city} • {user.distance}</span>
            </div>
            {user.isOnline && (
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs text-green-600 font-medium">Online now</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          "{user.bio}"
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-4">
          {user.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 rounded-full bg-peach text-xs font-medium"
            >
              {interest}
            </span>
          ))}
          {user.interests.length > 3 && (
            <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
              +{user.interests.length - 3}
            </span>
          )}
        </div>

        {/* Badge */}
        {user.badge && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/20 text-sm">
              <span>✨</span>
              <span className="font-medium text-amber-dark">{user.badge}</span>
            </div>
          </div>
        )}

        {/* Approach Button */}
        <Button 
          variant="approach" 
          className="w-full"
          onClick={() => onApproach(user.id)}
        >
          <Heart className="w-4 h-4" />
          Approach
        </Button>
      </div>
    </motion.div>
  );
}
