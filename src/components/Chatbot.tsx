import { Bot, MessageSquareMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatPanel } from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppStore } from "@/store/useStore";

export function Chatbot() {
  const { isChatOpen, toggleChat } = useAppStore();
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={toggleChat}
        size="icon"
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-glow"
      >
        <Bot className="h-5 w-5" />
      </Button>

      <Dialog open={isChatOpen} onOpenChange={toggleChat}>
        <DialogContent className="max-w-3xl">
          <div className="mb-5">
            <p className="text-sm uppercase tracking-[0.22em] text-primary">Bot X</p>
            <h3 className="mt-2 text-2xl font-semibold">AI Market Copilot</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Floating assistant with the same Groq-ready engine as the dedicated chat page.
            </p>
          </div>
          <ChatPanel />
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                toggleChat();
                navigate("/chat");
              }}
            >
              <MessageSquareMore className="mr-2 h-4 w-4" />
              Open Full Chat Page
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
