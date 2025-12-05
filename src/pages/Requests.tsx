import { useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Send, Check, X, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { RequestModal } from "@/components/modals/RequestModal";
import { Button } from "@/components/ui/button";
import { mockRequests, mockChats } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Tab = "incoming" | "outgoing" | "chats";

const Requests = () => {
  const [activeTab, setActiveTab] = useState<Tab>("incoming");
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAccept = (requestId: string) => {
    toast({
      title: "Connection Accepted! 🎉",
      description: "You can now chat with this person.",
    });
  };

  const handleDecline = (requestId: string) => {
    toast({
      title: "Request Declined",
      description: "The request has been declined.",
    });
  };

  const openRequest = (request: typeof mockRequests[0]) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const tabs = [
    { id: "incoming" as Tab, label: "Incoming", icon: Inbox, count: mockRequests.length },
    { id: "outgoing" as Tab, label: "Outgoing", icon: Send, count: 0 },
    { id: "chats" as Tab, label: "Chats", icon: MessageCircle, count: mockChats.length },
  ];

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
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Your <span className="text-gradient">Connections</span>
            </h1>
            <p className="text-muted-foreground">
              Manage approach requests and chat with your connections
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-coral text-white shadow-soft"
                    : "bg-card hover:bg-muted"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    activeTab === tab.id
                      ? "bg-white/20"
                      : "bg-coral/10 text-coral"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          {activeTab === "incoming" && (
            <div className="space-y-4">
              {mockRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-5 hover:shadow-hover transition-all cursor-pointer"
                  onClick={() => openRequest(request)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-sunset flex items-center justify-center text-white font-bold shadow-soft">
                      {request.user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{request.user.name}, {request.user.age}</h3>
                        {request.user.isVerified && (
                          <span className="px-2 py-0.5 rounded-full bg-coral/10 text-coral text-xs font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        "{request.message}"
                      </p>
                      <p className="text-xs text-muted-foreground">{request.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecline(request.id);
                      }}
                    >
                      <X className="w-4 h-4" />
                      Decline
                    </Button>
                    <Button 
                      variant="coral" 
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(request.id);
                      }}
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </Button>
                  </div>
                </motion.div>
              ))}
              
              {mockRequests.length === 0 && (
                <div className="text-center py-16">
                  <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No incoming requests yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "outgoing" && (
            <div className="text-center py-16">
              <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No outgoing requests</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your sent approach requests will appear here
              </p>
            </div>
          )}

          {activeTab === "chats" && (
            <div className="space-y-3">
              {mockChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-4 hover:shadow-hover transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-sunset flex items-center justify-center text-white font-bold">
                        {chat.user.name.charAt(0)}
                      </div>
                      {chat.user.isOnline && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{chat.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center text-white text-xs font-bold">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {mockChats.length === 0 && (
                <div className="text-center py-16">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No chats yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start connecting with people to chat!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
};

export default Requests;
