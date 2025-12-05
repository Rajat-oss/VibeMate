import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-sunset opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6 backdrop-blur-sm">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Your <br className="hidden sm:block" />
            Companion?
          </h2>

          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of people who've found genuine connections in their city. 
            Your next coffee buddy, movie partner, or lifelong friend might be just a tap away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/feed">
              <Button 
                size="xl" 
                className="bg-white text-coral hover:bg-white/90 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-white/70 mt-6">
            Free to join • No credit card required • Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
