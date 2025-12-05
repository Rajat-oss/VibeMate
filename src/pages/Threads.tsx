import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, TrendingUp, Clock, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { ThreadCard } from "@/components/cards/ThreadCard";
import { Button } from "@/components/ui/button";
import { mockThreads } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Threads = () => {
  const [threads, setThreads] = useState(mockThreads);
  const [newThread, setNewThread] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { toast } = useToast();

  const handleInterested = (threadId: string) => {
    toast({
      title: "Interest Shown! 💫",
      description: "The poster will be notified. If they approve, you can chat!",
    });
  };

  const handlePostThread = () => {
    if (newThread.trim()) {
      const thread = {
        id: `t${Date.now()}`,
        author: {
          name: "You",
          avatar: "",
          city: "Mumbai",
        },
        content: newThread,
        timestamp: "Just now",
        interestedCount: 0,
      };
      setThreads([thread, ...threads]);
      setNewThread("");
      setIsComposing(false);
      toast({
        title: "Thread Posted! ✨",
        description: "Your thread is now visible to people in your city.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Mumbai City Feed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Social <span className="text-gradient">Threads</span>
            </h1>
            <p className="text-muted-foreground">
              Share what you're up to and find people to join you
            </p>
          </motion.div>

          {/* Compose Thread */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-5 mb-8"
          >
            {isComposing ? (
              <div className="space-y-4">
                <textarea
                  value={newThread}
                  onChange={(e) => setNewThread(e.target.value)}
                  placeholder="What are you planning? Share your vibe..."
                  className="w-full h-32 px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none resize-none text-sm placeholder:text-muted-foreground transition-all"
                  autoFocus
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Your thread will be visible to people in your city
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsComposing(false)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="coral" 
                      size="sm"
                      onClick={handlePostThread}
                      disabled={!newThread.trim()}
                    >
                      Post Thread
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsComposing(true)}
                className="w-full flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-sunset flex items-center justify-center shadow-soft">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span>What's your plan for today?</span>
              </button>
            )}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex gap-2 mb-6 overflow-x-auto pb-2"
          >
            <Button variant="soft" size="sm" className="gap-2 flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
              Trending
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 flex-shrink-0">
              <Clock className="w-4 h-4" />
              Recent
            </Button>
            {["Tonight", "Weekend", "Study", "Food", "Movies"].map((tag) => (
              <Button key={tag} variant="ghost" size="sm" className="flex-shrink-0">
                {tag}
              </Button>
            ))}
          </motion.div>

          {/* Threads List */}
          <div className="space-y-4">
            {threads.map((thread, index) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                onInterested={handleInterested}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Threads;
