import { Plus, LogOut } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [conversations] = useState([
    { id: 1, name: "New Conversation", active: true },
  ]);

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
        className={`fixed md:static inset-y-0 left-0 w-64 bg-sidebar border-r-2 border-foreground/20 flex flex-col transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50 animate-slideInLeft`}
      >
        {/* Header - Minimal */}
        <div className="p-4 animate-fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center text-background text-sm font-bold border-2 border-foreground hover:scale-110 transition-transform">
              N
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                Nothing
              </p>
            </div>
          </div>
          <p className="text-xs text-foreground/50 truncate pl-12">
            nothing@example.com
          </p>
        </div>

        {/* New Conversation Button */}
        <div className="px-4 py-2 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-foreground/30 text-foreground hover:border-foreground/60 hover:bg-foreground/5 transition-all text-sm font-medium rounded-2xl hover:scale-105 transform">
            <Plus size={16} />
            New chat
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {conversations.map((conv, idx) => (
              <button
                key={conv.id}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border-2 border-transparent hover:border-foreground/30 ${
                  conv.active
                    ? "bg-foreground/10 text-foreground border-foreground/30"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
                style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
              >
                {conv.name}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-foreground/20 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-red-600 hover:bg-red-700 border-2 border-red-600 hover:border-red-700 transition-all text-sm font-medium rounded-2xl hover:scale-105 transform">
            <LogOut size={16} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
