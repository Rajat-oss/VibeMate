import { motion } from "framer-motion";
import { Heart, Users, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-warm">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-lavender/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-amber-light/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 border border-coral/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">A safe space for real connections</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your{" "}
              <span className="text-gradient">Companion</span>{" "}
              <br className="hidden sm:block" />
              In Your City
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Not dating. Not networking.{" "}
              <span className="text-foreground font-medium">Just real companionship.</span>{" "}
              Connect with genuine people nearby who share your interests and want to explore life together.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {[
                { icon: Shield, text: "Consent-First" },
                { icon: Users, text: "Same City" },
                { icon: Heart, text: "Genuine People" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-soft"
                >
                  <item.icon className="w-4 h-4 text-coral" />
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/feed">
                <Button variant="coral" size="xl" className="w-full sm:w-auto">
                  Start Connecting
                  <Heart className="w-5 h-5 ml-1" fill="currentColor" />
                </Button>
              </Link>
              <Link to="#how-it-works">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card Stack */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Background Cards */}
                <motion.div
                  animate={{ rotate: -6, y: 10 }}
                  className="absolute inset-0 rounded-3xl bg-lavender/50 transform -translate-x-4"
                />
                <motion.div
                  animate={{ rotate: 3, y: -5 }}
                  className="absolute inset-0 rounded-3xl bg-amber-light/50 transform translate-x-4"
                />
                
                {/* Main Profile Card */}
                <div className="relative glass-card rounded-3xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center text-white text-2xl font-bold shadow-soft">
                      S
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Sarah, 26</h3>
                      <p className="text-muted-foreground text-sm">Mumbai • 2km away</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-600 font-medium">Online now</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    "Looking for someone to explore cafés with and have deep conversations about life ✨"
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Coffee Lover", "Photography", "Books"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-peach text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/20 text-sm">
                    <span>☕</span>
                    <span className="font-medium text-amber-dark">Café buddy needed</span>
                  </div>
                  
                  <Button variant="approach" className="w-full mt-4">
                    <Heart className="w-4 h-4" />
                    Approach
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 glass-card rounded-2xl p-4 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Verified Profile</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-8 glass-card rounded-2xl p-4 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-coral" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">2,847</p>
                    <p className="text-xs text-muted-foreground">Active in Mumbai</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
