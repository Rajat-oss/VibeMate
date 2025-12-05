import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, User, MessageCircle, Users, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/feed", label: "Discover", icon: Users },
  { href: "/threads", label: "Threads", icon: MessageCircle },
  { href: "/requests", label: "Requests", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isLanding ? "bg-transparent" : "glass border-b border-white/10"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-sunset flex items-center justify-center shadow-soft group-hover:shadow-hover transition-all duration-300 group-hover:-translate-y-0.5">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Vibe<span className="text-gradient">Mate</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {!isLanding && navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant={isActive ? "soft" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "bg-coral/10 text-coral"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLanding ? (
              <>
                <Link to="/feed">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/feed">
                  <Button variant="coral">Get Started</Button>
                </Link>
              </>
            ) : (
              <Link to="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      isActive ? "bg-coral/10 text-coral" : "hover:bg-muted"
                    )}>
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-4 flex flex-col gap-2">
                <Link to="/feed" onClick={() => setIsOpen(false)}>
                  <Button variant="coral" className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
