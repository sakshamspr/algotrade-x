import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getGroqChatCompletion } from "@/services/groq";
import { useAppStore } from "@/store/useStore";

const suggestedPrompts = [
  "Analyze Reliance stock",
  "Best low-risk investment options",
  "Explain FnO risks",
];

export function ChatPanel({ embedded = false }: { embedded?: boolean }) {
  const { chatMessages, addChatMessage, draftPrompt, setDraftPrompt } = useAppStore();
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  const sendMessage = async (nextPrompt?: string) => {
    const content = (nextPrompt ?? draftPrompt).trim();
    if (!content || loading) {
      return;
    }

    addChatMessage({ id: crypto.randomUUID(), role: "user", content });
    setDraftPrompt("");
    setLoading(true);

    try {
      const assistantContent = await getGroqChatCompletion(
        [...chatMessages, { id: crypto.randomUUID(), role: "user", content }].map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        })),
      );

      addChatMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantContent,
      });
    } catch {
      addChatMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Bot X hit a temporary issue reaching the Groq endpoint. Please verify `VITE_GROQ_API_KEY` and try again.\n\nThis is AI-generated insight and not financial advice.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={embedded ? "" : "h-full"}>
      <div className="mb-5 flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => void sendMessage(prompt)}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm transition hover:border-primary/40 hover:bg-primary/5"
          >
            {prompt}
          </button>
        ))}
      </div>

      <Card className="flex h-[440px] flex-col overflow-hidden">
        <div className="border-b border-border/60 px-5 py-4">
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Groq-ready Assistant</p>
          <h3 className="mt-1 text-xl font-semibold">Bot X Conversation</h3>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
          {chatMessages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={
                  message.role === "user"
                    ? "max-w-[85%] rounded-[24px] rounded-br-md bg-primary px-4 py-3 text-sm leading-7 text-white"
                    : "max-w-[85%] rounded-[24px] rounded-bl-md bg-muted px-4 py-3 text-sm leading-7 text-foreground"
                }
              >
                <div className="max-w-none [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_p]:my-2 [&_ul]:my-2">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </motion.div>
            </div>
          ))}

          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="rounded-[24px] rounded-bl-md bg-muted px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Bot X is thinking
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border/60 p-4">
          <div className="flex gap-3">
            <Input
              value={draftPrompt}
              onChange={(event) => setDraftPrompt(event.target.value)}
              placeholder="Ask about a stock, ETF, IPO, or risk setup"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  void sendMessage();
                }
              }}
            />
            <Button onClick={() => void sendMessage()} disabled={loading}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
