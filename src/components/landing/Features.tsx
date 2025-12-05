import { motion } from "framer-motion";
import { 
  MapPin, 
  MessageSquareText, 
  Sparkles, 
  Coffee, 
  Film, 
  BookOpen,
  Music,
  Dumbbell,
  Camera
} from "lucide-react";

const activities = [
  { icon: Coffee, label: "Café hangouts", color: "bg-amber-light text-amber" },
  { icon: Film, label: "Movie buddies", color: "bg-coral/10 text-coral" },
  { icon: BookOpen, label: "Study partners", color: "bg-lavender text-lavender-dark" },
  { icon: Music, label: "Concert friends", color: "bg-peach text-coral" },
  { icon: Dumbbell, label: "Gym partners", color: "bg-green-100 text-green-600" },
  { icon: Camera, label: "Photo walks", color: "bg-coral/10 text-coral" },
];

export function Features() {
  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Activity Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find People For <span className="text-gradient">Any Activity</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you want a coffee companion or a gym buddy, find someone who shares your interests.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-full ${activity.color} cursor-pointer transition-shadow hover:shadow-soft`}
              >
                <activity.icon className="w-5 h-5" />
                <span className="font-medium">{activity.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* City-Based Discovery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 text-center hover:shadow-hover transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset mx-auto mb-6 flex items-center justify-center shadow-soft">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">City-Based Discovery</h3>
            <p className="text-muted-foreground leading-relaxed">
              Connect with people in your city or neighborhood. See who's nearby, what they're interested in, 
              and discover shared passions.
            </p>
          </motion.div>

          {/* Social Threads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-8 text-center hover:shadow-hover transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-lavender mx-auto mb-6 flex items-center justify-center">
              <MessageSquareText className="w-8 h-8 text-lavender-dark" />
            </div>
            <h3 className="text-xl font-bold mb-3">Social Threads</h3>
            <p className="text-muted-foreground leading-relaxed">
              Post what you feel like doing right now. "Going to Marine Drive tonight, anyone interested?" 
              Others can express interest and connect.
            </p>
          </motion.div>

          {/* Smart Matching */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 text-center hover:shadow-hover transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-light mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber" />
            </div>
            <h3 className="text-xl font-bold mb-3">Companion Match</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our AI analyzes interests, personality, and activity preferences to suggest meaningful 
              connections you'll actually click with.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
