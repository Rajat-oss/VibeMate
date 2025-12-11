import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { UserCard } from "@/components/cards/UserCard";
import { ApproachModal } from "@/components/modals/ApproachModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const Feed = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel('users-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .neq('id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproach = (userId: string) => {
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      setSelectedUser(foundUser);
      setIsModalOpen(true);
    }
  };

  const handleSendRequest = async (userId: string, message: string) => {
    try {
      const { error } = await supabase
        .from('connection_requests')
        .insert({
          sender_id: user?.id,
          receiver_id: userId,
          message,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Request Sent! 💫",
        description: `Your approach request has been sent to ${selectedUser?.name}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.interests && u.interests.some((i: string) => i.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

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
                <h3 className="font-semibold text-sm">Active Users</h3>
                <p className="text-sm text-muted-foreground">
                  {users.length} people available to connect
                </p>
              </div>
            </div>
          </motion.div>

          {/* Users Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((u, index) => (
              <UserCard
                key={u.id}
                user={{
                  id: u.id,
                  name: u.name,
                  age: u.age,
                  city: u.city || 'Unknown',
                  distance: '0km away',
                  bio: u.bio || 'No bio yet',
                  avatar: u.avatar || '',
                  interests: u.interests || [],
                  badge: '',
                  isOnline: false,
                  isVerified: u.is_verified || false
                }}
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
