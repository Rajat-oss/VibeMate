import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  MapPin, 
  Edit3, 
  Shield, 
  Settings, 
  Heart,
  Camera,
  Sparkles,
  LogOut
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: "Alex",
    age: 25,
    city: "Mumbai",
    bio: "Tech enthusiast who loves coffee, good conversations, and exploring new places in the city. Looking for genuine connections and adventure buddies!",
    interests: ["Coffee", "Tech", "Photography", "Travel", "Movies", "Books"],
    socialPreferences: "Introverted but loves deep conversations",
    lookingFor: "Café hangouts, movie buddies, weekend adventures",
    isVerified: true,
    memberSince: "December 2024",
    connectionsCount: 12,
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated! ✨",
      description: "Your changes have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl overflow-hidden mb-6"
          >
            {/* Cover */}
            <div className="h-32 bg-gradient-sunset relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
            </div>

            {/* Avatar & Info */}
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-sunset flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-card">
                  {profile.name.charAt(0)}
                </div>
                {profile.isVerified && (
                  <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-coral flex items-center justify-center border-2 border-card">
                    <Sparkles className="w-4 h-4 text-white" />
                  </span>
                )}
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-coral hover:text-white transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}, {profile.age}</h1>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {profile.city}
                  </p>
                </div>
                <Button 
                  variant={isEditing ? "coral" : "soft"} 
                  size="sm"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save" : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-2xl font-bold text-coral">{profile.connectionsCount}</p>
                  <p className="text-sm text-muted-foreground">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.memberSince}</p>
                  <p className="text-sm text-muted-foreground">Member since</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 mb-4"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-coral" />
              About Me
            </h3>
            {isEditing ? (
              <textarea
                defaultValue={profile.bio}
                className="w-full h-24 px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none resize-none text-sm"
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            )}
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-6 mb-4"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-coral" />
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-peach text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
              {isEditing && (
                <button className="px-4 py-2 rounded-full border-2 border-dashed border-coral/30 text-sm font-medium text-coral hover:bg-coral/5 transition-colors">
                  + Add
                </button>
              )}
            </div>
          </motion.div>

          {/* Looking For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 mb-4"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-coral" />
              Looking For
            </h3>
            <p className="text-muted-foreground">{profile.lookingFor}</p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-2"
          >
            <button className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 hover:shadow-hover transition-all text-left">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Safety Center</h4>
                <p className="text-sm text-muted-foreground">Manage blocks, reports & privacy</p>
              </div>
            </button>

            <button className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 hover:shadow-hover transition-all text-left">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">App Settings</h4>
                <p className="text-sm text-muted-foreground">Notifications, preferences & more</p>
              </div>
            </button>

            <button className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 hover:shadow-hover transition-all text-left text-destructive">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Sign Out</h4>
                <p className="text-sm opacity-70">Log out of your account</p>
              </div>
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
