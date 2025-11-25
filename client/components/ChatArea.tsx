import { Plus, Settings, User, Send, Paperclip, Smile } from "lucide-react";
import { useState } from "react";

export function ChatArea() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">
          New Conversation
        </h1>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Plus size={20} className="text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings size={20} className="text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <User size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
        <div className="text-center">
          {/* Placeholder for empty state */}
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              backgroundImage:
                "url(https://cdn.builder.io/api/v1/image/assets%2Fafa67d28f8874020a08a6dc1ed05801d%2F340d671f0c4b45db8b30096668d2bc7c)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <span className="text-2xl text-muted-foreground">✨</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Start a conversation
          </h2>
          <p className="text-muted-foreground">
            Type a message below to begin
          </p>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t border-border px-6 py-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message..."
              className="w-full bg-card border border-input rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="p-1 hover:bg-muted rounded transition-colors">
                <Paperclip size={18} className="text-muted-foreground" />
              </button>
              <button className="p-1 hover:bg-muted rounded transition-colors">
                <Smile size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSend}
            className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
