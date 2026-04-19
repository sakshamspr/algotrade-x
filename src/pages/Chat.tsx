import { ChatPanel } from "@/components/ChatPanel";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";

export function Chat() {
  return (
    <PageTransition>
      <SectionHeader
        eyebrow="AI Assistant"
        title="Bot X Dedicated Chat"
        description="Use Groq-powered prompts for stock analysis, investment suggestions, and risk explanations."
      />

      <div className="max-w-4xl mx-auto">
        <ChatPanel embedded />
      </div>
    </PageTransition>
  );
}
