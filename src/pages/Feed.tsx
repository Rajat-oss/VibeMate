import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { UserCard } from "@/components/cards/UserCard";
import { ApproachModal } from "@/components/modals/ApproachModal";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Feed = () => {
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleApproach = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleSendRequest = (userId: string, message: string) => {
    toast({
      title: "Request Sent! 💫",
      description: `Your approach request has been sent to ${selectedUser?.name}. They'll review it soon.`,
    });
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Mumbai, India</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Discover People <span className="text-gradient">Near You</span>
            </h1>
            <p className="text-muted-foreground">
              Find genuine companions in your city who share your interests
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-4 mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted/50 border border-border focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                />
              </div>
              <Button variant="soft" className="h-12 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Online Now", "Verified", "Coffee", "Movies", "Fitness", "Books"].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-coral/10 hover:text-coral transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* City Mood Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-5 mb-8 bg-lavender/30 border-lavender/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lavender-dark/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-lavender-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Tonight's Vibes in Mumbai</h3>
                <p className="text-sm text-muted-foreground">
                  12 people looking for companions • 5 café meetups • 3 movie plans
                </p>
              </div>
            </div>
          </motion.div>

          {/* Users Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                onApproach={handleApproach}
                index={index}
              />
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No users found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <ApproachModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSend={handleSendRequest}
      />
    </div>
  );
};

export default Feed;
