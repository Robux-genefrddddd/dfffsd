import { Plus, LogOut, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Conversation {
  id: number;
  name: string;
  active: boolean;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, name: "New Conversation", active: true },
  ]);
  const [messagesUsed] = useState(7);
  const [messagesLimit] = useState(15);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewConversation = () => {
    const newId = Math.max(...conversations.map(c => c.id), 0) + 1;
    const newConversation: Conversation = {
      id: newId,
      name: `Conversation ${newId}`,
      active: false,
    };
    setConversations([...conversations, newConversation]);
  };

  const handleDeleteConversation = (id: number) => {
    setConversations(conversations.filter(c => c.id !== id));
    setEditingId(null);
  };

  const handleEditConversation = (id: number, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      setConversations(
        conversations.map(c =>
          c.id === editingId ? { ...c, name: editName } : c
        )
      );
    }
    setIsDialogOpen(false);
    setEditingId(null);
    setEditName("");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-sidebar border-r-2 border-white/20 flex flex-col transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50 animate-slideInLeft`}
      >
        {/* Header - Minimal */}
        <div className="p-4 animate-fadeIn">
          <div className="flex items-center gap-3 mb-2 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center text-background text-sm font-bold border-2 border-white hover:scale-110 transition-transform">
                N
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Nothing
                </p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-foreground/70 hover:text-foreground">
                  <MoreVertical size={16} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2 bg-card border-2 border-white rounded-xl">
                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors">
                    Help
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs text-foreground/50 truncate">
            nothing@example.com
          </p>
        </div>

        {/* Divider */}
        <div className="px-4 py-0">
          <div className="h-px bg-white/10"></div>
        </div>

        {/* New Conversation Button - Discreet */}
        <div className="px-4 py-2 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-white/40 text-foreground/70 hover:border-white/70 hover:text-foreground hover:bg-white/5 transition-all text-xs font-medium rounded-lg">
            <Plus size={14} />
            New conversation
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {conversations.map((conv, idx) => (
              <button
                key={conv.id}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border-2 ${
                  conv.active
                    ? "bg-white/10 text-foreground border-white hover:bg-white/15"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/5 border-white/30 hover:border-white/60"
                }`}
                style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
              >
                {conv.name}
              </button>
            ))}
          </div>
        </div>

        {/* Message Usage Section */}
        <div className="px-4 py-4 border-t border-white/10 animate-fadeIn" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-white/70 font-medium">Messages</span>
          </div>
          <div className="space-y-1">
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white/40 to-white/60 rounded-full transition-all"
                style={{ width: `${(messagesUsed / messagesLimit) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-white/60">
              {messagesLimit - messagesUsed} of {messagesLimit} remaining
            </p>
          </div>
        </div>

        {/* Footer - Sign Out */}
        <div className="px-4 py-3 border-t border-white/10 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-foreground/70 hover:text-foreground border-2 border-red-500/50 hover:border-red-500 hover:bg-red-500/10 transition-all text-xs font-medium rounded-lg hover:scale-105 transform">
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
