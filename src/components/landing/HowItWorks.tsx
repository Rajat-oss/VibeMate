import { motion } from "framer-motion";
import { UserPlus, Search, Send, MessageCircle, Shield, Check } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Share your interests, hobbies, and what kind of companionship you're seeking. Be authentic — that's how you find genuine connections.",
    color: "coral",
  },
  {
    icon: Search,
    title: "Discover Nearby People",
    description: "Browse profiles of people in your city. Filter by interests, activity type, and comfort level. Find your vibe match.",
    color: "lavender-dark",
  },
  {
    icon: Send,
    title: "Send an Approach Request",
    description: "Found someone interesting? Send a respectful approach request. Tell them why you'd like to connect — no random messages allowed.",
    color: "amber",
  },
  {
    icon: MessageCircle,
    title: "Chat After Mutual Consent",
    description: "Only when both of you agree, the chat unlocks. Real connections happen when both sides feel safe and interested.",
    color: "coral",
  },
];

const safetyFeatures = [
  "Profile verification required",
  "No unsolicited messages",
  "Block & report with one tap",
  "AI moderation for safety",
  "Location privacy controls",
  "24h disappearing messages option",
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-lavender/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How <span className="text-gradient">VibeMate</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, safe, and respectful. Here's how you find your companion.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass-card rounded-3xl p-6 h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1 group">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-sunset text-white text-sm font-bold flex items-center justify-center shadow-soft">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110 ${
                  step.color === 'coral' ? 'bg-coral/10' :
                  step.color === 'lavender-dark' ? 'bg-lavender' :
                  'bg-amber-light'
                }`}>
                  <step.icon className={`w-7 h-7 ${
                    step.color === 'coral' ? 'text-coral' :
                    step.color === 'lavender-dark' ? 'text-lavender-dark' :
                    'text-amber'
                  }`} />
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-coral/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Safety Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Your Safety Comes First
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Built with Safety <br />at the Core
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We understand that meeting new people can feel vulnerable. That's why every feature 
                in VibeMate is designed with your safety and comfort in mind. You're always in control.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {safetyFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/50"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
